import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { multilanguage } from 'redux-multilanguage';
import { StrContainer } from './containers';
import { AuthTabWrapper } from '../../auth';

import reducer from './reducer';

export default reducer;

const StringResolverTab = multilanguage((props) => {
  const { strings } = props;
  return (
    <AuthTabWrapper>
      <Container>
        <Row>
          <Col>
            <h2>{strings.admin_str_resolution}</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <StrContainer />
          </Col>
        </Row>
      </Container>
    </AuthTabWrapper>
  );
});

export { StringResolverTab };
