import {
  REQUEST_NEW_SUBDOMAIN, RECEIVE_NEW_SUBDOMAIN, ERROR_NEW_SUBDOMAIN,
  ERROR_NEW_SUBDOMAIN_CLOSE, ADD_SUBDOMAIN_TO_LIST, CLEAR_SUBDOMAIN_LIST,
  SUCCESS_NEW_SUBDOMAIN_CLOSE, WAITING_NEW_SUBDOMAIN_CONFIRM,
  RECEIVE_SET_SUBDOMAIN_OWNER, REQUEST_SET_SUBDOMAIN_OWNER, WAITING_SET_SUBDOMAIN_OWNER,
  ERROR_SET_SUBDOMAIN_OWNER, RECEIEVE_SET_SUBDOMAIN_SUCCESS_CLOSE, REMOVE_SUBDOMAIN_FROM_LIST,
} from './types';

export const requestNewSubdomain = () => ({
  type: REQUEST_NEW_SUBDOMAIN,
});

export const waitingNewSubdomainConfirm = () => ({
  type: WAITING_NEW_SUBDOMAIN_CONFIRM,
});

export const receiveNewSubdomain = confirmedTx => ({
  type: RECEIVE_NEW_SUBDOMAIN,
  confirmedTx,
});

export const errorNewSubdomain = message => ({
  type: ERROR_NEW_SUBDOMAIN,
  message,
});

export const errorNewSubdomainClose = () => ({
  type: ERROR_NEW_SUBDOMAIN_CLOSE,
});

export const successNewSubdomainClose = () => ({
  type: SUCCESS_NEW_SUBDOMAIN_CLOSE,
});

export const addSubdomainToList = (subdomain, owner) => ({
  type: ADD_SUBDOMAIN_TO_LIST,
  subdomain,
  owner,
});

export const clearSubdomainList = () => ({
  type: CLEAR_SUBDOMAIN_LIST,
});

export const requestSetSubdomainOwner = subdomain => ({
  type: REQUEST_SET_SUBDOMAIN_OWNER,
  subdomain,
});

export const receiveSetSubdomainOwner = (confirmedTx, subdomain, newOwner) => ({
  type: RECEIVE_SET_SUBDOMAIN_OWNER,
  confirmedTx,
  subdomain,
  newOwner,
});

export const waitingSetSubdomainOwner = subdomain => ({
  type: WAITING_SET_SUBDOMAIN_OWNER,
  subdomain,
});

export const errorSetSubdomainOwner = (subdomain, message) => ({
  type: ERROR_SET_SUBDOMAIN_OWNER,
  subdomain,
  message,
});

export const successSetSubdomainOwnerClose = subdomain => ({
  type: RECEIEVE_SET_SUBDOMAIN_SUCCESS_CLOSE,
  subdomain,
});

export const removeSubdomainFromList = subdomain => ({
  type: REMOVE_SUBDOMAIN_FROM_LIST,
  subdomain,
});
