import { hash as namehash } from 'eth-ens-namehash';
import { addTxNotification, txMined, notifyMigrateResolver } from './actions';
import { rns as rnsAddress, publicResolver } from '../adapters/configAdapter';

export const notifyTx = (tx, message, params, callback) => (dispatch) => {
  dispatch(addTxNotification(tx, message, params));

  const checkInterval = setInterval(() => {
    window.ethereum.sendAsync({
      method: 'eth_getTransactionByHash',
      params: [tx],
    }, (err, response) => {
      if (response.result.blockNumber) {
        clearInterval(checkInterval);
        dispatch(txMined(tx));
        if (callback) dispatch(callback());
      }
    });
  }, 2000);
};

export const checkResolver = name => (dispatch) => {
  const rns = window.web3 && window.web3.eth.contract([
    {
      constant: true,
      inputs: [
        { name: 'node', type: 'bytes32' },
      ],
      name: 'resolver',
      outputs: [
        { name: '', type: 'address' },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
  ]).at(rnsAddress);

  const node = namehash(name);

  return new Promise((resolve) => {
    rns.resolver(node, (error, result) => {
      if (!error && result && result.toLowerCase() === publicResolver) {
        resolve(dispatch(notifyMigrateResolver()));
      }
    });
  });
};
