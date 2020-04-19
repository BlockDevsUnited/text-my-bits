import React from 'react';
import { FieldContainer } from '../../../containers';
import { ADDRESS } from '../../../types';
import { addr } from '../actions';
import { getAddr, setAddr } from '../operations';

const registryFieldProps = {
  fieldName: 'addr',
  type: 'text',
  valueType: ADDRESS,
  getField: state => state.publicResolver.addr,
  get: getAddr,
  changeEdit: addr.changeEdit,
  set: setAddr,
};

export default () => <FieldContainer {...registryFieldProps} />;
