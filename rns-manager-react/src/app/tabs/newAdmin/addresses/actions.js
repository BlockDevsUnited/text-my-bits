import {
  REQUEST_SET_CHAIN_ADDRESS, ERROR_SET_CHAIN_ADDRESS, RECEIVE_SET_CHAIN_ADDRESS,
  WAITING_SET_CHAIN_ADDRESS, CLOSE_SET_CHAIN_ADDRESS, REQUEST_CHAIN_ADDRESS,
  RECEIVE_CHAIN_ADDRESS, ERROR_CHAIN_ADDRESS, CLEAR_ADDRESSES,
} from './types';

export const requestSetChainAddress = chainName => ({
  type: REQUEST_SET_CHAIN_ADDRESS,
  chainName,
});

export const waitingSetChainAddress = chainName => ({
  type: WAITING_SET_CHAIN_ADDRESS,
  chainName,
});

export const errorSetChainAddress = (chainName, message) => ({
  type: ERROR_SET_CHAIN_ADDRESS,
  chainName,
  message,
});

export const closeSetChainAddress = chainName => ({
  type: CLOSE_SET_CHAIN_ADDRESS,
  chainName,
});

export const requestChainAddress = () => ({
  type: REQUEST_CHAIN_ADDRESS,
});

export const receiveSetChainAddress = (chainId, chainName, address, resultTx, isNew) => ({
  type: RECEIVE_SET_CHAIN_ADDRESS,
  chainId,
  chainName,
  address,
  resultTx,
  isNew,
});

export const receiveChainAddress = (chainId, chainName, address) => ({
  type: RECEIVE_CHAIN_ADDRESS,
  chainId,
  chainName,
  address,
});

export const errorChainAddress = (chainName, message) => ({
  type: ERROR_CHAIN_ADDRESS,
  chainName,
  message,
});

export const clearAddresses = () => ({
  type: CLEAR_ADDRESSES,
});
