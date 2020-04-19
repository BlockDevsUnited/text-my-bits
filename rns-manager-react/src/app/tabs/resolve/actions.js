import * as types from './types';

export const requestResolve = () => ({
  type: types.REQUEST_RESOLVE,
});

export const receiveResolve = (resolution, resolverAddress, supportsChainAddr) => ({
  type: types.RECEIVE_RESOLVE,
  resolution,
  resolverAddress,
  supportsChainAddr,
});

export const errorResolve = error => ({
  type: types.ERROR_RESOLVE,
  error,
});

export const receiveSupportedInterface = supportedInterface => ({
  type: types.RECEIVE_SUPPORTED_INTERFACE,
  supportedInterface,
});

export const receiveResolverAddress = resolverAddress => ({
  type: types.RECEIVE_RESOLVER_ADDRESS,
  resolverAddress,
});

export const requestName = () => ({
  type: types.REQUEST_RESOLVE_NAME,
});

export const receiveName = name => ({
  type: types.RECEIVE_RESOLVE_NAME,
  name,
});

export const errorName = error => ({
  type: types.ERROR_RESOLVE_NAME,
  error,
});

export const requestAddr = () => ({
  type: types.REQUEST_RESOLVE_ADDR,
});

export const receiveAddr = addr => ({
  type: types.RECEIVE_RESOLVE_ADDR,
  addr,
});

export const errorAddr = error => ({
  type: types.ERROR_RESOLVE_ADDR,
  error,
});

export const requestChainAddr = () => ({
  type: types.REQUEST_RESOLVE_CHAIN_ADDR,
});

export const receiveChainAddr = chainAddr => ({
  type: types.RECEIVE_RESOLVE_CHAIN_ADDR,
  chainAddr,
});

export const errorChainAddr = error => ({
  type: types.ERROR_RESOLVE_CHAIN_ADDR,
  error,
});
