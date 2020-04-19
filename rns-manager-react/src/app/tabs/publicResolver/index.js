import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { multilanguage } from 'redux-multilanguage';
import { AddrContainer, ContentContainer } from './containers';
import { AuthTabWrapper } from '../../auth';

import reducer from './reducer';

export default reducer;

const PublicResolverTab = multilanguage((props) => {
  const { strings } = props;
  return (
    <AuthTabWrapper>
      <Container>
        <Row>
          <Col>
            <h2>{strings.admin_resolution}</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <AddrContainer />
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
});

export { PublicResolverTab };
