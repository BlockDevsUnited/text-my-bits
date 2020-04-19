import React from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';
import { Row, Col, Button } from 'react-bootstrap';

import { RentalPeriodContainer } from '../../../registrar/containers';
import {
  UserErrorComponent, UserSuccessComponent, UserWaitingComponent,
} from '../../../../components';

const RenewDomainComponent = (props) => {
  const {
    isRenewOpen, isRenewing, handleRenewClick, strings, renewError, closeRenewError,
    renewSuccess, closeSuccess, renewSuccessTx,
  } = props;

  if (renewSuccess) {
    return (
      <Row>
        <div className="col-md-6 offset-md-3">
          <UserSuccessComponent
            title={strings.success}
            message={strings.renew_success}
            handleCloseClick={closeSuccess}
            address={renewSuccessTx}
          />
        </div>
      </Row>
    );
  }

  if (isRenewing) {
    return (
      <Row>
        <UserWaitingComponent message={strings.wait_transation_confirmed} />
      </Row>
    );
  }

  if (!isRenewOpen) {
    return (<></>);
  }

  return (
    <Row className="renewDomian major-section">
      <Row>
        <Col md={7}>
          <RentalPeriodContainer />
        </Col>
        <Col md={5} className="break-above">
          <Button
            onClick={handleRenewClick}
            className="renew"
            disabled={isRenewing}
          >
            {strings.renew_domain}
          </Button>
          <p className="explanation break-above">{strings.renew_explanation}</p>
        </Col>
      </Row>
      {renewError !== '' && (
        <UserErrorComponent
          title="Error"
          message={renewError}
          handleCloseClick={closeRenewError}
        />
      )}
    </Row>
  );
};

RenewDomainComponent.propTypes = {
  strings: propTypes.shape({
    renew_domain: propTypes.string.isRequired,
    renew_explanation: propTypes.string.isRequired,
    success: propTypes.string.isRequired,
    renew_success: propTypes.string.isRequired,
    wait_transation_confirmed: propTypes.string.isRequired,
  }).isRequired,
  isRenewOpen: propTypes.bool.isRequired,
  isRenewing: propTypes.bool.isRequired,
  handleRenewClick: propTypes.func.isRequired,
  renewError: propTypes.string.isRequired,
  closeRenewError: propTypes.func.isRequired,
  renewSuccess: propTypes.bool.isRequired,
  closeSuccess: propTypes.func.isRequired,
  renewSuccessTx: propTypes.string.isRequired,
};

export default multilanguage(RenewDomainComponent);
