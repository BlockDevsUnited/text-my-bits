import Web3 from 'web3';
import { hash as namehash } from 'eth-ens-namehash';
import { content, chainAddr } from './actions';
import {
  multiChainResolver as resolverAddress,
} from '../../adapters/configAdapter';
import { gasPrice as defaultGasPrice } from '../../adapters/gasPriceAdapter';
import { txTypes, notifyTx, notifyError } from '../../notifications';
import { get, set } from '../../factories/operationFactory';
import abi from './abi.json';

const web3 = new Web3(window.ethereum);
const resolver = new web3.eth.Contract(abi, resolverAddress, { gasPrice: defaultGasPrice });

export const getContent = get(
  content.requestGet,
  content.receiveGet,
  resolver && resolver.methods.content,
);

export const setContent = set(
  content.requestSet,
  content.receiveSet,
  txTypes.SET_CONTENT,
  resolver && resolver.methods.setContent,
  getContent,
);

export const getChainAddr = (name, chainId) => (dispatch) => {
  dispatch(chainAddr.requestGet());

  const hash = namehash(name);

  return new Promise((resolve) => {
    resolver.methods.chainAddr(hash, chainId).call((error, result) => {
      if (error) return resolve(dispatch(notifyError(error.message)));
      return resolve(dispatch(chainAddr.receiveGet(result)));
    });
  });
};

export const setChainAddr = (name, chainId, value, sender) => (dispatch) => {
  dispatch(chainAddr.requestSet());

  const hash = namehash(name);

  return new Promise((resolve) => {
    resolver.methods.setChainAddr(hash, chainId, value).send(
      { from: sender },
      async (error, result) => {
        dispatch(chainAddr.receiveSet());
        if (error) return resolve(dispatch(notifyError(error.message)));

        const accounts = await window.ethereum.enable();
        return resolve(dispatch(notifyTx(result, '', {
          type: txTypes.SET_CHAIN_ADDR, name, chainId, value, addr: accounts[0],
        }, () => getChainAddr(name, chainId))));
      },
    );
  });
};
