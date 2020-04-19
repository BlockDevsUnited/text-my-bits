import {
  REQUEST_RESOLVER, RECEIVE_RESOLVER, REQUEST_SET_RESOLVER, RECEIVE_SET_RESOLVER,
  ERROR_SET_RESOLVER, WAITING_SET_RESOLVER, CLOSE_MESSAGE,
} from './types';

export const requestResolver = () => ({
  type: REQUEST_RESOLVER,
});

export const receiveResolver = (resolverAddr, resolverName) => ({
  type: RECEIVE_RESOLVER,
  resolverAddr,
  resolverName,
});

export const requestSetResolver = () => ({
  type: REQUEST_SET_RESOLVER,
});

export const waitingSetResolver = () => ({
  type: WAITING_SET_RESOLVER,
});

export const receiveSetResolver = (successTx, resolverAddr, resolverName) => ({
  type: RECEIVE_SET_RESOLVER,
  successTx,
  resolverAddr,
  resolverName,
});

export const errorSetResolver = message => ({
  type: ERROR_SET_RESOLVER,
  message,
});

export const closeMessage = () => ({
  type: CLOSE_MESSAGE,
});
