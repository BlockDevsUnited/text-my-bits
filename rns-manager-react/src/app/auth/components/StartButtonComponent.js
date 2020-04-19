import React from 'react';
import propTypes from 'prop-types';
import {
  Nav, Button,
} from 'react-bootstrap';
import { multilanguage } from 'redux-multilanguage';

const StartButtonComponent = (props) => {
  const {
    strings, open, user, isOwner, domain, address,
  } = props;

  const className = 'start my-2 my-sm-0';

  if (!address) {
    return (
      <Nav.Item key={strings.start}>
        <Button className={className} onClick={open}>
          {strings.start}
        </Button>
      </Nav.Item>
    );
  }

  if (domain && isOwner) {
    return (
      <Nav.Item key={domain}>
        <Button className={className} onClick={user}>
          {domain}
        </Button>
      </Nav.Item>
    );
  }

  return (
    <Nav.Item key={strings.log_in}>
      <Button className={className} onClick={open}>
        {strings.log_in}
      </Button>
    </Nav.Item>
  );
};

StartButtonComponent.propTypes = {
  strings: propTypes.shape({
    switch_to_metamask: propTypes.string.isRequired,
    start: propTypes.string.isRequired,
    log_in: propTypes.string.isRequired,
  }).isRequired,
  open: propTypes.func.isRequired,
  user: propTypes.func.isRequired,
  isOwner: propTypes.bool.isRequired,
  domain: propTypes.string,
  address: propTypes.string,
};

StartButtonComponent.defaultProps = {
  domain: null,
  address: null,
};

export default multilanguage(StartButtonComponent);
