import React from 'react';
import propTypes from 'prop-types';
import {
  Container, Image, Col, Row,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { multilanguage } from 'redux-multilanguage';
import logo from '../../assets/img/logo-footer.svg';

import { version } from '../../../package.json';

const FooterComponent = (props) => {
  const { strings } = props;

  const linkProps = {
    target: '_blank',
    rel: 'noopener noreferrer',
  };

  return (
    <footer>
      <div className="footer-top">
        <Container>
          <Row>
            <Col lg="3">
              <Image src={logo} alt="RSK Logo" />
            </Col>
            <Col lg="2">
              <h2>RIF</h2>
              <ul>
                <li>
                  <a href="https://developers.rsk.co/rif/" {...linkProps}>{strings.services}</a>
                </li>
                <li>
                  <a href="https://www.rifos.org/assets/whitepapers/rif-whitepaper-en.pdf" {...linkProps}>
                    {strings.whitepaper}
                  </a>
                </li>
                <li>
                  <a href="https://developers.rsk.co/rif/token/" {...linkProps}>{strings.rif_token}</a>
                </li>
              </ul>
            </Col>
            <Col lg="3">
              <h2>{strings.home_title}</h2>
              <ul>
                <li>
                  <a href="https://www.rifos.org/directory#roadmap" {...linkProps}>{strings.roadmap}</a>
                </li>
                <li><Link to="/faq">FAQ</Link></li>
                <li>
                  <a href="https://gitter.im/rsksmart/rif-name-service" {...linkProps}>{strings.contact}</a>
                </li>
              </ul>
            </Col>
            <Col lg="2">
              <h2>{strings.developers}</h2>
              <ul>
                <li>
                  <a href="https://www.rifos.org/nameservice/assets/rns-specs/rif-directory-protocol-en.pdf" {...linkProps}>
                    {strings.whitepaper}
                  </a>
                </li>
                <li><a href="https://developers.rsk.co/rif/rns" {...linkProps}>{strings.docs}</a></li>
                <li>
                  <a href="https://github.com/rnsdomains/" {...linkProps}>Github</a>
                </li>
              </ul>
            </Col>
            <Col lg="2">
              <h2>{strings.privacy}</h2>
              <ul>
                <li>
                  <a href="https://www.rifos.org/privacy-policy" {...linkProps}>{strings.privacy_policy}</a>
                </li>
                <li>
                  <a href="https://www.rifos.org/terms-conditions" {...linkProps}>{strings.terms}</a>
                </li>
              </ul>
            </Col>
          </Row>
          <Row>
            <Col>
              <p style={{ fontSize: '.8em' }}>
                Copyright © 2020 RSK Labs. All rights reserved.
                {` ${version}`}
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};

FooterComponent.propTypes = {
  strings: propTypes.shape().isRequired,
};

export default multilanguage(FooterComponent);
