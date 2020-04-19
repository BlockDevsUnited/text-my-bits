import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ContentContainer, MultiChainAddrFieldContainer } from './containers';
import { AuthTabWrapper } from '../../auth';

export { default } from './reducer';

export const MultiChainResolverTab = () => (
  <AuthTabWrapper>
    <Container>
      <Row>
        <Col>
          <h2>admin resolution</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <MultiChainAddrFieldContainer />
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          <ContentContainer />
        </Col>
      </Row>
    </Container>
  </AuthTabWrapper>
);
