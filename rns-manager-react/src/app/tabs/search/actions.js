import {
  REQUEST_DOMAIN_STATE, RECEIVE_DOMAIN_STATE,
  BLOCKED_DOMAIN, REQUEST_DOMAIN_OWNER, RECEIVE_DOMAIN_OWNER,
  REQUEST_DOMAIN_COST, RECEIVE_DOMAIN_COST, CLEAR_DOMAIN_STATE,
} from './types';

export const requestDomainState = domain => ({
  type: REQUEST_DOMAIN_STATE,
  domain,
});

export const receiveDomainState = available => ({
  type: RECEIVE_DOMAIN_STATE,
  owned: !available,
});

export const requestDomainOwner = () => ({
  type: REQUEST_DOMAIN_OWNER,
});

export const receiveDomainOwner = owner => ({
  type: RECEIVE_DOMAIN_OWNER,
  owner,
});

export const blockedDomain = () => ({
  type: BLOCKED_DOMAIN,
});

export const requestDomainCost = () => ({
  type: REQUEST_DOMAIN_COST,
});

export const receiveDomainCost = rifCost => ({
  type: RECEIVE_DOMAIN_COST,
  rifCost,
});

export const clearDomainState = () => ({
  type: CLEAR_DOMAIN_STATE,
});
