import fieldTypes from '../../factories/typeFactory';

export const OWNER = fieldTypes('OWNER');
export const RESOLVER = fieldTypes('RESOLVER');
export const TTL = fieldTypes('TTL');
export const TRANSFER_DOMAIN = fieldTypes('TRANSFER_DOMAIN');

// subdomains
export const ADD_SUBDOMAIN = 'ADD_SUBDOMAIN';
export const RECEIVE_SUBDOMAIN_OWNER = 'RECEIVE_SUBDOMAIN_OWNER';
export const CLEAR_SUBDOMAINS = 'CLEAR_SUBDOMAINS';

// set subdomain owner
export const VIEW_EDIT_SUBDOMAIN_OWNER = 'VIEW_EDIT_SUBDOMAIN_OWNER';
export const REQUEST_SET_SUBDOMAIN_OWNER = 'REQUEST_SET_SUBDOMAIN_OWNER';
export const RECEIVE_SET_SUBDOMAIN_OWNER = 'RECEIVE_SET_SUBDOMAIN_OWNER';

// reverse suite
export const REVERSE_REQUEST_GET = 'REVERSE_REQUEST_GET';
export const REVERSE_RECEIVE_GET = 'REVERSE_RECEIVE_GET';
export const REVERSE_REQUEST_SET = 'REVERSE_REQUEST_SET';
export const REVERSE_RECEIVE_SET = 'REVERSE_RECEIVE_SET';
export const REVERSE_ERROR_SET = 'REVERSE_ERROR_SET';

// migrate domain
export const FIFS_MIGRATION_CHECK_SUBDOMAIN = 'FIFS_MIGRATION_CHECK_SUBDOMAIN';
export const FIFS_MIGRATION_REQUEST_CHECK_MIGRATION = 'FIFS_MIGRATION_REQUEST_CHECK_MIGRATION';
export const FIFS_MIGRATION_RECEIVE_CHECK_MIGRATION = 'FIFS_MIGRATION_RECEIVE_CHECK_MIGRATION';
export const FIFS_MIGRATION_REQUEST_MIGRATION = 'FIFS_MIGRATION_REQUEST_MIGRATION';
export const FIFS_MIGRATION_RECEIVE_MIGRATION = 'FIFS_MIGRATION_RECEIVE_MIGRATION';
export const FIFS_MIGRATION_ERROR_MIGRATION = 'FIFS_MIGRATION_ERROR_MIGRATION';
export const FIFS_MIGRATION_ERROR_CHECK_MIGRATION = 'FIFS_MIGRATION_ERROR_CHECK_MIGRATION';

// transfer domain
export const TRANSFER_DOMAIN_CHECK_SUBDOMAIN = 'TRANSFER_DOMAIN_CHECK_SUBDOMAIN';
export const TRANSFER_DOMAIN_REQUEST_CHECK_OWNER = 'TRANSFER_DOMAIN_REQUEST_CHECK_OWNER';
export const TRANSFER_DOMAIN_RECEIVE_CHECK_OWNER = 'TRANSFER_DOMAIN_RECEIVE_CHECK_OWNER';
export const TRANSFER_DOMAIN_ERROR_CHECK_OWNER = 'TRANSFER_DOMAIN_ERROR_CHECK_OWNER';
export const TRANSFER_DOMAIN_REQUEST_TRANSFER = 'TRANSFER_DOMAIN_REQUEST_TRANSFER';
export const TRANSFER_DOMAIN_RECEIVE_TRANSFER = 'TRANSFER_DOMAIN_RECEIVE_TRANSFER';
export const TRANSFER_DOMAIN_ERROR_TRANSFER = 'TRANSFER_DOMAIN_ERROR_TRANSFER';

// renew domain
export const RENEW_DOMAIN_CHECK_SUBDOMAIN = 'RENEW_DOMAIN_CHECK_SUBDOMAIN';
export const RENEW_DOMAIN_RECEIVE_EXPIRATION_TIME = 'RENEW_DOMAIN_RECEIVE_EXPIRATION_TIME';
export const RENEW_DOMAIN_ERROR_EXPIRATION_TIME = 'RENEW_DOMAIN_ERROR_EXPIRATION_TIME';
export const RENEW_DOMAIN_REQUEST_EXPIRATION_TIME = 'RENEW_DOMAIN_REQUEST_EXPIRATION_TIME';