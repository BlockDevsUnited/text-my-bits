import React from 'react';
import propTypes from 'prop-types';
import {
  Container, Row, Col, Image, Button,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { multilanguage } from 'redux-multilanguage';
import rskWallet from '../../assets/rsk_wallet.png';

const NoMetamaskTab = multilanguage(({ strings }) => (
  <Row>
    <Col>
      <Container className="page">
        <Row>
          <Col>
            <Image src={rskWallet} alt="rsk_wallet" fluid style={{ height: 300 }} />
          </Col>
        </Row>
        <Row>
          <Col>
            <p>{strings.rsk_wallet_needed}</p>
            <Button onClick={() => window.open('https://metamask.io', '_blank')}>{strings.get_metamask}</Button>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <p>{strings.connect_metamask_to_rsk}</p>
            <Link to="/setup" className="btn btn-primary">{strings.connect}</Link>
          </Col>
        </Row>
      </Container>
    </Col>
  </Row>
));

NoMetamaskTab.propTypes = {
  strings: propTypes.arrayOf(propTypes.string).isRequired,
};

export default NoMetamaskTab;
