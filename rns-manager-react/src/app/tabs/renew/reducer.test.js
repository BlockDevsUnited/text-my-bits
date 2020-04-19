import reducer from './reducer';
import {
  REQUEST_RENEW_DOMAIN, RECEIVE_RENEW_DOMAIN, ERROR_RENEW_DOMAIN,
} from './types';

describe('renew reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {}))
      .toEqual(
        {
          renewing: false,
        },
      );
  });

  it('should handle REQUEST_RENEW_DOMAIN', () => {
    expect(
      reducer({}, {
        type: REQUEST_RENEW_DOMAIN,
      }),
    )
      .toEqual({
        renewing: true,
      });
  });

  it('should handle RECEIVE_RENEW_DOMAIN', () => {
    expect(
      reducer({}, {
        type: RECEIVE_RENEW_DOMAIN,
      }),
    ).toEqual({
      renewing: false,
    });
  });

  it('should handle ERROR_RENEW_DOMAIN', () => {
    expect(
      reducer({}, {
        type: ERROR_RENEW_DOMAIN,
      }),
    ).toEqual({
      renewing: false,
    });
  });
});
