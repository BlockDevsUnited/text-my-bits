import React from 'react';
import { FieldContainer } from '../../../containers';
import { ADDRESS } from '../../../types';
import { owner } from '../actions';
import { getDomainOwner, setDomainOwner } from '../operations';

const registryFieldProps = {
  fieldName: 'owner',
  type: 'text',
  valueType: ADDRESS,
  getField: state => state.admin.owner,
  get: getDomainOwner,
  changeEdit: owner.changeEdit,
  set: setDomainOwner,
};

export default () => <FieldContainer {...registryFieldProps} />;
