import React from 'react';
import propTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import { GetDomainStateContainer } from '../containers';

const TabWithSearchComponent = ({ children }) => (
  <Container>
    <Row>
      <Col>
        <GetDomainStateContainer />
      </Col>
    </Row>
    <Row>
      <Col>
        {children}
      </Col>
    </Row>
  </Container>
);

TabWithSearchComponent.propTypes = {
  children: propTypes.node.isRequired,
};

export default TabWithSearchComponent;
