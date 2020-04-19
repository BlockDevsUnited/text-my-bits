import React from 'react';

import { multilanguage } from 'redux-multilanguage';
import propTypes from 'prop-types';
import { Button } from 'react-bootstrap';

import { dayMath, formatDate } from '../../helpers';

const RenewButtonComponent = (props) => {
  const {
    expires, handleClick, checkingExpirationTime, isRenewOpen,
    strings,
  } = props;

  if (checkingExpirationTime || expires === 0) {
    return (<></>);
  }

  return (
    <p>
      {strings.expires_on}
      {' '}
      {formatDate(dayMath(expires))}
      <Button onClick={handleClick} className={isRenewOpen ? 'active' : ''}>
        {strings.renew}
      </Button>
    </p>
  );
};

RenewButtonComponent.propTypes = {
  expires: propTypes.number.isRequired,
  checkingExpirationTime: propTypes.bool.isRequired,
  isRenewOpen: propTypes.bool.isRequired,
  strings: propTypes.shape({
    expires_on: propTypes.string.isRequired,
    renew: propTypes.string.isRequired,
  }).isRequired,
  handleClick: propTypes.func.isRequired,
};

export default multilanguage(RenewButtonComponent);
