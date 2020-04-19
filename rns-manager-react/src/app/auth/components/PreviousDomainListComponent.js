import React from 'react';
import propTypes from 'prop-types';

const PreviousDomainListComponent = ({ previousDomains, switchLoginClick }) => (
  <div className="switch">
    {previousDomains.map(addr => (
      <button
        key={addr.domain}
        type="button"
        className="switchButton"
        onClick={() => switchLoginClick(addr.domain)}
      >
        {addr.domain}
      </button>
    ))}
  </div>
);

PreviousDomainListComponent.propTypes = {
  previousDomains: propTypes.arrayOf(propTypes.shape({
    domain: propTypes.string,
    owner: propTypes.string,
  })).isRequired,

  switchLoginClick: propTypes.func.isRequired,
};

export default PreviousDomainListComponent;
