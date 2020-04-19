import {
  GET_WALLET_BALANCE, GET_TEXTING_BALANCE,
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
    default: return state;
  }
};

export default accountReducer;