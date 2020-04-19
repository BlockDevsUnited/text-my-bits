import {
  ADD_NOTIFICATION, VIEW_NOTIFICATION, TX_MINED, notificationTypes, MIGRATE_RESOLVER_NOTIFICATION,
} from './types';

const initialState = [];

let notificationId = 0;

const newNotification = (notification) => {
  notificationId += 1;
  return {
    ...notification,
    id: notificationId,
    mined: false,
    viewed: false,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTIFICATION: return [
      ...state,
      newNotification(action.notification),
    ];
    case VIEW_NOTIFICATION: return state.map(n => (
      (n.id === action.id ? { ...n, viewed: true } : n)
    ));
    case TX_MINED: return state.map(n => (n.tx === action.txHash ? { ...n, mined: true } : n));
    case MIGRATE_RESOLVER_NOTIFICATION: return [
      ...state,
      {
        type: notificationTypes.MIGRATE_RESOLVER,
      },
    ];
    default: return state;
  }
};

export default reducer;
