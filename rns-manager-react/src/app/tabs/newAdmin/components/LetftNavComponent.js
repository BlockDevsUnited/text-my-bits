import React from 'react';
import { multilanguage } from 'redux-multilanguage';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';

const LeftNavComponent = (props) => {
  const {
    strings, advancedView, location, domain,
  } = props;

  const isHome = location === '/newAdmin'
    || (!advancedView && (location === '/newAdmin/resolver' || location === '/newAdmin/reverse'));

  return (
    <Navbar bg="light" expand="md">
      <Navbar.Brand>{domain}</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <ul>
          <li>
            <Link
              to="/newAdmin"
              className={isHome ? 'active' : ''}
            >
              {strings.domain_info}
            </Link>
          </li>
          <li>
            <Link
              to="/newAdmin/addresses"
              className={location === '/newAdmin/addresses' ? 'active' : ''}
            >
              {strings.your_addresses}
            </Link>
          </li>
          <li>
            <Link
              to="/newAdmin/subdomains"
              className={location === '/newAdmin/subdomains' ? 'active' : ''}
            >
              {strings.subdomains}
            </Link>
          </li>
          {advancedView
            && (
            <>
              <li>
                <Link
                  to="/newAdmin/resolver"
                  className={location === '/newAdmin/resolver' ? 'active' : ''}
                >
                  {strings.resolver}
                </Link>
              </li>
              <li>
                <Link
                  to="/newAdmin/reverse"
                  className={location === '/newAdmin/reverse' ? 'active' : ''}
                >
                  Reverse
                </Link>
              </li>
            </>
            )
          }
        </ul>
      </Navbar.Collapse>
    </Navbar>
  );
};

LeftNavComponent.propTypes = {
  strings: propTypes.shape({
    admin: propTypes.string.isRequired,
    advanced: propTypes.string.isRequired,
    basic: propTypes.string.isRequired,
    domain_info: propTypes.string.isRequired,
    resolver: propTypes.string.isRequired,
    subdomains: propTypes.string.isRequired,
    your_addresses: propTypes.string.isRequired,
  }).isRequired,
  location: propTypes.string.isRequired,
  advancedView: propTypes.bool.isRequired,
  domain: propTypes.string.isRequired,
};

export default multilanguage(LeftNavComponent);
