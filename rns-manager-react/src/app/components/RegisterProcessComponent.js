import React from 'react';
import propTypes from 'prop-types';
import {
  Container, Col, Row,
} from 'react-bootstrap';
import { multilanguage } from 'redux-multilanguage';

const RegisterProcessComponent = (props) => {
  const { strings } = props;

  return (
    <Container style={{ padding: 0 }} fluid>
      <Container>
        <Row>
          <Col lg="4">
            <div className="title">
              <div className="number">1</div>
              <div className="step">{strings.process_step_1}</div>
            </div>
            <p>{strings.process_step_1_explanation}</p>
          </Col>
          <Col lg="4">
            <div className="title">
              <div className="number">2</div>
              <div className="step">{strings.process_step_2}</div>
            </div>
            <p>{strings.process_step_2_explanation}</p>
          </Col>
          <Col lg="4">
            <div className="title">
              <div className="number">3</div>
              <div className="step">{strings.process_step_3}</div>
            </div>
            <p>{strings.process_step_3_explanation}</p>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

RegisterProcessComponent.propTypes = {
  strings: propTypes.shape().isRequired,
};

export default multilanguage(RegisterProcessComponent);
