import React, { Component } from 'react';
import propTypes from 'prop-types';
import {
  Container, Row, Col, Form, InputGroup, FormControl, Button,
} from 'react-bootstrap';
import { multilanguage } from 'redux-multilanguage';
import { isValidDomain } from '../../../validations';
import { SubdomainContainer } from '../containers';

class SubdomainsListComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isValid: true,
    };

    this.validate = this.validate.bind(this);
  }

  componentDidMount() {
    const { loadSubdomains } = this.props;
    loadSubdomains();
  }

  validate(name) {
    const isValid = isValidDomain(name);
    this.setState({ isValid });
    return isValid;
  }

  render() {
    const {
      strings, onAddSubdomain, subdomains, domain,
    } = this.props;
    const { isValid } = this.state;

    let input;

    return (
      <Container>
        <Row>
          <Col>
            <Form onSubmit={(e) => {
              e.preventDefault();
              if (this.validate(input.value)) {
                onAddSubdomain(input.value);
                input.value = '';
              }
            }}
            >
              <InputGroup className="mb-3">
                <FormControl
                  type="text"
                  ref={(node) => {
                    input = node;
                  }}
                  className={!isValid ? 'is-invalid' : null}
                  placeholder={strings.suggested_subdomains}
                />
                <InputGroup.Append>
                  <InputGroup.Text>{domain}</InputGroup.Text>
                </InputGroup.Append>
                <InputGroup.Append>
                  <Button type="submit" size="sm">+</Button>
                </InputGroup.Append>
                <div className="invalid-feedback">
                  {strings.invalid_name}
                </div>
              </InputGroup>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col>
            <ul>
              {
                subdomains.map(subdomain => (
                  <SubdomainContainer key={subdomain} label={subdomain} />
                ))}
            </ul>
          </Col>
        </Row>
      </Container>
    );
  }
}

SubdomainsListComponent.propTypes = {
  loadSubdomains: propTypes.func.isRequired,
  strings: propTypes.shape({
    suggested_subdomains: propTypes.string.isRequired,
    invalid_name: propTypes.string.isRequired,
  }).isRequired,
  onAddSubdomain: propTypes.func.isRequired,
  subdomains: propTypes.arrayOf(propTypes.string).isRequired,
  domain: propTypes.string.isRequired,
};

export default multilanguage(SubdomainsListComponent);
