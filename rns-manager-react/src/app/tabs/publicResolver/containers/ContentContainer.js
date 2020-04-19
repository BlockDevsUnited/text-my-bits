import React from 'react';
import { FieldContainer } from '../../../containers';
import { BYTES32 } from '../../../types';
import { content } from '../actions';
import { getContent, setContent } from '../operations';

const registryFieldProps = {
  fieldName: 'content',
  type: 'text',
  valueType: BYTES32,
  getField: state => state.publicResolver.content,
  get: getContent,
  changeEdit: content.changeEdit,
  set: setContent,
};

export default () => <FieldContainer {...registryFieldProps} />;
