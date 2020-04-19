import {
  RECEIVE_RESOLVER, REQUEST_RESOLVER, REQUEST_SET_RESOLVER, RECEIVE_SET_RESOLVER,
  ERROR_SET_RESOLVER, WAITING_SET_RESOLVER, CLOSE_MESSAGE,
} from './types';

const initialState = {
  resolverAddr: '',
  resolverName: '',
  isEditing: false,
  isWaiting: false,
  gettingResolver: false,
  successTx: '',
  errorMessage: '',
};

const resolverReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_RESOLVER: return {
      ...state,
      gettingResolver: true,
    };
    case RECEIVE_RESOLVER: return {
      ...state,
      gettingResolver: false,
      resolverAddr: action.resolverAddr,
      resolverName: action.resolverName,
    };

    case REQUEST_SET_RESOLVER: return {
      ...state,
      isEditing: true,
      errorMessage: '',
    };
    case WAITING_SET_RESOLVER: return {
      ...state,
      isWaiting: true,
    };
    case RECEIVE_SET_RESOLVER: return {
      ...state,
      gettingResolver: false,
      resolverAddr: action.resolverAddr,
      resolverName: action.resolverName,
      successTx: action.successTx,
      isEditing: false,
      isWaiting: false,
    };
    case ERROR_SET_RESOLVER: return {
      ...state,
      isEditing: false,
      isWaiting: false,
      errorMessage: action.message,
    };
    case CLOSE_MESSAGE: return {
      ...state,
      errorMessage: '',
    };
    default: return state;
  }
};

export default resolverReducer;
