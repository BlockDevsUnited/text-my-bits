import {
  REQUEST_REGISTRAR_GET_COST, RECEIVE_REGISTRAR_GET_COST,
  REQUEST_REGISTRAR_COMMIT, RECEIVE_REGISTRAR_COMMIT, ERROR_REGISTRAR_COMMIT,
  REQUEST_REGISTRAR_REVEAL_COMMIT, RECEIVE_REGISTRAR_REVEAL_COMMIT,
  RECEIVE_CAN_REVEAL_COMMIT, ERROR_REGISTRAR_REVEAL_COMMIT, OPTIONS_NOT_FOUND,
  REGISTRAR_COMMIT_CONFIRMED, REVEAL_COMMIT_CONFIRMED, RESET_REGISTRAR_STATE,
  REQUEST_CONVERSION_RATE, RECEIVE_CONVERSION_RATE, ERROR_CONVERSION_RATE,
  TOGGLE_SETUP_ADDRESS,
} from './types';

export const requestGetCost = duration => ({
  type: REQUEST_REGISTRAR_GET_COST,
  duration,
});

export const receiveGetCost = (rifCost, hasBalance) => ({
  type: RECEIVE_REGISTRAR_GET_COST,
  rifCost,
  hasBalance,
});

export const requestCommitRegistrar = () => ({
  type: REQUEST_REGISTRAR_COMMIT,
});

export const receiveCommitRegistrar = (hash, commitConfirmed) => ({
  type: RECEIVE_REGISTRAR_COMMIT,
  hash,
  commitConfirmed,
});

export const errorRegistrarCommit = () => ({
  type: ERROR_REGISTRAR_COMMIT,
});

export const requestRevealCommit = () => ({
  type: REQUEST_REGISTRAR_REVEAL_COMMIT,
});

export const receiveRevealCommit = () => ({
  type: RECEIVE_REGISTRAR_REVEAL_COMMIT,
});

export const errorRevealCommit = () => ({
  type: ERROR_REGISTRAR_REVEAL_COMMIT,
});

export const receiveCanRevealCommit = canReveal => ({
  type: RECEIVE_CAN_REVEAL_COMMIT,
  canReveal,
});

export const optionsNotFound = () => ({
  type: OPTIONS_NOT_FOUND,
});

export const commitTxMined = () => ({
  type: REGISTRAR_COMMIT_CONFIRMED,
});

export const revealTxMined = () => ({
  type: REVEAL_COMMIT_CONFIRMED,
});

export const resetRegistrarState = () => ({
  type: RESET_REGISTRAR_STATE,
});

export const requestConversionRate = () => ({
  type: REQUEST_CONVERSION_RATE,
});

export const recieveConversionRate = conversionRate => ({
  type: RECEIVE_CONVERSION_RATE,
  conversionRate,
});

export const errorConversionRate = () => ({
  type: ERROR_CONVERSION_RATE,
});

export const toggleSetupAddr = setupAddr => ({
  type: TOGGLE_SETUP_ADDRESS,
  setupAddr: !setupAddr,
});
