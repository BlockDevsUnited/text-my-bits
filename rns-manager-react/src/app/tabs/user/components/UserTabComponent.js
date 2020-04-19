import React from 'react';
import propTypes from 'prop-types';
import {
  Row, Col, Button,
} from 'react-bootstrap';
import { multilanguage } from 'redux-multilanguage';
import { AuthTabWrapper } from '../../../auth';

const UserTabComponent = (props) => {
  const {
    strings, name, address, network, logOut,
  } = props;

  return (
    <AuthTabWrapper>
      <Row>
        <Col>
          <h2>{name}</h2>
        </Col>
      </Row>
      <br />
      <Row>
        <Col md={4}>{strings.address}</Col>
        <Col md={8}>{address}</Col>
      </Row>
      <br />
      <Row>
        <Col md={4}>{strings.network}</Col>
        <Col md={8}>{network}</Col>
      </Row>
      <hr />
      <Row>
        <Col>
          <Button onClick={logOut}>{strings.log_out}</Button>
        </Col>
      </Row>
    </AuthTabWrapper>
  );
};

UserTabComponent.propTypes = {
  strings: propTypes.shape({
    address: propTypes.string,
    network: propTypes.string,
    log_out: propTypes.string,
  }).isRequired,
  name: propTypes.string.isRequired,
  address: propTypes.string.isRequired,
  network: propTypes.string.isRequired,
  logOut: propTypes.func.isRequired,
};

export default multilanguage(UserTabComponent);
