import React from 'react';
import { multilanguage } from 'redux-multilanguage';
import propTypes from 'prop-types';
import { Loader } from 'rimble-ui';

import { Button, Row, Col } from 'react-bootstrap';

const SearchResultsComponent = ({
  strings, domain, available, blocked, isSearching, rifCost, handleClick,
}) => {
  if (!domain) {
    return <></>;
  }

  if (isSearching || rifCost === 0) {
    return (
      <Loader color="#008FF7" size="80px" className="loader-center" style={{ margin: '15px auto' }} />
    );
  }

  if (!available || blocked) {
    return (
      <div className="results">
        <Row className="break-above">
          <div className="col-md-8 offset-md-2">
            <h2 className="blue">{strings.results}</h2>
          </div>
        </Row>
        <Row>
          <div className="col-md-8 offset-md-2">
            <Row className="searchResults notAvailable">
              <Col md={6}>
                <h3>{`${domain}.rsk`}</h3>
              </Col>
              <Col md={3}>
                <p className="status">{strings.domain_not_available}</p>
              </Col>
              <Col md={3}>
                <p className="searchAnother">{strings.search_for_another}</p>
              </Col>
            </Row>
          </div>
        </Row>
      </div>
    );
  }

  return (
    <div className="results">
      <Row className="break-above">
        <div className="col-md-8 offset-md-2">
          <h2 className="blue">{strings.results}</h2>
        </div>
      </Row>
      <Row>
        <div className="col-md-8 offset-md-2">
          <Row className="searchResults available">
            <Col md={4}>
              <h3>{`${domain}.rsk`}</h3>
            </Col>
            <Col md={2}>
              <p className="status blue">{strings.available}</p>
            </Col>
            <Col md={4}>
              <p className="cost">
                <span className="rifPrice">
                  {rifCost}
                  {' rif'}
                </span>
                <span className="year">
                  {' / '}
                  {strings.year}
                </span>
              </p>
            </Col>
            <Col md={2}>
              <Button
                className="register"
                onClick={handleClick}
              >
                {strings.register}
              </Button>
            </Col>
          </Row>
        </div>
      </Row>
    </div>
  );
};

SearchResultsComponent.defaultProps = {
  domain: undefined,
};

SearchResultsComponent.propTypes = {
  strings: propTypes.shape({
    results: propTypes.string.isRequired,
    available: propTypes.string.isRequired,
    domain_not_available: propTypes.string.isRequired,
    register: propTypes.string.isRequired,
    search_for_another: propTypes.string.isRequired,
    year: propTypes.string.isRequired,
  }).isRequired,
  domain: propTypes.string,
  available: propTypes.bool.isRequired,
  isSearching: propTypes.bool.isRequired,
  rifCost: propTypes.number.isRequired,
  blocked: propTypes.bool.isRequired,
  handleClick: propTypes.func.isRequired,
};

export default multilanguage(SearchResultsComponent);
