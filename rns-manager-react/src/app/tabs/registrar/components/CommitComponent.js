import React, { Component } from 'react';
import { multilanguage } from 'redux-multilanguage';
import propTypes from 'prop-types';
import {
  Container, Row, Col, Spinner, Button, Form, OverlayTrigger, Tooltip,
} from 'react-bootstrap';

class CommitComponent extends Component {
  componentDidMount() {
    const { checkIfAlreadyCommitted } = this.props;
    checkIfAlreadyCommitted();
  }

  render() {
    const {
      committing,
      strings,
      doCommitment,
      committed,
      hasBalance,
      setupAddr,
      toggleSetupAddr,
    } = this.props;

    return (
      <Container>
        <Row className="major-section fifsRegistration">
          <Col>
            <Form.Check
              type="switch"
              id="setup-addr-switch"
              label={strings.auto_address_setup}
              checked={setupAddr}
              onChange={toggleSetupAddr}
            />
            <OverlayTrigger
              key="fifsExplanation"
              placement="right"
              overlay={(
                <Tooltip id="tooltip-status">
                  {strings.auto_address_explanation}
                </Tooltip>
              )}
            >
              <div className="overlay-helper">
                ?
              </div>
            </OverlayTrigger>
          </Col>
        </Row>
        <Row className="major-section">
          <Col>
            {
              committing
                ? <Spinner animation="grow" variant="primary" />
                : (
                  <Button
                    className="commitButton"
                    disabled={committing || committed || !hasBalance}
                    onClick={doCommitment}
                  >
                    {strings.process_step_1}
                  </Button>
                )
            }
          </Col>
        </Row>
        <Row>
          <div className="col-md-6 offset-md-3">
            <p className="explanation">{strings.process_step_1_explanation}</p>
          </div>
        </Row>
      </Container>
    );
  }
}

CommitComponent.propTypes = {
  strings: propTypes.shape({
    process_step_1: propTypes.string.isRequired,
    process_step_1_explanation: propTypes.string.isRequired,
    auto_address_setup: propTypes.string.isRequired,
    auto_address_explanation: propTypes.string.isRequired,
  }).isRequired,
  doCommitment: propTypes.func.isRequired,
  toggleSetupAddr: propTypes.func.isRequired,
  checkIfAlreadyCommitted: propTypes.func.isRequired,
  committing: propTypes.bool.isRequired,
  committed: propTypes.bool.isRequired,
  hasBalance: propTypes.bool.isRequired,
  setupAddr: propTypes.bool.isRequired,
};

export default multilanguage(CommitComponent);
