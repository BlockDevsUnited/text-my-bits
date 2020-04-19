import React from 'react';
import propTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import { multilanguage } from 'redux-multilanguage';

const FaqTabComponent = ({ strings }) => (
  <Container className="page">
    <h1 className="sub-heading">{strings.faq}</h1>
  </Container>
);

FaqTabComponent.propTypes = {
  strings: propTypes.shape({
    faq: propTypes.string.isRequired,
  }).isRequired,
};

export default multilanguage(FaqTabComponent);
