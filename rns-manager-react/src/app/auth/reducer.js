import * as types from './types';

const initialState = {
  showModal: false,
  hasMetamask: true,
  walletUnlocked: false,
  enabling: false,
  enableError: null,
  address: null,
  authenticating: false,
  authError: false,
  authErrorDomain: '',
  name: null,
  storageName: localStorage.getItem('name'),
  isOwner: false,
  network: null,
  networkMatch: false,
  showPopUp: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SHOW_AUTH_MODAL: return {
      ...state,
      defaultName: action.name,
      showModal: true,
    };
    case types.CLOSE_AUTH_MODAL: return {
      ...state,
      showModal: false,
    };
    case types.RECEIVE_HAS_METAMASK: return {
      ...state,
      hasMetamask: action.value,
    };
    case types.REQUEST_ENABLE: return {
      ...state,
      enabling: true,
      enableError: null,
      address: null,
      network: null,
    };
    case types.RECEIVE_ENABLE: return {
      ...state,
      enabling: false,
      enableError: null,
      address: action.address,
      network: action.network,
      networkMatch: action.networkMatch,
      walletUnlocked: action.walletUnlocked,
    };
    case types.ERROR_ENABLE: return {
      ...state,
      enabling: false,
      enableError: action.message,
      address: null,
      network: null,
    };
    case types.REQUEST_LOGIN: return {
      ...state,
      authenticating: true,
      authError: false,
      name: null,
      authErrorDomain: '',
    };
    case types.RECEIVE_LOGIN: return {
      ...state,
      authenticating: false,
      authError: false,
      showPopUp: false,
      name: action.name,
      storageName: action.name,
      isOwner: action.isOwner,
    };
    case types.ERROR_LOGIN: return {
      ...state,
      authenticating: false,
      authError: true,
      name: null,
      showPopUp: true,
      message: action.message,
      authErrorDomain: action.domain,
    };
    case types.LOG_OUT: return {
      ...state,
      name: null,
      isOwner: false,
      authError: false,
      authenticating: false,
      showPopUp: false,
    };
    case types.TOGGLE_POPUP: return {
      ...state,
      showPopUp: action.show,
    };
    default: return state;
  }
};
