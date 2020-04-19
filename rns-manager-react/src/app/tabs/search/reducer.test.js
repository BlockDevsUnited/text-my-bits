import reducer from './reducer';
import {
  REQUEST_DOMAIN_STATE, RECEIVE_DOMAIN_STATE, BLOCKED_DOMAIN,
  REQUEST_DOMAIN_OWNER, RECEIVE_DOMAIN_OWNER, RECEIVE_DOMAIN_COST, REQUEST_DOMAIN_COST,
} from './types';

describe('search reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {}))
      .toEqual(
        {
          owned: undefined,
          owner: undefined,
          domainStateLoading: false,
          blocked: undefined,
          requestingOwner: false,
          requestingCost: false,
          rifCost: 0,
        },
      );
  });

  it('should handle REQUEST_DOMAIN_STATE', () => {
    expect(
      reducer({}, {
        type: REQUEST_DOMAIN_STATE,
      }),
    )
      .toEqual({
        domainStateLoading: true,
      });
  });

  it('should handle BLOCKED_DOMAIN', () => {
    expect(
      reducer({}, {
        type: BLOCKED_DOMAIN,
      }),
    ).toEqual({
      domainStateLoading: false,
      blocked: true,
    });
  });

  it('should handle RECEIVE_DOMAIN_STATE not available', () => {
    expect(
      reducer({}, {
        type: RECEIVE_DOMAIN_STATE,
        owned: true,
      }),
    ).toEqual({
      owned: true,
      domainStateLoading: false,
      blocked: false,
    });
  });

  it('should handle RECEIVE_DOMAIN_STATE not available', () => {
    expect(
      reducer({}, {
        type: RECEIVE_DOMAIN_STATE,
        owned: true,
      }),
    ).toEqual({
      owned: true,
      domainStateLoading: false,
      blocked: false,
    });
  });

  it('should handle RECEIVE_DOMAIN_STATE available', () => {
    expect(
      reducer({}, {
        type: RECEIVE_DOMAIN_STATE,
        owned: false,
      }),
    ).toEqual({
      owned: false,
      domainStateLoading: false,
      blocked: false,
    });
  });

  it('should handle REQUEST_DOMAIN_STATE and RECEIVE_DOMAIN_STATE', () => {
    expect(
      reducer({}, {
        type: REQUEST_DOMAIN_STATE,
      }),
    )
      .toEqual({
        domainStateLoading: true,
      });

    expect(
      reducer({
        owned: undefined,
        domainStateLoading: true,
      }, {
        type: RECEIVE_DOMAIN_STATE,
        owned: false,
      }),
    ).toEqual({
      owned: false,
      domainStateLoading: false,
      blocked: false,
    });
  });

  it('should handle REQUEST_DOMAIN_OWNER', () => {
    expect(
      reducer({}, {
        type: REQUEST_DOMAIN_OWNER,
      }),
    )
      .toEqual({
        requestingOwner: true,
      });
  });

  it('should handle RECEIVE_DOMAIN_OWNER', () => {
    expect(
      reducer({}, {
        type: RECEIVE_DOMAIN_OWNER,
        owner: 'testing',
      }),
    ).toEqual({
      requestingOwner: false,
      owner: 'testing',
    });
  });

  it('should handle REQUEST_DOMAIN_OWNER and RECEIVE_DOMAIN_OWNER', () => {
    expect(
      reducer({}, {
        type: REQUEST_DOMAIN_OWNER,
      }),
    ).toEqual({
      requestingOwner: true,
    });

    expect(
      reducer({
        requestingOwner: true,
      }, {
        type: RECEIVE_DOMAIN_OWNER,
        owner: 'testing',
      }),
    ).toEqual({
      requestingOwner: false,
      owner: 'testing',
    });
  });

  it('should handle REQUEST_DOMAIN_STATE and RECEIVE_DOMAIN_STATE and REQUEST_DOMAIN_OWNER and RECEIVE_DOMAIN_OWNER', () => {
    expect(
      reducer({}, {
        type: REQUEST_DOMAIN_STATE,
      }),
    ).toEqual({
      domainStateLoading: true,
    });

    expect(
      reducer({
        owned: undefined,
        domainStateLoading: true,
      }, {
        type: RECEIVE_DOMAIN_STATE,
        owned: true,
      }),
    ).toEqual({
      owned: true,
      domainStateLoading: false,
      blocked: false,
    });

    expect(
      reducer({
        owned: true,
        domainStateLoading: false,
        blocked: false,
      }, {
        type: REQUEST_DOMAIN_OWNER,
      }),
    ).toEqual({
      owned: true,
      domainStateLoading: false,
      blocked: false,
      requestingOwner: true,
    });

    expect(
      reducer({
        owned: true,
        domainStateLoading: false,
        blocked: false,
        requestingOwner: true,
      }, {
        type: RECEIVE_DOMAIN_OWNER,
        owner: 'testing',
      }),
    ).toEqual({
      owned: true,
      domainStateLoading: false,
      blocked: false,
      requestingOwner: false,
      owner: 'testing',
    });
  });

  it('should return the initial state when action is not implemented', () => {
    expect(reducer(undefined, {
      type: 'NOT_IMPLEMENTED',
    }))
      .toEqual(
        {
          owned: undefined,
          owner: undefined,
          domainStateLoading: false,
          blocked: undefined,
          requestingOwner: false,
          requestingCost: false,
          rifCost: 0,
        },
      );
  });

  it('should handle REQUEST_DOMAIN_COST and RECEIVE_DOMAIN_COST', () => {
    expect(
      reducer({}, {
        type: REQUEST_DOMAIN_COST,
      }),
    ).toEqual({
      requestingCost: true,
    });

    expect(
      reducer({
        rifcost: 2,
      }, {
        type: RECEIVE_DOMAIN_COST,
      }),
    ).toEqual({
      rifcost: 2,
      requestingCost: false,
    });
  });
});
