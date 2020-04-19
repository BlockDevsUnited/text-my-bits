import React from 'react';
import { multilanguage } from 'redux-multilanguage';
import { publicResolver, multiChainResolver, stringResolver } from '../adapters/configAdapter';

export default multilanguage(({ strings }) => (
  <datalist id="resolvers">
    <option value={publicResolver}>{strings.rsk_resolver}</option>
    <option value={multiChainResolver}>{strings.multi_chain_resolver}</option>
    <option value={stringResolver}>{strings.string_resolver}</option>
  </datalist>
));
