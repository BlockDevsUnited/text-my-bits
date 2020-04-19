import {
  REQUEST_REVERSE_RESOLVER, RECEIVE_REVERSE_RESOLVER, REQUEST_SET_REVERSE_RESOLVER,
  RECEIVE_SET_REVERSE_RESOLVER, ERROR_SET_REVERSE_RESOLVER, WAITING_SET_REVERSE_RESOLVER,
  CLOSE_SET_REVERSE_RESOLVER, ERROR_REVERSE_RESOLVER,
} from './types';

export const requestResolver = () => ({
  type: REQUEST_REVERSE_RESOLVER,
});

export const receiveResolver = value => ({
  type: RECEIVE_REVERSE_RESOLVER,
  value,
});

export const errorResolver = message => ({
  type: ERROR_REVERSE_RESOLVER,
  message,
});

export const requestSetReverseResolver = () => ({
  type: REQUEST_SET_REVERSE_RESOLVER,
});

export const waitingSetReverseResolver = () => ({
  type: WAITING_SET_REVERSE_RESOLVER,
});

export const receieveSetReverseResolver = (value, successTx) => ({
  type: RECEIVE_SET_REVERSE_RESOLVER,
  value,
  successTx,
});

export const errorSetReverseResolver = message => ({
  type: ERROR_SET_REVERSE_RESOLVER,
  message,
});

export const closeMessages = () => ({
  type: CLOSE_SET_REVERSE_RESOLVER,
});
