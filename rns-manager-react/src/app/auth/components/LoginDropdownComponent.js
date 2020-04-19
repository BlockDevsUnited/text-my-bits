import React from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';
import { Button } from 'react-bootstrap';

import PreviousDomainListComponent from './PreviousDomainListComponent';
import { CurrentAccountContainer, LoginFormContainer } from '../containers';


const LoginDropDownComponent = ({
  strings, name, handleLogin, isOwner, authError, previousDomains,
  showPopUp, toggleShowPopUp,
}) => {
  const isLoggedIn = ((name !== '' && name !== null) && isOwner);

  const handleLoginClick = (domain) => {
    handleLogin(domain);
  };

  return (
    <div className="loginDropdown nav-item">
      <Button
        className="start"
        onClick={toggleShowPopUp}
      >
        {isLoggedIn ? name : strings.login}
      </Button>

      {showPopUp
      && (
        <div className="popup">
          {isLoggedIn && (
            <CurrentAccountContainer />
          )}

          <PreviousDomainListComponent
            previousDomains={previousDomains}
            switchLoginClick={handleLoginClick}
          />

          <LoginFormContainer
            authError={authError}
            handleLogin={handleLoginClick}
            showLoginInitState={(!isLoggedIn && previousDomains.length === 0) || authError}
          />
        </div>
      )}
    </div>
  );
};

LoginDropDownComponent.defaultProps = {
  name: null,
};

LoginDropDownComponent.propTypes = {
  strings: propTypes.shape({
    login: propTypes.string.isRequired,
    your_domain: propTypes.string.isRequired,
    enter: propTypes.string.isRequired,
    log_out: propTypes.string.isRequired,
    not_domains_owner_message: propTypes.string.isRequired,
  }).isRequired,
  name: propTypes.string,
  handleLogin: propTypes.func.isRequired,
  isOwner: propTypes.bool.isRequired,
  authError: propTypes.bool.isRequired,
  showPopUp: propTypes.bool.isRequired,
  toggleShowPopUp: propTypes.func.isRequired,
  previousDomains: propTypes.arrayOf(propTypes.shape({
    domain: propTypes.string,
    owner: propTypes.string,
  })).isRequired,
};

export default multilanguage(LoginDropDownComponent);
