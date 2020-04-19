import {
  REQUEST_REGISTRAR_GET_COST, RECEIVE_REGISTRAR_GET_COST,
  REQUEST_REGISTRAR_COMMIT, RECEIVE_REGISTRAR_COMMIT, ERROR_REGISTRAR_COMMIT,
  REQUEST_REGISTRAR_REVEAL_COMMIT, RECEIVE_REGISTRAR_REVEAL_COMMIT,
  RECEIVE_CAN_REVEAL_COMMIT, ERROR_REGISTRAR_REVEAL_COMMIT, OPTIONS_NOT_FOUND,
  REGISTRAR_COMMIT_CONFIRMED, REVEAL_COMMIT_CONFIRMED, RESET_REGISTRAR_STATE,
  REQUEST_CONVERSION_RATE, RECEIVE_CONVERSION_RATE, TOGGLE_SETUP_ADDRESS, ERROR_CONVERSION_RATE,
} from './types';

const initialState = {
  gettingCost: false,
  committing: false,
  committed: false,
  hash: null,
  revealing: false,
  revealed: false,
  waiting: false,
  canReveal: false,
  commitConfirmed: null,
  revealConfirmed: null,
  hasBalance: false,
  gettingConversionRate: false,
  conversionRate: null,
  setupAddr: true,
};
const registrar = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_REGISTRAR_GET_COST: return {
      ...state,
      gettingCost: true,
      duration: action.duration,
    };
    case RECEIVE_REGISTRAR_GET_COST: return {
      ...state,
      gettingCost: false,
      rifCost: action.rifCost,
      hasBalance: action.hasBalance,
    };
    case REQUEST_REGISTRAR_COMMIT: return {
      ...state,
      committing: true,
    };
    case RECEIVE_REGISTRAR_COMMIT: return {
      ...state,
      committing: false,
      committed: true,
      waiting: true,
      hash: action.hash,
      commitConfirmed: action.commitConfirmed || null,
    };
    case ERROR_REGISTRAR_COMMIT: return {
      ...state,
      committing: false,
      committed: false,
    };
    case REQUEST_REGISTRAR_REVEAL_COMMIT: return {
      ...state,
      revealing: true,
    };
    case RECEIVE_REGISTRAR_REVEAL_COMMIT: return {
      ...state,
      revealing: false,
      revealed: true,
    };
    case ERROR_REGISTRAR_REVEAL_COMMIT: return {
      ...state,
      revealing: false,
      revealed: false,
    };
    case RECEIVE_CAN_REVEAL_COMMIT: return {
      ...state,
      canReveal: action.canReveal,
      waiting: !action.canReveal,
    };
    case REGISTRAR_COMMIT_CONFIRMED: return {
      ...state,
      commitConfirmed: true,
    };
    case REVEAL_COMMIT_CONFIRMED: return {
      ...state,
      revealConfirmed: true,
    };
    case OPTIONS_NOT_FOUND: return {
      ...state,
      ...initialState,
    };
    case REQUEST_CONVERSION_RATE: return {
      ...state,
      gettingConversionRate: true,
    };
    case RECEIVE_CONVERSION_RATE: return {
      ...state,
      conversionRate: action.conversionRate,
      gettingConversionRate: false,
    };
    case ERROR_CONVERSION_RATE: return {
      ...state,
      gettingConversionRate: false,
    };
    case TOGGLE_SETUP_ADDRESS: return {
      ...state,
      setupAddr: action.setupAddr,
    };
    case RESET_REGISTRAR_STATE:
      return initialState;
    default: return state;
  }
};

export default registrar;
