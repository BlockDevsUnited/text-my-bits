import reducer from './reducer';
import { REQUEST_BROWSER_NOTIFICATIONS, RECIEVE_BROWSER_NOTIFICATIONS, GRANTED } from './types';

describe('browserNotifications reducer', () => {
  const initialState = {
    permission: 'default',
    requesting: false,
  };

  it('should return initial state', () => {
    expect(reducer(undefined, {}))
      .toEqual(initialState);
  });

  it('should change when requesting for permission', () => {
    expect(reducer(undefined, {
      type: REQUEST_BROWSER_NOTIFICATIONS,
    }))
      .toEqual({
        ...initialState,
        requesting: true,
      });
  });

  it('should change requesting to false when returned', () => {
    expect(reducer(undefined, {
      type: RECIEVE_BROWSER_NOTIFICATIONS,
      result: 'granted',
    }))
      .toEqual({
        requesting: false,
        permission: GRANTED,
      });
  });
});
