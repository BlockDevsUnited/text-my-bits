import React from 'react';
import { FieldContainer } from '../../../containers';
import { STRING } from '../../../types';
import { str } from '../actions';
import { getStr, setStr } from '../operations';

const registryFieldProps = {
  fieldName: 'str',
  type: 'text',
  valueType: STRING,
  getField: state => state.strResolver.str,
  get: getStr,
  changeEdit: str.changeEdit,
  set: setStr,
};

export default () => <FieldContainer {...registryFieldProps} />;
