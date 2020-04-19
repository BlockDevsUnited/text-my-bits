import Web3 from 'web3';
import { addr, content } from './actions';
import {
  publicResolver as resolverAddress,
} from '../../adapters/configAdapter';
import { gasPrice as defaultGasPrice } from '../../adapters/gasPriceAdapter';
import { txTypes } from '../../notifications';
import { get, set } from '../../factories/operationFactory';
import abi from './abi.json';

const web3 = new Web3(window.ethereum);
const resolver = new web3.eth.Contract(abi, resolverAddress, { gasPrice: defaultGasPrice });

export const getAddr = get(
  addr.requestGet,
  addr.receiveGet,
  resolver && resolver.methods.addr,
);

export const getContent = get(
  content.requestGet,
  content.receiveGet,
  resolver && resolver.methods.content,
);

export const setAddr = set(
  addr.requestSet,
  addr.receiveSet,
  txTypes.SET_ADDR,
  resolver && resolver.methods.setAddr,
  getAddr,
);

export const setContent = set(
  content.requestSet,
  content.receiveSet,
  txTypes.SET_CONTENT,
  resolver && resolver.methods.setContent,
  getContent,
);
