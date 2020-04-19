import {
  REQUEST_RENEW_DOMAIN, RECEIVE_RENEW_DOMAIN, ERROR_RENEW_DOMAIN,
} from './types';

const initialState = {
  renewing: false,
};

const renewReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_RENEW_DOMAIN: {
      return {
        ...state,
        renewing: true,
      };
    }
    case RECEIVE_RENEW_DOMAIN: {
      return {
        ...state,
        renewing: false,
      };
    }
    case ERROR_RENEW_DOMAIN: {
      return {
        ...state,
        renewing: false,
      };
    }
    default: return state;
  }
};

export default renewReducer;
