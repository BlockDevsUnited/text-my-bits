import Web3 from 'web3';
import { hash as namehash } from 'eth-ens-namehash';

import {
  multiChainResolver as multiChainResolverAddress,
  publicResolver as publicResolverAddress,
} from '../../../adapters/configAdapter';
import { gasPrice as defaultGasPrice } from '../../../adapters/gasPriceAdapter';

import {
  requestSetChainAddress, errorSetChainAddress, waitingSetChainAddress,
  requestChainAddress, receiveChainAddress, receiveSetChainAddress,
  errorChainAddress, clearAddresses, closeSetChainAddress,
} from './actions';
import { publicResolverAbi, multichainResolverAbi } from './abis.json';

import transactionListener from '../../../helpers/transactionListener';
import networks from './networks.json';
import { PUBLIC_RESOLVER, MULTICHAIN_RESOLVER } from '../resolver/types';
import { sendBrowserNotification } from '../../../browerNotifications/operations';

const web3 = new Web3(window.ethereum);
const multichainResolver = new web3.eth.Contract(
  multichainResolverAbi, multiChainResolverAddress, { gasPrice: defaultGasPrice },
);
const publicResolver = new web3.eth.Contract(
  publicResolverAbi, publicResolverAddress, { gasPrice: defaultGasPrice },
);

/**
 * Helper Function to get the chain name with the ID
 * @param {chaindId} chaindId the chainId to be looked up
 */
export const getChainNameById = (chainId) => {
  const network = networks.filter(net => net.id === chainId);
  return network[0].name;
};

/**
 * Sets the RSK resolution when using the public resolver
 * @param {string} domain to set the address for
 * @param {address} address to resolve to
 */
const setPublicAddress = (domain, address, isNew) => async (dispatch) => {
  const accounts = await window.ethereum.enable();
  const currentAddress = accounts[0];
  const hash = namehash(domain);

  publicResolver.methods.setAddr(hash, address).send(
    { from: currentAddress }, (error, result) => {
      dispatch(waitingSetChainAddress('RSK'));
      if (error) {
        return dispatch(errorSetChainAddress('RSK', error.message));
      }

      const transactionConfirmed = () => () => {
        dispatch(receiveSetChainAddress('0x80000089', 'RSK', address, result, isNew));
      };

      return dispatch(transactionListener(result, () => transactionConfirmed()));
    },
  );
};

/**
 * Sets an address in the multichain resolver
 * @param {*} domain to set the address for
 * @param {*} chainId that is assoicated with the address
 * @param {*} address the address or valud to set for the chainId
 */
const setMultiChainAddress = (domain, chainId, address, isNew) => async (dispatch) => {
  const chainName = getChainNameById(chainId);
  dispatch(requestSetChainAddress(chainName));

  const accounts = await window.ethereum.enable();
  const currentAddress = accounts[0];
  const hash = namehash(domain);

  multichainResolver.methods.setChainAddr(hash, chainId, address).send(
    { from: currentAddress }, (error, result) => {
      dispatch(waitingSetChainAddress(chainName));
      if (error) {
        return dispatch(errorSetChainAddress(chainName, error.message));
      }

      const transactionConfirmed = () => () => {
        dispatch(receiveSetChainAddress(
          chainId, getChainNameById(chainId), address, result, isNew,
        ));

        // if deleting, close the error message programatically
        if (address === '' || address === '0x0000000000000000000000000000000000000000') {
          dispatch(closeSetChainAddress(chainName));
          sendBrowserNotification(domain, 'chain_address_removed');
        } else {
          sendBrowserNotification(domain, 'chain_address_updated');
        }
      };

      return dispatch(transactionListener(result, () => transactionConfirmed()));
    },
  );
};


/**
 * Selects the correct resolver set function based one resolverName
 * @param {string} domain the domain the address is for
 * @param {chainId} chainId the chainId to be set
 * @param {address} address the address for the chainId
 * @param {type} resolverName which resolver to use
 */
export const setChainAddress = (
  domain, chainId, address, resolverName, isNew,
) => async (dispatch) => {
  switch (resolverName) {
    case PUBLIC_RESOLVER:
      dispatch(setPublicAddress(domain, address.toLowerCase(), isNew));
      break;
    case MULTICHAIN_RESOLVER:
      dispatch(setMultiChainAddress(domain, chainId, address, isNew));
      break;
    default:
      // string resolver or unknown/custom resolver
  }
};

/**
 * Get the RSK resolved address using the Public Resolver
 * @param {string} domain the domain the address is for
 */
export const getPublicChainAddresses = domain => async (dispatch) => {
  dispatch(requestChainAddress());
  const hash = namehash(domain);

  return publicResolver.methods.addr(hash).call()
    .then(addr => dispatch(receiveChainAddress('0x80000089', 'RSK', addr)))
    .catch(error => dispatch(errorChainAddress('RSK', error.message)));
};

/**
 * Get the chain Address for a specific domian using the MultiChain Resolver
 * @param {string} domain the domain the address is for
 * @param {chainId} chainId the chainId requested
 */
export const getMultiChainAddresses = (domain, chainId) => async (dispatch) => {
  dispatch(requestChainAddress());

  const hash = namehash(domain);
  const chainName = getChainNameById(chainId);

  if (chainId === '0x80000089') {
    return multichainResolver.methods.addr(hash).call()
      .then(addr => dispatch(receiveChainAddress('0x80000089', 'RSK', addr)))
      .catch(error => dispatch(errorChainAddress('RSK', error.message)));
  }

  return multichainResolver.methods.chainAddr(hash, chainId).call()
    .then(addr => dispatch(receiveChainAddress(chainId, chainName, addr)))
    .catch(error => dispatch(errorChainAddress(chainName, error.message)));
};

/**
 * Gets chain addresses if the resolver is set to public or multichain.
 * In the case of multichain, it loops through all of the possible chainIds
 * and calls getChainAddress
 * @param {string} domain the domain to get the addresses
 * @param {type} resolverName which resolver to use
 */
export const getAllChainAddresses = (domain, resolverName) => (dispatch) => {
  dispatch(clearAddresses());
  switch (resolverName) {
    case PUBLIC_RESOLVER:
      dispatch(getPublicChainAddresses(domain));
      break;
    case MULTICHAIN_RESOLVER:
      networks.map(network => dispatch(getMultiChainAddresses(domain, network.id)));
      break;
    default:
      // string resolver or unknown/custom resolver
  }
};

/**
 * Chooses which resolver to use and then sets the value to '' or 0x0 depending on content
 * type and then passes the value to setChainAddress()
 * @param {string} domain the domain to get the addresses
 * @param {chainId} chainId the chainId requested
 * @param {type} resolverName which resolver to use
 */
export const deleteChainAddress = (domain, chainId, resolverName) => (dispatch) => {
  const isHex = networks.filter(net => net.id === chainId)[0].validation === 'HEX';
  const value = isHex ? '0x0000000000000000000000000000000000000000' : '';

  switch (resolverName) {
    case PUBLIC_RESOLVER:
      dispatch(setPublicAddress(domain, value));
      break;
    case MULTICHAIN_RESOLVER:
      dispatch(setMultiChainAddress(domain, chainId, value));
      break;
    default:
      // string resolver or unknown/custom resolver
  }
};
