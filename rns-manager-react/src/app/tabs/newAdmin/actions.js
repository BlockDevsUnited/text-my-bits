import {
  SET_VIEW, CHECK_IF_SUBDOMAIN, REQUEST_CHECK_OWNERSHIP, RECIEVE_CHECK_OWNERSHIP,
  ERROR_CHECK_OWNERSHIP, REQUEST_FIFS_MIGRATION_STATUS, RECEIVE_FIFS_MIGRATION_STATUS,
  ERROR_FIFS_MIGRATION_STATUS,
} from './types';

export const toggleBasicAdvanced = showAdvancedView => ({
  type: SET_VIEW,
  advancedView: showAdvancedView,
});

export const checkIfSubdomain = result => ({
  type: CHECK_IF_SUBDOMAIN,
  result,
});

export const requestCheckTokenOwner = () => ({
  type: REQUEST_CHECK_OWNERSHIP,
});

export const receiveCheckTokenOwner = (isTokenOwner, currentOwner) => ({
  type: RECIEVE_CHECK_OWNERSHIP,
  isTokenOwner,
  currentOwner,
});

export const errorCheckTokenOwner = () => ({
  type: ERROR_CHECK_OWNERSHIP,
});

export const requestFifsMigrationStatus = () => ({
  type: REQUEST_FIFS_MIGRATION_STATUS,
});

export const receiveFifsMigrationStatus = result => ({
  type: RECEIVE_FIFS_MIGRATION_STATUS,
  result,
});

export const errorFifsMigrationStatus = () => ({
  type: ERROR_FIFS_MIGRATION_STATUS,
});
