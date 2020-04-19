import {
  REQUEST_REVERSE_RESOLVER, RECEIVE_REVERSE_RESOLVER, REQUEST_SET_REVERSE_RESOLVER,
  WAITING_SET_REVERSE_RESOLVER, RECEIVE_SET_REVERSE_RESOLVER, ERROR_SET_REVERSE_RESOLVER,
  CLOSE_SET_REVERSE_RESOLVER, ERROR_REVERSE_RESOLVER,
} from './types';

const initialState = {
  isRequesting: false,
  isWaiting: false,
  isSuccess: false,
  isError: false,
  value: '',
  errorMessage: '',
};

const renewDomain = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_REVERSE_RESOLVER: return {
      ...state,
      isRequesting: true,
    };
    case RECEIVE_REVERSE_RESOLVER: return {
      ...state,
      value: action.value,
      isRequesting: false,
    };
    case ERROR_REVERSE_RESOLVER: return {
      ...state,
      value: '',
      isRequesting: false,
    };

    case REQUEST_SET_REVERSE_RESOLVER: return {
      ...state,
    };
    case WAITING_SET_REVERSE_RESOLVER: return {
      ...state,
      isWaiting: true,
    };
    case RECEIVE_SET_REVERSE_RESOLVER: return {
      ...state,
      isWaiting: false,
      isSuccess: true,
      value: action.value,
      successTx: action.successTx,
    };
    case ERROR_SET_REVERSE_RESOLVER: return {
      ...state,
      isError: true,
      isWaiting: false,
      errorMessage: action.message,
    };
    case CLOSE_SET_REVERSE_RESOLVER: return {
      ...state,
      isError: false,
      isSuccess: false,
      errorMessage: '',
    };
    default: return state;
  }
};

export default renewDomain;
