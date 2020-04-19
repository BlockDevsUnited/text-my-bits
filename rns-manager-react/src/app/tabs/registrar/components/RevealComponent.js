import React from 'react';
import { multilanguage } from 'redux-multilanguage';
import propTypes from 'prop-types';
import {
  Row, Button, Spinner,
} from 'react-bootstrap';

const RevealComponent = (props) => {
  const {
    strings, revealCommit, revealing, domain, revealed, revealConfirmed,
  } = props;

  return (
    <>
      <Row>
        <div className="col-md-8 offset-md-2">
          <p>
            {strings.to_register}
            <span className="blue">{` ${domain}.rsk`}</span>
            <br />
            {strings.click_register_domain}
            <br />
            {strings.your_domain_will_be_registered}
          </p>
        </div>
      </Row>
      <Row>
        <div className="col-md-4 offset-md-4">
          {revealing || (revealed && !revealConfirmed)
            ? <Spinner animation="grow" variant="primary" className="major-section" />
            : (
              <Button
                disabled={revealing}
                onClick={revealCommit}
                className="minor-section"
              >
                {strings.register_domain}
              </Button>
            )
        }
        </div>
      </Row>
      <Row className="large-break-above">
        <div className="col-lg-4 offset-lg-4 col-md-6 offset-md-3">
          <p>{strings.wait_transation_confirmed}</p>
        </div>
      </Row>
    </>
  );
};

RevealComponent.defaultProps = {
  revealConfirmed: false,
};

RevealComponent.propTypes = {
  strings: propTypes.shape({
    register_domain: propTypes.string.isRequired,
    your_domain_will_be_registered: propTypes.string.isRequired,
    click_register_domain: propTypes.string.isRequired,
    register: propTypes.string.isRequired,
    to_register: propTypes.string.isRequired,
    wait_transation_confirmed: propTypes.string.isRequired,
  }).isRequired,
  revealCommit: propTypes.func.isRequired,
  revealing: propTypes.bool.isRequired,
  revealConfirmed: propTypes.bool,
  revealed: propTypes.bool.isRequired,
  domain: propTypes.string.isRequired,
};

export default multilanguage(RevealComponent);
