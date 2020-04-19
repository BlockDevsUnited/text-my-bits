import { REQUEST_BROWSER_NOTIFICATIONS, RECIEVE_BROWSER_NOTIFICATIONS } from './types';

export const requestBrowserNotifications = () => ({
  type: REQUEST_BROWSER_NOTIFICATIONS,
});

export const recieveBrowserNotifications = result => ({
  type: RECIEVE_BROWSER_NOTIFICATIONS,
  result,
});
