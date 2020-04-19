import mockStore from '../../../tests/config/mockStore';
import en from '../../languages/en.json';
import { checkBrowserNotifications, getLanguageString } from './operations';
import {
  DEFAULT, NOTIFICATION_REGISTRAR_COMMITTED, NOTIFICATION_DOMAIN_READY_REGISTER,
  NOTIFICATION_REGISTRAR_REVEALED,
} from './types';

describe('browserNotifications operations', () => {
  const initialState = {
    browserNotifications: {
      requesting: false,
      permission: DEFAULT,
    },
  };

  let store;

  beforeEach(() => {
    store = mockStore(en, initialState);
  });

  it('should return default state when requesting for jest', () => {
    store.dispatch(checkBrowserNotifications());
    const state = store.getState();

    expect(state.browserNotifications.requesting).toBeFalsy();
    expect(state.browserNotifications.permission).toBe(DEFAULT);
  });

  it('should return the english strins when passed the type', () => {
    expect(getLanguageString(NOTIFICATION_REGISTRAR_COMMITTED))
      .toBe('your domain has been requested to be registered');
    expect(getLanguageString(NOTIFICATION_DOMAIN_READY_REGISTER))
      .toBe('Your domain is ready to be registered');
    expect(getLanguageString(NOTIFICATION_REGISTRAR_REVEALED))
      .toBe('your domain has been registered');
  });
});
