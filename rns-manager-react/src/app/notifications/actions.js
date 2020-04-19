import {
  notificationTypes, ADD_NOTIFICATION, VIEW_NOTIFICATION, TX_MINED, MIGRATE_RESOLVER_NOTIFICATION,
} from './types';

export const addTxNotification = (tx, message, params) => ({
  type: ADD_NOTIFICATION,
  notification: {
    type: notificationTypes.TX,
    tx,
    message,
    params,
  },
});

export const notifyError = message => ({
  type: ADD_NOTIFICATION,
  notification: {
    type: notificationTypes.ERROR,
    message,
  },
});

export const viewNotification = id => ({
  type: VIEW_NOTIFICATION,
  id,
});

export const txMined = txHash => ({
  type: TX_MINED,
  txHash,
});

export const notifyMigrateResolver = () => ({
  type: MIGRATE_RESOLVER_NOTIFICATION,
});
