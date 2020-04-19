import React from 'react';
import { multilanguage } from 'redux-multilanguage';
import propTypes from 'prop-types';
import {
  Button, OverlayTrigger, Tooltip,
} from 'react-bootstrap';

const ChecksumErrorComponent = (props) => {
  const {
    strings,
    show,
    inputValue,
    handleClick,
  } = props;

  const handleConvertButton = (evt) => {
    evt.preventDefault();
    handleClick(inputValue.toLowerCase());
  };

  if (!show) {
    return <></>;
  }

  return (
    <div className="checksumError">
      <OverlayTrigger
        key="invalidChecksumOverlay"
        placement="right"
        overlay={(
          <Tooltip id="tooltip-status">
            {strings.address_formatted_incorrectly_description}
          </Tooltip>
        )}
      >
        <span>
          {strings.address_formatted_incorrectly}
        </span>
      </OverlayTrigger>
      <p>
        <Button
          onClick={evt => handleConvertButton(evt)}
          variant="outline-primary"
        >
          {strings.convert_to_lowercase}
        </Button>
      </p>
    </div>
  );
};


ChecksumErrorComponent.propTypes = {
  show: propTypes.bool.isRequired,
  strings: propTypes.shape().isRequired,
  inputValue: propTypes.string.isRequired,
  handleClick: propTypes.func.isRequired,
};

export default multilanguage(ChecksumErrorComponent);
