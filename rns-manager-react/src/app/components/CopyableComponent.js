import React from 'react';
import propTypes from 'prop-types';
import {
  FormGroup, FormControl, InputGroup, Button,
} from 'react-bootstrap';
import Octicon, { getIconByName } from '@githubprimer/octicons-react';

const copy = (value) => {
  const el = document.createElement('textarea');
  el.value = value;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};

const CopyableComponent = ({ children }) => (
  <FormGroup>
    <InputGroup>
      <FormControl type="text" readOnly defaultValue={children} style={{ paddingLeft: 5 }} />
      <InputGroup.Append>
        <Button variant="secondary" onClick={() => copy(children)} size="sm">
          <Octicon icon={getIconByName('clippy')} verticalAlign="middle" />
        </Button>
      </InputGroup.Append>
    </InputGroup>
  </FormGroup>
);

CopyableComponent.propTypes = {
  children: propTypes.string.isRequired,
};

export default CopyableComponent;
