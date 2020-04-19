import {
  GET_WALLET_BALANCE, GET_TEXTING_BALANCE, GET_ACCOUNT
} from './types';

export const getWalletBalance = (walletBalance) => ({
  type: GET_WALLET_BALANCE,
  payload: walletBalance
});

export const getTextingBalance = (textingBalance) => ({
  type: GET_TEXTING_BALANCE,
  payload: textingBalance
});
export const getAccount = (account) => ({
  type: GET_ACCOUNT,
  payload: account
});