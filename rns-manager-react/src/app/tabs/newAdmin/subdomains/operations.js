import Web3 from 'web3';
import { keccak_256 as sha3 } from 'js-sha3';
import { hash as namehash } from 'eth-ens-namehash';
import RNS from '@rsksmart/rns';

import { getOptions } from '../../../adapters/RNSLibAdapter';

import transactionListener from '../../../helpers/transactionListener';
import {
  requestNewSubdomain, receiveNewSubdomain, errorNewSubdomain, addSubdomainToList,
  clearSubdomainList, waitingNewSubdomainConfirm,
  waitingSetSubdomainOwner, receiveSetSubdomainOwner, errorSetSubdomainOwner,
  removeSubdomainFromList,
} from './actions';

import { sendBrowserNotification } from '../../../browerNotifications/operations';

const web3 = new Web3(window.ethereum);

// JS library:
const rns = new RNS(web3, getOptions());

const updateSubdomainToLocalStorage = (domain, subdomain, add = true) => {
  const storedSubdomains = localStorage.getItem('subdomains')
    ? JSON.parse(localStorage.getItem('subdomains')) : {};
  if (!storedSubdomains[domain]) {
    storedSubdomains[domain] = [];
  }

  if (add) {
    storedSubdomains[domain].push(subdomain);
  } else {
    storedSubdomains[domain].pop(subdomain);
  }

  localStorage.setItem('subdomains', JSON.stringify(storedSubdomains));
};

const registerSubdomain = (parentDomain, subdomain, newOwner) => async (dispatch) => {
  dispatch(requestNewSubdomain());

  const accounts = await window.ethereum.enable();
  const currentAddress = accounts[0];

  const label = `0x${sha3(subdomain)}`;
  const node = namehash(parentDomain);

  await rns.compose();
  await rns.contracts.registry.methods.setSubnodeOwner(node, label, newOwner)
    .send({ from: currentAddress }, (error, result) => {
      if (error) {
        return dispatch(errorNewSubdomain(error.message));
      }

      dispatch(waitingNewSubdomainConfirm());

      const transactionConfirmed = () => () => {
        dispatch(addSubdomainToList(subdomain, newOwner));
        dispatch(receiveNewSubdomain(result));
        updateSubdomainToLocalStorage(parentDomain, subdomain, true);
        sendBrowserNotification(`${subdomain}.${parentDomain}`, 'register_subdomain');
      };

      return dispatch(transactionListener(result, () => transactionConfirmed()));
    });
};

const getSubdomainOwner = (domain, subdomain) => async (dispatch) => {
  const hash = namehash(`${subdomain}.${domain}`);

  await rns.compose();
  await rns.contracts.registry.methods.owner(hash).call((error, result) => {
    if (!error) {
      if (result !== '0x0000000000000000000000000000000000000000') {
        dispatch(addSubdomainToList(subdomain, result));
      }
    }
  });
};

/**
 * Create a subdomain or add it to the list of subdomains in local storage
 * if existent.
 * @param {string} parentDomain the domain to add the subdomain for
 * @param {string} subdomain label for the subdomain to add
 * @param {address} newOwner owner to set for the subdomain
 * @param {Object[]} subdomainList the list of known and stored domains
 */
export const newSubdomain = (
  parentDomain, subdomain, newOwner, subdomainList,
) => async (dispatch) => {
  const isAvailable = await rns.subdomains.available(parentDomain, subdomain);
  if (isAvailable) {
    return dispatch(registerSubdomain(parentDomain, subdomain, newOwner));
  }

  if (subdomainList[subdomain]) {
    // already on the list below
    return dispatch(errorNewSubdomain(`${subdomain}.${parentDomain} is already registered.`));
  }

  // already was registered, but not in localStorage:
  updateSubdomainToLocalStorage(parentDomain, subdomain, true);
  dispatch(getSubdomainOwner(parentDomain, subdomain));
  return dispatch(errorNewSubdomain(`${subdomain}.${parentDomain} was already registered. It has been added below.`));
};


/**
 * Get all subdomains for a domain in local storage and get all the owners.
 * @param {string} domain to get the subdomain owners of
 */
export const getSubdomainListFromLocalStorage = domain => (dispatch) => {
  dispatch(clearSubdomainList());

  const storedSubdomains = JSON.parse(localStorage.getItem('subdomains'));

  if (!storedSubdomains || !storedSubdomains[domain]) {
    return;
  }

  storedSubdomains[domain].forEach((subdomain) => {
    dispatch(getSubdomainOwner(domain, subdomain));
  });
};

/**
 * Change a subdomain's owner if is different from the current,
 * and remove it from local storage if is transferred to 0x00.
 * @param {string} parentDomain the domain to change the subdomain owner for
 * @param {string} subdomain label for the subdomain to change the owner
 * @param {address} newOwner owner to set for the subdomain
 * @param {address} currentOwner the current owner
 */
export const setSubdomainOwner = (
  parentDomain, subdomain, newOwner, currentOwner,
) => async (dispatch) => {
  dispatch(waitingSetSubdomainOwner(subdomain));

  if (newOwner === currentOwner) {
    return dispatch(errorSetSubdomainOwner(subdomain, 'The subdomain is already owned by that address'));
  }

  const accounts = await window.ethereum.enable();
  const currentAddress = accounts[0];
  const label = `0x${sha3(subdomain)}`;
  const node = namehash(parentDomain);

  await rns.compose();
  return rns.contracts.registry.methods.setSubnodeOwner(node, label, newOwner)
    .send({ from: currentAddress }, (error, result) => {
      if (error) {
        return dispatch(errorSetSubdomainOwner(subdomain, error.message));
      }

      const transactionConfirmed = () => () => {
        dispatch(receiveSetSubdomainOwner(result, subdomain, newOwner));

        if (newOwner === '0x0000000000000000000000000000000000000000') {
          sendBrowserNotification(`${subdomain}.${parentDomain}`, 'remove_subdomain');
          updateSubdomainToLocalStorage(parentDomain, subdomain, false);
          dispatch(removeSubdomainFromList(subdomain));
        } else {
          sendBrowserNotification(`${subdomain}.${parentDomain}`, 'update_subdomain');
        }
      };

      return dispatch(transactionListener(result, () => transactionConfirmed()));
    });
};
