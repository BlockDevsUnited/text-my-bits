import Web3 from 'web3';
import { hash as namehash } from 'eth-ens-namehash';

import {
  reverseRegistrar as reverseRegistryAddress,
  nameResolver as nameResolverAddress,
} from '../../../adapters/configAdapter';
import { gasPrice as defaultGasPrice } from '../../../adapters/gasPriceAdapter';
import { reverseAbi, nameResolverAbi } from './abis.json';

import transactionListener from '../../../helpers/transactionListener';
import { sendBrowserNotification } from '../../../browerNotifications/operations';

import {
  requestResolver, receiveResolver, requestSetReverseResolver, waitingSetReverseResolver,
  receieveSetReverseResolver, errorSetReverseResolver, errorResolver,
} from './actions';


const web3 = new Web3(window.ethereum);

const reverseRegistry = new web3.eth.Contract(
  reverseAbi, reverseRegistryAddress, { gasPrice: defaultGasPrice },
);

const nameResolver = new web3.eth.Contract(
  nameResolverAbi, nameResolverAddress, { gasPrice: defaultGasPrice },
);

/**
 * Get reverse value when given an address
 * @param {address} address the address to lookup
 */
export const getReverse = address => (dispatch) => {
  dispatch(requestResolver());

  const name = `${address.toLowerCase().slice(2)}.addr.reverse`;
  const hash = namehash(name);

  nameResolver.methods.name(hash).call((error, nameResolution) => {
    if (error) {
      return dispatch(errorResolver(error.message));
    }
    return dispatch(receiveResolver(nameResolution));
  });
};

/**
 * Set reverse value for the currentAddress
 * @param {string} value value to be set
 */
export const setReverse = value => async (dispatch) => {
  const accounts = await window.ethereum.enable();
  const currentAddress = accounts[0];

  dispatch(requestSetReverseResolver());

  reverseRegistry.methods.setName(value).send(
    { from: currentAddress }, (error, result) => {
      if (error) {
        return dispatch(errorSetReverseResolver(error.message));
      }

      dispatch(waitingSetReverseResolver());

      const transactionConfirmed = () => () => {
        sendBrowserNotification('RSK Manager', 'reverse_success');
        dispatch(receieveSetReverseResolver(value, result));
      };

      return dispatch(transactionListener(result, () => transactionConfirmed()));
    },
  );
};
