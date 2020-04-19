import Web3 from 'web3';
import { hash as namehash } from 'eth-ens-namehash';
import { push } from 'connected-react-router';
import {
  rns as registryAddress,
  rskOwner as rskOwnerAddress,
  registrar as auctionRegistrarAddress,
} from '../adapters/configAdapter';
import { rskNode } from '../adapters/nodeAdapter';
import { checkResolver } from '../notifications';

import {
  receiveHasMetamask,
  requestEnable,
  receiveEnable,
  requestLogin,
  receiveLogin,
  errorLogin,
  errorEnable,
  logOut,
  closeModal,
} from './actions';
import {
  rskOwnerAbi,
  auctionRegistrarAbi,
  deedRegistrarAbi,
} from '../tabs/search/abis.json';
import { registryAbi } from './abis.json';

/**
 * Save Domain into Local Storage to be used with login popup.
 * @param {string} domain to save into localStrage
 */
export const saveDomainToLocalStorage = async (domain) => {
  // eslint-disable-next-line prefer-const
  let storedDomains = localStorage.getItem('storedDomains')
    ? JSON.parse(localStorage.getItem('storedDomains')) : {};

  // environment:
  if (!storedDomains[process.env.REACT_APP_ENVIRONMENT]) {
    storedDomains[process.env.REACT_APP_ENVIRONMENT] = [];
  }

  const accounts = await window.ethereum.enable();
  const newDomain = {
    domain,
    owner: accounts[0],
  };

  if (
    storedDomains[process.env.REACT_APP_ENVIRONMENT].length === 0
    || storedDomains[process.env.REACT_APP_ENVIRONMENT].filter(d => d.domain === domain).length < 1
  ) {
    storedDomains[process.env.REACT_APP_ENVIRONMENT].push(newDomain);
    localStorage.setItem('storedDomains', JSON.stringify(storedDomains));
  }
};

/**
 * Removes domain that was saved in LocalStorage
 * @param {string} domain to be removed from local storage
 */
export const removeDomainToLocalStorage = (domain) => {
  const storedDomains = localStorage.getItem('storedDomains')
    ? JSON.parse(localStorage.getItem('storedDomains')) : {};

  // does the environment exist? this should not happen:
  if (!storedDomains[process.env.REACT_APP_ENVIRONMENT]) {
    return;
  }

  const newEnv = storedDomains[process.env.REACT_APP_ENVIRONMENT].filter(d => d.domain !== domain);
  const newStoredDomains = {
    ...storedDomains,
    [process.env.REACT_APP_ENVIRONMENT]: newEnv,
  };

  localStorage.setItem('storedDomains', JSON.stringify(newStoredDomains));
};

const successfulLogin = (name, noRedirect) => (dispatch) => {
  dispatch(checkResolver(name));

  if (!noRedirect) {
    dispatch(push('/newAdmin'));
  }

  localStorage.setItem('name', name);
  saveDomainToLocalStorage(name);

  dispatch(closeModal());
  return dispatch(receiveLogin(name, true));
};

const failedLogin = name => (dispatch) => {
  localStorage.removeItem('name');
  dispatch(push('/'));
  return dispatch(errorLogin('failed login', name));
};

export const authenticate = (name, address, noRedirect) => (dispatch) => {
  if (!address) return null;

  dispatch(requestLogin());

  const web3 = new Web3(rskNode);

  const registry = new web3.eth.Contract(registryAbi, registryAddress);
  const rskOwner = new web3.eth.Contract(rskOwnerAbi, rskOwnerAddress);
  const auctionRegistrar = new web3.eth.Contract(
    auctionRegistrarAbi,
    auctionRegistrarAddress,
  );

  const node = namehash(name);

  // get rns registry owner
  return registry.methods.owner(node).call()
    .then((registryOwner) => {
      if (address === registryOwner) {
        // can perform registry operations, success
        return dispatch(successfulLogin(name, noRedirect));
      }

      const labels = name.split('.');

      if (labels.length === 1 || labels[labels.length - 1] !== 'rsk') {
        // is not a domain or is not a .rsk domain, fail
        return dispatch(failedLogin(name));
      }

      const label = web3.utils.sha3(labels[0]);

      return rskOwner.methods.available(label).call()
        .then((available) => {
          if (available) {
            // it has no owner, fail
            return dispatch(failedLogin(name));
          }

          // it is not available, get the owner in the auction registrar or
          // the token registrar
          return auctionRegistrar.methods.entries(label).call()
            .then((entry) => {
              if (entry[0] === '2') {
                // owned in the auction registrar
                const deedContract = new web3.eth.Contract(deedRegistrarAbi, entry[1]);
                return deedContract.methods.owner().call();
              }

              // owned in rsk registrar
              return rskOwner.methods.ownerOf(label).call();
            })
            .then((owner) => {
              if (owner.toLowerCase() === address.toLowerCase()) {
                // success
                return dispatch(successfulLogin(name, noRedirect));
              }

              // fail
              return dispatch(failedLogin(name));
            })
            .catch(error => dispatch(errorLogin(error)));
        })
        .catch(error => dispatch(errorLogin(error)));
    })
    .catch(error => dispatch(errorLogin(error)));
};

export const start = callback => (dispatch) => {
  const hasMetamask = window.ethereum !== undefined;

  dispatch(receiveHasMetamask(hasMetamask));

  if (hasMetamask) {
    dispatch(requestEnable());

    window.ethereum.enable()
      .then((accounts) => {
        dispatch(receiveEnable(
          accounts[0],
          window.ethereum.publicConfigStore.getState().networkVersion,
          window.ethereum.publicConfigStore.getState().networkVersion
            === process.env.REACT_APP_ENVIRONMENT_ID,
          accounts.length !== 0,
        ));

        if (localStorage.getItem('name')) {
          dispatch(authenticate(localStorage.getItem('name'), accounts[0], true));
        }
      })
      .then(() => callback && callback())
      .catch(e => dispatch(errorEnable(e.message)));

    window.ethereum.on('accountsChanged', () => dispatch(start()));
  }
};

export const logoutManager = (redirect = '') => (dispatch) => {
  localStorage.removeItem('name');
  dispatch(logOut());
  dispatch(push(`/${redirect}`));
};

export const autoLogin = domain => async (dispatch) => {
  const accounts = await window.ethereum.enable();
  dispatch(authenticate(domain, accounts[0]));
};
