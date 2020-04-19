import React from 'react';
import propTypes from 'prop-types';
import { Form } from 'react-bootstrap';

const MetamaskFormComponent = (props) => {
  const {
    startAndSubmit, address, onSubmit, children, ...restProps
  } = props;

  return (
    <Form
      {...restProps}
      onSubmit={
      address
        ? (e) => {
          e.preventDefault();
          onSubmit();
        }
        : (e) => {
          e.preventDefault();
          startAndSubmit();
        }
    }
    >
      {children}
    </Form>
  );
};

MetamaskFormComponent.propTypes = {
  startAndSubmit: propTypes.func.isRequired,
  address: propTypes.string,
  onSubmit: propTypes.func.isRequired,
  children: propTypes.node.isRequired,
};

MetamaskFormComponent.defaultProps = {
  address: null,
};

export default MetamaskFormComponent;
