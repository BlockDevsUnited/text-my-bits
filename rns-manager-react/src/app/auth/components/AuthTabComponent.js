import React from 'react';
import propTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import { multilanguage } from 'redux-multilanguage';
import { UserWaitingComponent } from '../../components';
import { StartButton } from '..';

const AuthTabComponent = ({
  strings, isLoggedIn, authenticating, children,
}) => {
  if (authenticating) {
    return (
      <Container className="page" style={{ textAlign: 'center' }}>
        <UserWaitingComponent message="" />
      </Container>
    );
  }

  if (!isLoggedIn) {
    return (
      <Container className="page">
        <Row>
          <Col>
            <p>{strings.please_log_in}</p>
            <StartButton />
          </Col>
        </Row>
      </Container>
    );
  }

  return <Container className="page" style={{ textAlign: 'center' }}>{children}</Container>;
};

AuthTabComponent.propTypes = {
  strings: propTypes.shape({
    please_log_in: propTypes.string.isRequired,
  }).isRequired,
  isLoggedIn: propTypes.bool.isRequired,
  authenticating: propTypes.bool.isRequired,
  children: propTypes.node.isRequired,
};

export default multilanguage(AuthTabComponent);
