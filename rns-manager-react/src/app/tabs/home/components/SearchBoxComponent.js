import React, { useState } from 'react';
import { multilanguage } from 'redux-multilanguage';
import propTypes from 'prop-types';

import { Row, Button } from 'react-bootstrap';
// import { isValidName } from '../../../validations';

const SearchBoxComponent = ({ handleClick, strings }) => {
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  const handleSearchClick = () => {
    setError('');

    if (search === '') {
      return;
    }

    if (search.trim().length < 8) {
      setError('Your Address should be longer than this.');
      return;
    }

    if (search.trim().includes(' ')) {
      setError('Why do you have spaces?');
      return;
    }

    handleClick(search.trim());
  };

  return (
    <>
      <Row className="searchBox">
        <div className="col-md-7 offset-md-1 searchInput">
          <input
            placeholder='Put your Address here'
            value={search}
            onChange={evt => setSearch(evt.target.value)}
          />
          <span className="blue"></span>
        </div>
        <div className="col-md-3">
          <Button
            onClick={handleSearchClick}
          >
            Register
          </Button>
        </div>
      </Row>
      {error
      && (
        <Row className="errorMessage">
          <div className="col-md-8 offset-md-2">
            <p>{error}</p>
          </div>
        </Row>
      )}
    </>
  );
};

SearchBoxComponent.propTypes = {
  strings: propTypes.shape({
    search_placeholder: propTypes.string.isRequired,
    search: propTypes.string.isRequired,
    blocked_domain: propTypes.string.isRequired,
    invalid_name: propTypes.string.isRequired,
  }).isRequired,
  handleClick: propTypes.func.isRequired,
};

export default multilanguage(SearchBoxComponent);
