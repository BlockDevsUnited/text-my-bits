import * as actions from './actions';
import * as types from './types';

describe('resolve actions', () => {
  it('should create REQUEST_RESOLVE action', () => {
    expect(actions.requestResolve())
      .toEqual({
        type: types.REQUEST_RESOLVE,
      });
  });

  it('should create RECEIVE_RESOLVE action', () => {
    expect(actions.receiveResolve())
      .toEqual({
        type: types.RECEIVE_RESOLVE,
      });
  });

  it('should create ERROR_RESOLVE action', () => {
    const error = 'ERROR';

    expect(actions.errorResolve(error))
      .toEqual({
        type: types.ERROR_RESOLVE,
        error,
      });
  });

  it('should create RECEIVE_SUPPORTED_INTERFACE action', () => {
    const supportedInterface = '0x12345678';

    expect(actions.receiveSupportedInterface(supportedInterface))
      .toEqual({
        type: types.RECEIVE_SUPPORTED_INTERFACE,
        supportedInterface,
      });
  });

  it('should create RECEIVE_RESOLVER_ADDRESS action', () => {
    const resolverAddress = '0x00';

    expect(actions.receiveResolverAddress(resolverAddress))
      .toEqual({
        type: types.RECEIVE_RESOLVER_ADDRESS,
        resolverAddress,
      });
  });

  it('should create REQUEST_RESOLVE_ADDR', () => {
    expect(actions.requestAddr())
      .toEqual({
        type: types.REQUEST_RESOLVE_ADDR,
      });
  });

  it('should create RECEIVE_RESOLVE_ADDR', () => {
    const addr = 'addr';

    expect(actions.receiveAddr(addr))
      .toEqual({
        type: types.RECEIVE_RESOLVE_ADDR,
        addr,
      });
  });

  it('should create ERROR_RESOLVE_ADDR', () => {
    const error = 'error';

    expect(actions.errorAddr(error))
      .toEqual({
        type: types.ERROR_RESOLVE_ADDR,
        error,
      });
  });

  it('should create REQUEST_RESOLVE_CHAIN_ADDR', () => {
    expect(actions.requestChainAddr())
      .toEqual({
        type: types.REQUEST_RESOLVE_CHAIN_ADDR,
      });
  });

  it('should create RECEIVE_RESOLVE_CHAIN_ADDR', () => {
    const chainAddr = 'addr';

    expect(actions.receiveChainAddr(chainAddr))
      .toEqual({
        type: types.RECEIVE_RESOLVE_CHAIN_ADDR,
        chainAddr,
      });
  });

  it('should create ERROR_RESOLVE_CHAIN_ADDR', () => {
    const error = 'error';

    expect(actions.errorChainAddr(error))
      .toEqual({
        type: types.ERROR_RESOLVE_CHAIN_ADDR,
        error,
      });
  });

  it('should create REQUEST_RESOLVE_NAME', () => {
    expect(actions.requestName())
      .toEqual({
        type: types.REQUEST_RESOLVE_NAME,
      });
  });

  it('should create RECEIVE_RESOLVE_NAME', () => {
    const name = 'name';

    expect(actions.receiveName(name))
      .toEqual({
        type: types.RECEIVE_RESOLVE_NAME,
        name,
      });
  });

  it('should create ERROR_RESOLVE_NAME', () => {
    const error = 'error';

    expect(actions.errorName(error))
      .toEqual({
        type: types.ERROR_RESOLVE_NAME,
        error,
      });
  });
});
