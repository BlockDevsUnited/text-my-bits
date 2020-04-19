import Web3 from 'web3';
import { str } from './actions';
import {
  stringResolver as resolverAddress,
} from '../../adapters/configAdapter';
import { gasPrice as defaultGasPrice } from '../../adapters/gasPriceAdapter';
import { txTypes } from '../../notifications';
import { get, set } from '../../factories/operationFactory';
import abi from './abi.json';

const web3 = new Web3(window.ethereum);
const resolver = new web3.eth.Contract(abi, resolverAddress, { gasPrice: defaultGasPrice });

export const getStr = get(
  str.requestGet,
  str.receiveGet,
  resolver && resolver.methods.str,
);

export const setStr = set(
  str.requestSet,
  str.receiveSet,
  txTypes.SET_STR,
  resolver && resolver.methods.setStr,
  getStr,
);
