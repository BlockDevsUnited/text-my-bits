import Web3 from 'web3';
import { keccak_256 as sha3 } from 'js-sha3';

import {
  rskOwner as rskOwnerAddress,
  registrar as tokenRegistrarAddress,
} from '../../adapters/configAdapter';
import { rskOwnerAbi, tokenRegistrarAbi } from './abis.json';
import { gasPrice as defaultGasPrice } from '../../adapters/gasPriceAdapter';

import {
  toggleBasicAdvanced, checkIfSubdomain, requestCheckTokenOwner, receiveCheckTokenOwner,
  errorCheckTokenOwner, requestFifsMigrationStatus, receiveFifsMigrationStatus,
  errorFifsMigrationStatus,
} from './actions';

import { checkIfSubdomainAndGetExpirationRemaining } from './domainInfo/operations';
import { getDomainResolver } from './resolver/operations';

const web3 = new Web3(window.ethereum);

export const checkIfSubdomainOrTokenOwner = domain => async (dispatch) => {
  const labelsAmount = domain.split('.').length;

  if (labelsAmount > 2) {
    dispatch(checkIfSubdomain(true));
  }

  const label = domain.split('.')[0];
  const accounts = await window.ethereum.enable();
  const currentAddress = accounts[0];

  dispatch(requestCheckTokenOwner());

  const hash = `0x${sha3(label)}`;

  const rskOwner = new web3.eth.Contract(
    rskOwnerAbi, rskOwnerAddress, { gasPrice: defaultGasPrice },
  );

  rskOwner.methods.ownerOf(hash).call((error, result) => {
    if (error) {
      dispatch(errorCheckTokenOwner());
      return;
    }

    const domainOwner = result;

    dispatch(receiveCheckTokenOwner(
      domainOwner.toLowerCase() === currentAddress.toLowerCase(),
      domainOwner,
    ));
  });
};

export const checkIfFIFSRegistrar = domain => async (dispatch) => {
  dispatch(requestFifsMigrationStatus());

  return new Promise((resolve) => {
    const label = `0x${sha3(domain.split('.')[0])}`;

    const tokenRegistrar = new web3.eth.Contract(
      tokenRegistrarAbi, tokenRegistrarAddress, { gasPrice: defaultGasPrice },
    );

    tokenRegistrar.methods.entries(label).call((error, result) => {
      if (error) {
        dispatch(errorFifsMigrationStatus());
      }

      const deed = result[1];

      return resolve(dispatch(receiveFifsMigrationStatus(deed === '0x0000000000000000000000000000000000000000')));
    });
  });
};

export const start = domain => (dispatch) => {
  const showAdvancedView = localStorage.getItem('adminAdvancedView');
  dispatch(toggleBasicAdvanced(showAdvancedView === 'true'));
  dispatch(checkIfSubdomainOrTokenOwner(domain));
  dispatch(checkIfFIFSRegistrar(domain));
  dispatch(getDomainResolver(domain));
  dispatch(checkIfSubdomainAndGetExpirationRemaining(domain));
};

export const toggleBasicAdvancedSwitch = showAdvancedView => (dispatch) => {
  dispatch(toggleBasicAdvanced(showAdvancedView));
  localStorage.setItem('adminAdvancedView', showAdvancedView);
};
