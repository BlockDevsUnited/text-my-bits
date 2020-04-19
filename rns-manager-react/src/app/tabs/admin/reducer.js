import { combineReducers } from 'redux';
import {
  OWNER, RESOLVER, TTL,
  ADD_SUBDOMAIN, RECEIVE_SUBDOMAIN_OWNER, CLEAR_SUBDOMAINS,
  REQUEST_SET_SUBDOMAIN_OWNER, RECEIVE_SET_SUBDOMAIN_OWNER, VIEW_EDIT_SUBDOMAIN_OWNER,
  REVERSE_REQUEST_GET, REVERSE_RECEIVE_GET, REVERSE_REQUEST_SET,
  REVERSE_RECEIVE_SET, REVERSE_ERROR_SET,
  FIFS_MIGRATION_CHECK_SUBDOMAIN, FIFS_MIGRATION_REQUEST_CHECK_MIGRATION,
  FIFS_MIGRATION_RECEIVE_CHECK_MIGRATION, FIFS_MIGRATION_RECEIVE_MIGRATION,
  FIFS_MIGRATION_REQUEST_MIGRATION, FIFS_MIGRATION_ERROR_MIGRATION,
  FIFS_MIGRATION_ERROR_CHECK_MIGRATION, TRANSFER_DOMAIN_CHECK_SUBDOMAIN,
  TRANSFER_DOMAIN_RECEIVE_CHECK_OWNER, TRANSFER_DOMAIN_ERROR_CHECK_OWNER,
  TRANSFER_DOMAIN_REQUEST_TRANSFER, TRANSFER_DOMAIN_RECEIVE_TRANSFER,
  TRANSFER_DOMAIN_ERROR_TRANSFER, TRANSFER_DOMAIN_REQUEST_CHECK_OWNER, RENEW_DOMAIN_CHECK_SUBDOMAIN,
  RENEW_DOMAIN_REQUEST_EXPIRATION_TIME, RENEW_DOMAIN_ERROR_EXPIRATION_TIME,
  RENEW_DOMAIN_RECEIVE_EXPIRATION_TIME,
} from './types';
import fieldReducer from '../../factories/reducerFactory';

const subdomains = (state = [], action = {}) => {
  switch (action.type) {
    case ADD_SUBDOMAIN: {
      return [...state, {
        label: action.label,
        owner: '...',
        viewEdit: false,
        editing: false,
      }];
    }
    case RECEIVE_SUBDOMAIN_OWNER: {
      return state.map(subdomain => (subdomain.label === action.label
        ? {
          ...subdomain,
          owner: action.owner,
        } : subdomain));
    }
    case VIEW_EDIT_SUBDOMAIN_OWNER: {
      return state.map(subdomain => (subdomain.label === action.label
        ? {
          ...subdomain,
          viewEdit: !subdomain.viewEdit,
        } : subdomain));
    }
    case REQUEST_SET_SUBDOMAIN_OWNER: {
      return state.map(subdomain => (subdomain.label === action.label
        ? {
          ...subdomain,
          editing: true,
        } : subdomain));
    }
    case RECEIVE_SET_SUBDOMAIN_OWNER: {
      return state.map(subdomain => (subdomain.label === action.label
        ? {
          ...subdomain,
          editing: false,
        } : subdomain));
    }
    case CLEAR_SUBDOMAINS: return [];
    default: return state;
  }
};

const defaultReverse = {
  reverseResolution: undefined,
  getting: false,
  setting: false,
};

const reverse = (state = defaultReverse, action) => {
  switch (action.type) {
    case (REVERSE_REQUEST_GET): {
      return {
        ...state,
        getting: true,
      };
    }
    case (REVERSE_RECEIVE_GET): {
      return {
        ...state,
        getting: false,
        reverseResolution: action.reverseResolution,
      };
    }
    case (REVERSE_REQUEST_SET): {
      return {
        ...state,
        setting: true,
        reverseResolution: undefined,
      };
    }
    case (REVERSE_RECEIVE_SET): {
      return {
        ...state,
        setting: false,
        reverseResolution: action.reverseResolution,
      };
    }
    case (REVERSE_ERROR_SET): {
      return {
        ...state,
        setting: false,
        reverseResolution: undefined,
      };
    }
    default: return state;
  }
};

const defaultFifsMigration = {
  isSubdomain: undefined,
  migrated: false,
  checking: false,
  migrating: false,
  justMigrated: false,
};

const fifsMigration = (state = defaultFifsMigration, action) => {
  switch (action.type) {
    case (FIFS_MIGRATION_CHECK_SUBDOMAIN): {
      return {
        ...state,
        isSubdomain: action.isSubdomain,
      };
    }
    case (FIFS_MIGRATION_REQUEST_CHECK_MIGRATION): {
      return {
        ...state,
        checking: true,
      };
    }
    case (FIFS_MIGRATION_RECEIVE_CHECK_MIGRATION): {
      return {
        ...state,
        migrated: action.migrated,
        checking: false,
      };
    }
    case (FIFS_MIGRATION_ERROR_CHECK_MIGRATION): {
      return {
        ...state,
        migrated: false,
        checking: false,
      };
    }
    case (FIFS_MIGRATION_REQUEST_MIGRATION): {
      return {
        ...state,
        migrating: true,
      };
    }
    case (FIFS_MIGRATION_RECEIVE_MIGRATION): {
      return {
        ...state,
        migrating: false,
        migrated: true,
        justMigrated: true,
      };
    }
    case (FIFS_MIGRATION_ERROR_MIGRATION): {
      return {
        ...state,
        migrated: false,
        migrating: false,
        justMigrated: false,
      };
    }
    default: return state;
  }
};

const defaultTransferDomain = {
  isSubdomain: null,
  isTokenOwner: false,
  checking: false,
  transferring: false,
  justTransferred: false,
  currentOwner: null,
};

const transferDomain = (state = defaultTransferDomain, action) => {
  switch (action.type) {
    case (TRANSFER_DOMAIN_CHECK_SUBDOMAIN): {
      return {
        ...state,
        isSubdomain: action.isSubdomain,
      };
    }
    case (TRANSFER_DOMAIN_REQUEST_CHECK_OWNER): {
      return {
        ...state,
        checking: true,
      };
    }
    case (TRANSFER_DOMAIN_RECEIVE_CHECK_OWNER): {
      return {
        ...state,
        isTokenOwner: action.isTokenOwner,
        currentOwner: action.currentOwner,
        checking: false,
      };
    }
    case (TRANSFER_DOMAIN_ERROR_CHECK_OWNER): {
      return {
        ...state,
        isTokenOwner: false,
        checking: false,
      };
    }
    case (TRANSFER_DOMAIN_REQUEST_TRANSFER): {
      return {
        ...state,
        transferring: true,
      };
    }
    case (TRANSFER_DOMAIN_RECEIVE_TRANSFER): {
      return {
        ...state,
        transferring: false,
        isTokenOwner: true,
        justTransferred: true,
      };
    }
    case (TRANSFER_DOMAIN_ERROR_TRANSFER): {
      return {
        ...state,
        transferring: false,
        justTransferred: false,
      };
    }
    default: return state;
  }
};

const defaultRenewDomain = {
  isSubdomain: null,
  expirationRemaining: 0,
  domain: null,
  checking: false,
};

const renewDomain = (state = defaultRenewDomain, action) => {
  switch (action.type) {
    case (RENEW_DOMAIN_CHECK_SUBDOMAIN): {
      return {
        ...state,
        isSubdomain: action.isSubdomain,
      };
    }
    case (RENEW_DOMAIN_REQUEST_EXPIRATION_TIME): {
      return {
        ...state,
        checking: true,
      };
    }
    case (RENEW_DOMAIN_RECEIVE_EXPIRATION_TIME): {
      return {
        ...state,
        checking: false,
        expirationRemaining: action.expirationRemaining,
        domain: action.domain,
      };
    }
    case (RENEW_DOMAIN_ERROR_EXPIRATION_TIME): {
      return {
        ...state,
        checking: false,
      };
    }
    default: return state;
  }
};

export default combineReducers({
  owner: fieldReducer(OWNER),
  resolver: fieldReducer(RESOLVER),
  ttl: fieldReducer(TTL),
  subdomains,
  reverse,
  fifsMigration,
  transferDomain,
  renewDomain,
});
