import {
  REQUEST_NEW_SUBDOMAIN, RECEIVE_NEW_SUBDOMAIN, ERROR_NEW_SUBDOMAIN,
  ERROR_NEW_SUBDOMAIN_CLOSE, ADD_SUBDOMAIN_TO_LIST, CLEAR_SUBDOMAIN_LIST,
  SUCCESS_NEW_SUBDOMAIN_CLOSE, WAITING_NEW_SUBDOMAIN_CONFIRM, REQUEST_SET_SUBDOMAIN_OWNER,
  ERROR_SET_SUBDOMAIN_OWNER, WAITING_SET_SUBDOMAIN_OWNER, RECEIVE_SET_SUBDOMAIN_OWNER,
  RECEIEVE_SET_SUBDOMAIN_SUCCESS_CLOSE, REMOVE_SUBDOMAIN_FROM_LIST,
} from './types';

const initialState = {
  subdomains: [],
  newRequesting: false,
  newWaiting: false,
  confirmedTx: '',
  newError: '',
  editDomain: '',
  editError: '',
};

const subDomainInitialState = {
  name: '',
  owner: '',
  isActive: true,
  editError: '',
  isEditing: false,
  isWaiting: false,
  isSuccess: false,
  confirmedTx: '',
};

const subdomainReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_NEW_SUBDOMAIN: return {
      ...state,
      newRequesting: true,
    };
    case WAITING_NEW_SUBDOMAIN_CONFIRM: return {
      ...state,
      newWaiting: true,
    };
    case RECEIVE_NEW_SUBDOMAIN: return {
      ...state,
      newRequesting: false,
      newWaiting: false,
      confirmedTx: action.confirmedTx,
    };
    case ERROR_NEW_SUBDOMAIN: return {
      ...state,
      newError: action.message,
      newRequesting: false,
      newWaiting: false,
    };
    case ERROR_NEW_SUBDOMAIN_CLOSE: return {
      ...state,
      newError: '',
    };
    case SUCCESS_NEW_SUBDOMAIN_CLOSE: return {
      ...state,
      confirmedTx: '',
    };

    case CLEAR_SUBDOMAIN_LIST: return {
      ...state,
      subdomains: [],
    };
    case ADD_SUBDOMAIN_TO_LIST: return {
      ...state,
      subdomains: {
        ...state.subdomains,
        [action.subdomain]: {
          ...subDomainInitialState,
          name: action.subdomain,
          owner: action.owner,
        },
      },
    };

    case REQUEST_SET_SUBDOMAIN_OWNER: return {
      ...state,
      subdomains: {
        ...state.subdomains,
        [action.subdomain]: {
          ...state.subdomains[action.subdomain],
          isEditing: true,
        },
      },
    };
    case WAITING_SET_SUBDOMAIN_OWNER: return {
      ...state,
      subdomains: {
        ...state.subdomains,
        [action.subdomain]: {
          ...state.subdomains[action.subdomain],
          isWaiting: true,
        },
      },
    };
    case RECEIVE_SET_SUBDOMAIN_OWNER: return {
      ...state,
      subdomains: {
        ...state.subdomains,
        [action.subdomain]: {
          ...state.subdomains[action.subdomain],
          isEditing: false,
          isWaiting: false,
          isSuccess: true,
          confirmedTx: action.confirmedTx,
          owner: action.newOwner,
        },
      },
    };
    case RECEIEVE_SET_SUBDOMAIN_SUCCESS_CLOSE: return {
      ...state,
      subdomains: {
        ...state.subdomains,
        [action.subdomain]: {
          ...state.subdomains[action.subdomain],
          isSuccess: false,
          confirmedTx: '',
        },
      },
    };
    case ERROR_SET_SUBDOMAIN_OWNER: return {
      ...state,
      subdomains: {
        ...state.subdomains,
        [action.subdomain]: {
          ...state.subdomains[action.subdomain],
          editError: action.message,
          isEditing: false,
          isWaiting: false,
        },
      },
    };

    case REMOVE_SUBDOMAIN_FROM_LIST: return {
      ...state,
      subdomains: {
        ...state.subdomains,
        [action.subdomain]: {
          isActive: false,
        },
      },
    };
    default: return state;
  }
};

export default subdomainReducer;
