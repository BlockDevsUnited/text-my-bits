import Web3 from 'web3';
import { keccak_256 as sha3 } from 'js-sha3';
import {
  requestGetCost, receiveGetCost,
  requestCommitRegistrar, receiveCommitRegistrar, errorRegistrarCommit,
  requestRevealCommit, receiveRevealCommit, receiveCanRevealCommit,
  errorRevealCommit, optionsNotFound, commitTxMined, revealTxMined,
  requestConversionRate, recieveConversionRate, errorConversionRate,
} from './actions';
import {
  fifsRegistrar as fifsRegistrarAddress,
  fifsAddrRegistrar as fifsAddrRegistrarAddress,
  rif as rifAddress,
} from '../../adapters/configAdapter';
import { gasPrice as defaultGasPrice } from '../../adapters/gasPriceAdapter';
import { notifyError, notifyTx, txTypes } from '../../notifications';
import { fifsRegistrarAbi, fifsAddrRegistrarAbi, rifAbi } from './abis.json';
import { getRegisterData, getAddrRegisterData } from './helpers';
import { FIFS_REGISTRER, FIFS_ADDR_REGISTRER } from './types';
import { sendBrowserNotification } from '../../browerNotifications/operations';

export const getCost = (domain, duration) => async (dispatch) => {
  const accounts = await window.ethereum.enable();
  const currentAddress = accounts[0];

  const web3 = new Web3(window.ethereum);
  const rif = new web3.eth.Contract(rifAbi, rifAddress);

  const registrar = new web3.eth.Contract(fifsRegistrarAbi, fifsRegistrarAddress);

  dispatch(requestGetCost(duration));

  return new Promise((resolve) => {
    registrar.methods.price(domain, 0, duration).call((error, cost) => {
      if (error) return resolve(dispatch(notifyError(error.message)));

      return rif.methods.balanceOf(currentAddress).call((balanceError, balance) => {
        if (balanceError) return resolve(dispatch(notifyError(balanceError.message)));

        const enoughBalance = web3.utils.toBN(balance).gte(web3.utils.toBN(cost));
        return dispatch(receiveGetCost(window.web3.toDecimal(cost / (10 ** 18)), enoughBalance));
      });
    });
  });
};

export const getConversionRate = () => async (dispatch) => {
  dispatch(requestConversionRate());

  return new Promise((resolve) => {
    fetch('https://rskgasstation.azurewebsites.net/converter/cmc')
      .then(res => res.json())
      .then(data => resolve(dispatch(
        recieveConversionRate(parseFloat(data.data[3701].quote.USD.price)),
      )))
      .catch(() => dispatch(errorConversionRate()));
  });
};

export const commit = (domain, duration, rifCost, setupAddr) => async (dispatch) => {
  dispatch(requestCommitRegistrar());

  const randomBytes = window.crypto.getRandomValues(new Uint8Array(32));
  const strSalt = Array.from(randomBytes).map(byte => byte.toString(16)).join('');
  const salt = `0x${strSalt.padEnd(64, '0')}`;

  const accounts = await window.ethereum.enable();
  const currentAddress = accounts[0];

  const web3 = new Web3(window.ethereum);

  const abi = setupAddr ? fifsAddrRegistrarAbi : fifsRegistrarAbi;
  const address = setupAddr ? fifsAddrRegistrarAddress : fifsRegistrarAddress;

  const registrar = new web3.eth.Contract(
    abi, address, { from: currentAddress, gasPrice: defaultGasPrice },
  );

  return new Promise((resolve) => {
    registrar
      .methods
      .makeCommitment(`0x${sha3(domain)}`, currentAddress, salt)
      .call((error, hashCommit) => {
        if (error) return resolve(dispatch(notifyError(error.message)));

        return registrar.methods.commit(hashCommit).send((_error, result) => {
          if (_error) {
            dispatch(errorRegistrarCommit());
            return resolve(dispatch(notifyError(_error.message)));
          }

          localStorage.setItem(`${domain}-options`, JSON.stringify({
            salt,
            duration,
            rifCost,
            contract: setupAddr ? FIFS_ADDR_REGISTRER : FIFS_REGISTRER,
          }));

          dispatch(receiveCommitRegistrar(hashCommit));

          const confirmedCallBack = () => { dispatch(commitTxMined()); };

          return resolve(dispatch(notifyTx(result, '', { type: txTypes.REGISTRAR_COMMIT }, () => confirmedCallBack)));
        });
      });
  });
};

export const checkCanReveal = (hash, domain) => async (dispatch) => {
  let options = localStorage.getItem(`${domain}-options`);
  if (!options) {
    return dispatch(optionsNotFound());
  }

  options = JSON.parse(options);
  const { contract, notificationReady } = options;

  const abi = (contract === FIFS_ADDR_REGISTRER) ? fifsAddrRegistrarAbi : fifsRegistrarAbi;
  const address = (contract === FIFS_ADDR_REGISTRER)
    ? fifsAddrRegistrarAddress : fifsRegistrarAddress;

  const registrar = window.web3.eth.contract(abi).at(address);

  return new Promise((resolve) => {
    registrar.canReveal(hash, (error, canReveal) => {
      if (error) return resolve(dispatch(notifyError(error.message)));
      if (canReveal && !notificationReady) {
        sendBrowserNotification(`${domain}.rsk`, 'notification_domain_ready_register');
      }
      localStorage.setItem(`${domain}-options`, JSON.stringify({
        ...options,
        notificationReady: true,
      }));
      return dispatch(receiveCanRevealCommit(canReveal));
    });
  });
};

export const checkIfAlreadyCommitted = domain => async (dispatch) => {
  let options = localStorage.getItem(`${domain}-options`);
  if (!options) {
    return dispatch(optionsNotFound());
  }

  options = JSON.parse(options);
  const { salt, contract } = options;

  dispatch(requestCommitRegistrar());

  const accounts = await window.ethereum.enable();
  const currentAddress = accounts[0];

  const abi = (contract === FIFS_ADDR_REGISTRER) ? fifsAddrRegistrarAbi : fifsRegistrarAbi;
  const address = (contract === FIFS_ADDR_REGISTRER)
    ? fifsAddrRegistrarAddress : fifsRegistrarAddress;

  const registrar = window.web3.eth.contract(abi).at(address);
  return new Promise((resolve) => {
    registrar.makeCommitment(`0x${sha3(domain)}`, currentAddress, salt, (error, hashCommit) => {
      if (error) return resolve(dispatch(notifyError(error.message)));

      dispatch(receiveCommitRegistrar(hashCommit, true));

      return resolve(dispatch(checkCanReveal(hashCommit, domain)));
    });
  });
};

export const revealCommit = domain => async (dispatch) => {
  let options = localStorage.getItem(`${domain}-options`);
  if (!options) {
    return dispatch(optionsNotFound());
  }

  options = JSON.parse(options);
  const {
    salt,
    contract,
    duration,
    rifCost,
  } = options;

  dispatch(requestRevealCommit());

  const weiValue = rifCost * (10 ** 18);
  const accounts = await window.ethereum.enable();
  const currentAddress = accounts[0];
  const durationBN = window.web3.toBigNumber(duration);

  const data = (contract === FIFS_ADDR_REGISTRER)
    ? getAddrRegisterData(domain, currentAddress, salt, durationBN, currentAddress)
    : getRegisterData(domain, currentAddress, salt, durationBN);

  const fifsAddress = (contract === FIFS_ADDR_REGISTRER)
    ? fifsAddrRegistrarAddress : fifsRegistrarAddress;

  const web3 = new Web3(window.ethereum);
  const rif = new web3.eth.Contract(
    rifAbi, rifAddress, { from: currentAddress, gasPrice: defaultGasPrice },
  );

  return new Promise((resolve) => {
    rif
      .methods
      .transferAndCall(fifsAddress, weiValue.toString(), data)
      .send((error, result) => {
        if (error) {
          dispatch(errorRevealCommit());
          return resolve(dispatch(notifyError(error.message)));
        }

        localStorage.setItem(`${domain}-options`, JSON.stringify({
          ...options,
          registerHash: result,
        }));

        dispatch(receiveRevealCommit());
        const revealCallback = () => {
          dispatch(revealTxMined());
          sendBrowserNotification(`${domain}.rsk`, 'notifications_registrar_revealed');
          localStorage.setItem('name', `${domain}.rsk`);
          localStorage.removeItem(`${domain}-options`);
        };
        return resolve(dispatch(notifyTx(result, '', { type: txTypes.REVEAL_COMMIT }, () => revealCallback)));
      });
  });
};

export const checkIfAlreadyRegistered = (domain, intId) => async (dispatch) => {
  let options = localStorage.getItem(`${domain}-options`);
  options = JSON.parse(options);
  if (!options) {
    return dispatch(optionsNotFound());
  }

  if (!options.registerHash) {
    return false;
  }

  const web3 = new Web3(window.ethereum);

  return web3.eth.getTransactionReceipt(options.registerHash)
    .then((result) => {
      let intervalId = intId;
      if (result && result.status) {
        clearInterval(intervalId);
        dispatch(revealTxMined());
        sendBrowserNotification(`${domain}.rsk`, 'notifications_registrar_revealed');
        localStorage.setItem('name', `${domain}.rsk`);
        localStorage.removeItem(`${domain}-options`);
      }

      dispatch(requestRevealCommit());
      if (!intervalId) {
        const checkAgain = () => dispatch(checkIfAlreadyRegistered(domain, intervalId));
        intervalId = setInterval(checkAgain, 5000);
      }
    });
};
