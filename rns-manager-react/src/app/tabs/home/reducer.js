import {
  GET_WALLET_BALANCE, GET_TEXTING_BALANCE, GET_ACCOUNT
} from './types';
const initialState = {
  walletBalance: '',
  phoneNumber: '',
  textingBalance: ''
};
const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_WALLET_BALANCE: {
      return {
        ...state,
        walletBalance: action.payload.walletBalance,
      };
    }
    case GET_TEXTING_BALANCE: {
      return {
        ...state,
        textingBalance: action.payload.textingBalance,
      };
    }
    case GET_ACCOUNT: {
      return {
        ...state,
        account: action.payload.account,
      };
    }
    default: return state;
  }
};

export default accountReducer;