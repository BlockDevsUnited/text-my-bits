import React from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';

import { Modal, Button } from 'react-bootstrap';

const TransferSuccessModalComponent = (props) => {
  const {
    strings, domain, handleClick,
  } = props;

  return (
    <Modal show centered className="transferModal">
      <Modal.Body>
        <h2>
          {domain}
          {` ${strings.was_transfered}`}
        </h2>
        <Button type="button" onClick={() => handleClick('newAdmin')}>
          {strings.login_another_domain}
        </Button>
        <Button type="button" onClick={() => handleClick('search')}>
          {strings.register_new_domain}
        </Button>
      </Modal.Body>
    </Modal>
  );
};

TransferSuccessModalComponent.propTypes = {
  strings: propTypes.shape({
    was_transfered: propTypes.string.isRequired,
    register_new_domain: propTypes.string.isRequired,
    login_another_domain: propTypes.string.isRequired,
  }).isRequired,
  domain: propTypes.string.isRequired,
  handleClick: propTypes.func.isRequired,
};

export default multilanguage(TransferSuccessModalComponent);
