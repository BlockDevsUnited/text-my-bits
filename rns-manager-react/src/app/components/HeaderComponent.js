import React from 'react';
import propTypes from 'prop-types';
import {
  Navbar, Nav, Form, Container, Image,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { multilanguage } from 'redux-multilanguage';
import logo from '../../assets/img/logo.svg';
import logotest from '../../assets/img/logo-testnet.svg';
import { LanguageSelectContainer } from '../containers';
import { LoginDropdownContainer } from '../auth/containers';

const HeaderComponent = (props) => {
  const {
    strings,
    network,
  } = props;

  return (
    <Navbar
      expand="md"
      className="navbar-expand-md navbar-dark fixed-top"
    >
      <Container>
        <Link to="/" className="navbar-brand">
          <Image
            src={(network === '31') ? logotest : logo}
            className="logo"
            alt="RSK Logo"
          />
        </Link>
        {/* <IndicatorLight /> */}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className>
          <Nav className="ml-auto">
            <Nav.Item key={strings.search}>
              <Link to="/" className="nav-link" title={strings.search}>
                {strings.search}
              </Link>
            </Nav.Item>

            <Form onSubmit={e => e.preventDefault()} inline>
              <LanguageSelectContainer />
            </Form>

            <LoginDropdownContainer />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

HeaderComponent.propTypes = {
  strings: propTypes.shape().isRequired,
  network: propTypes.string.isRequired,
};

export default multilanguage(HeaderComponent);
