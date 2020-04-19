import React, { Component } from 'react';
import propTypes from 'prop-types';
import {
  Form, InputGroup, Button, FormControl, Container, Col, Row,
} from 'react-bootstrap';
import { multilanguage } from 'redux-multilanguage';
import { isValidName } from '../validations';

class GetDomainStateComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      invalid: null,
    };

    this.validate = this.validate.bind(this);
  }

  validate(name) {
    const invalid = isValidName(name);
    this.setState({ invalid });
    return invalid;
  }

  render() {
    const {
      strings, domain, getDomainState, disableSearchButton,
    } = this.props;

    const { invalid } = this.state;

    let input;

    return (
      <Container>
        <Row>
          <Col lg={12}>
            <Form onSubmit={(e) => {
              e.preventDefault();
              if (!this.validate(input.value)) getDomainState(input.value);
            }}
            >
              <Col>
                <InputGroup className="mb-3">
                  <FormControl
                    type="text"
                    ref={(node) => {
                      input = node;
                    }}
                    defaultValue={domain}
                    className={invalid ? 'is-invalid' : null}
                  />
                  <InputGroup.Append>
                    <InputGroup.Text>{strings.rskTld}</InputGroup.Text>
                  </InputGroup.Append>
                  <div className="invalid-feedback">
                    {invalid}
                  </div>
                </InputGroup>
              </Col>
              <Col className="text-center">
                <Button type="submit" variant="primary-rif" disabled={disableSearchButton}>{strings.search}</Button>
              </Col>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

GetDomainStateComponent.propTypes = {
  strings: propTypes.shape().isRequired,
  domain: propTypes.string,
  disableSearchButton: propTypes.bool.isRequired,
  getDomainState: propTypes.func.isRequired,
};

GetDomainStateComponent.defaultProps = {
  domain: '',
};

export default multilanguage(GetDomainStateComponent);
