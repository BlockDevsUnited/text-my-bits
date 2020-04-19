import React from 'react';
import { multilanguage } from 'redux-multilanguage';
import propTypes from 'prop-types';

import {
  Row, Col, Button, Spinner,
} from 'react-bootstrap';

const UpgradeComponent = ({
  strings, isFifsMigrated, isMigrating, handleClick,
}) => {
  if (isFifsMigrated) {
    return (<></>);
  }

  return (
    <div className="upgrade major-section">
      <Row>
        <Col>
          <h2>
            {strings.upgrade_domain}
          </h2>
        </Col>
      </Row>
      <Row>
        <Col md={10}>
          <p>
            {strings.upgrade_domain_explanation}
          </p>
        </Col>
        <Col md={2}>
          {isMigrating && <Spinner animation="grow" variant="primary" />}
          {!isMigrating && (
          <Button onClick={handleClick}>
            {strings.upgrade}
          </Button>
          )}
        </Col>
      </Row>
    </div>
  );
};

UpgradeComponent.propTypes = {
  strings: propTypes.shape({
    upgrade: propTypes.string.isRequired,
    upgrade_domain: propTypes.string.isRequired,
    upgrade_domain_explanation: propTypes.string.isRequired,
  }).isRequired,
  isFifsMigrated: propTypes.bool.isRequired,
  isMigrating: propTypes.bool.isRequired,
  handleClick: propTypes.func.isRequired,
};

export default multilanguage(UpgradeComponent);
