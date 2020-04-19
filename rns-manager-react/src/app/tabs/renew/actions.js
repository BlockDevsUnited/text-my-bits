import {
  REQUEST_RENEW_DOMAIN, RECEIVE_RENEW_DOMAIN, ERROR_RENEW_DOMAIN,
} from './types';

export const requestRenewDomain = () => ({
  type: REQUEST_RENEW_DOMAIN,
});

export const receiveRenewDomain = () => ({
  type: RECEIVE_RENEW_DOMAIN,
});

export const errorRenewDomain = () => ({
  type: ERROR_RENEW_DOMAIN,
});
