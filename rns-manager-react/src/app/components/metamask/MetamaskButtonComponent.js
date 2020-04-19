import React from 'react';
import propTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const MetamaskButtonComponent = (props) => {
  const {
    startAndClick, address, onClick, ...restProps
  } = props;

  return (
    <Button
      {...restProps}
      onClick={() => {
        if (address) onClick();
        else startAndClick();
      }
    }
    />
  );
};

MetamaskButtonComponent.propTypes = {
  startAndClick: propTypes.func.isRequired,
  address: propTypes.string,
  onClick: propTypes.func.isRequired,
};

MetamaskButtonComponent.defaultProps = {
  address: null,
};

export default MetamaskButtonComponent;
