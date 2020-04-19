import React from 'react';
import { FieldContainer } from '../../../containers';
import { POSITIVE_NUMBER } from '../../../types';
import { ttl } from '../actions';
import { getDomainTtl, setDomainTtl } from '../operations';

const registryFieldProps = {
  fieldName: 'ttl',
  type: 'number',
  valueType: POSITIVE_NUMBER,
  getField: state => state.admin.ttl,
  get: getDomainTtl,
  changeEdit: ttl.changeEdit,
  set: setDomainTtl,
};

export default () => <FieldContainer {...registryFieldProps} />;
