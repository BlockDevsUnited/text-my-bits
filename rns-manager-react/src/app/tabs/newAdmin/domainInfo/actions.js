import {
  REQUEST_TRANSFER_DOMAIN, RECEIVE_TRANSFER_DOMAIN, ERROR_TRANSFER_DOMAIN,
  HANDLE_TRANSFER_ERROR_CLOSE, HANDLE_TRANSFER_SUCCESS_CLOSE,
  REQUEST_DOMAIN_EXPIRATION_TIME, RECIEVE_DOMAIN_EXPIRATION_TIME,
  ERROR_DOMAIN_EXIPRATION_TIME, TOGGLE_RENEW_PANEL, REQUEST_RENEW_DOMAIN,
  RECEIVE_RENEW_DOMAIN, ERROR_RENEW_DOMAIN, CLOSE_RENEW_ERROR_MESSAGE,
  CLOSE_SUCCESS_ERROR_MESSAGE, REQUEST_FIFS_MIGRATION, RECEIVE_FIFS_MIGRATION, ERROR_FIFS_MIGRATION,
} from './types';

export const requestTransferDomain = () => ({
  type: REQUEST_TRANSFER_DOMAIN,
});

export const receiveTransferDomain = transferSuccessTx => ({
  type: RECEIVE_TRANSFER_DOMAIN,
  transferSuccessTx,
});

export const errorTransferDomain = message => ({
  type: ERROR_TRANSFER_DOMAIN,
  errorMessage: message,
});

export const handleTransferErrorClose = () => ({
  type: HANDLE_TRANSFER_ERROR_CLOSE,
});

export const handleTransferSuccessClose = () => ({
  type: HANDLE_TRANSFER_SUCCESS_CLOSE,
});

export const requestDomainExpirationTime = () => ({
  type: REQUEST_DOMAIN_EXPIRATION_TIME,
});

export const receiveDomainExpirationTime = remaining => ({
  type: RECIEVE_DOMAIN_EXPIRATION_TIME,
  remaining,
});

export const errorDomainExpirationTime = () => ({
  type: ERROR_DOMAIN_EXIPRATION_TIME,
});

export const toggleRenew = isRenewOpen => ({
  type: TOGGLE_RENEW_PANEL,
  isOpen: isRenewOpen,
});

export const requestRenewDomain = () => ({
  type: REQUEST_RENEW_DOMAIN,
});

export const receiveRenewDomain = renewSuccessTx => ({
  type: RECEIVE_RENEW_DOMAIN,
  renewSuccessTx,
});

export const errorRenewDomain = message => ({
  type: ERROR_RENEW_DOMAIN,
  message,
});

export const closeRenewError = () => ({
  type: CLOSE_RENEW_ERROR_MESSAGE,
});

export const closeRenewSuccess = () => ({
  type: CLOSE_SUCCESS_ERROR_MESSAGE,
});

export const requestFifsMigration = () => ({
  type: REQUEST_FIFS_MIGRATION,
});

export const receiveFifsMigration = () => ({
  type: RECEIVE_FIFS_MIGRATION,
});

export const errorFifsMigration = () => ({
  type: ERROR_FIFS_MIGRATION,
});
