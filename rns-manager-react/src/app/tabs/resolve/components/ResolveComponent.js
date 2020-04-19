import React, { Component } from 'react';
import propTypes from 'prop-types';
import {
  Container, Row, Col, Form, Button, Spinner, Alert,
} from 'react-bootstrap';
import { multilanguage } from 'redux-multilanguage';
import { isValidDomain } from '../../../validations';
import { ResolveAddrContainer, ResolveChainAddrContainer, ResolveNameContainer } from '../containers';


const renderResolutions = (supportedInterfaces) => {
  const hasAddr = supportedInterfaces.indexOf('addr') > -1;
  const hasChainAddr = supportedInterfaces.indexOf('chainAddr') > -1;
  const hasName = supportedInterfaces.indexOf('name') > -1;

  return (
    <Container className="page">
      <Row>
        {
          hasAddr && (
            <Col lg={hasChainAddr ? 6 : { span: 6, offset: 3 }}>
              <ResolveAddrContainer />
            </Col>
          )
        }
        {hasChainAddr && <Col lg={6}><ResolveChainAddrContainer /></Col>}
      </Row>
      <Row>
        {
          hasName && (
            <Col>
              <ResolveNameContainer />
            </Col>
          )
        }
      </Row>
    </Container>
  );
};

class ResolveComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.name,
      isValid: true,
      showError: true,
    };

    this.resolveValueChange = this.resolveValueChange.bind(this);
    this.validate = this.validate.bind(this);
    this.onResolve = this.onResolve.bind(this);
  }

  componentDidMount() {
    const { name, resolve } = this.props;

    if (name) {
      resolve();
    }
  }

  componentWillReceiveProps(newProps) {
    const { name, error } = this.props;

    if (name !== newProps.name) {
      newProps.resolve();
    }

    if (error !== newProps.error) {
      this.setState({ showError: true });
    }
  }

  onResolve(event) {
    event.preventDefault();

    const { search, resolve, name } = this.props;
    const { value } = this.state;

    if (this.validate()) {
      if (name === value) {
        return resolve();
      }

      search(value);
    }

    return null;
  }

  resolveValueChange(event) {
    this.setState({ value: event.target.value });
  }

  validate() {
    const { value } = this.state;
    const isValid = isValidDomain(value);
    this.setState({ isValid });
    return isValid;
  }

  render() {
    const {
      strings, loading, error, supportedInterfaces,
    } = this.props;
    const { value, isValid, showError } = this.state;

    let result;

    if (error) {
      result = <Alert variant="danger" dismissible show={showError} onClose={() => this.setState({ showError: false })}>{error}</Alert>;
    } else if (loading) {
      result = <Spinner animation="grow" variant="primary" />;
    } else {
      result = renderResolutions(supportedInterfaces);
    }

    return (
      <Container className="page">
        <Row>
          <Col>
            <Form onSubmit={this.onResolve}>
              <Form.Group>
                <Form.Control type="text" value={value} onChange={this.resolveValueChange} className={!isValid && 'is-invalid'} />
                <div className="invalid-feedback">
                  {strings.invalid_name}
                </div>
              </Form.Group>
              <Button type="submit" size="sm" disabled={loading}>{strings.resolve}</Button>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col>
            {result}
          </Col>
        </Row>
      </Container>
    );
  }
}

ResolveComponent.propTypes = {
  name: propTypes.string.isRequired,
  resolve: propTypes.func.isRequired,
  error: propTypes.string,
  search: propTypes.func.isRequired,
  strings: propTypes.shape({
    resolve: propTypes.string.isRequired,
    invalid_name: propTypes.string.isRequired,
  }).isRequired,
  loading: propTypes.bool.isRequired,
  supportedInterfaces: propTypes.arrayOf(propTypes.string).isRequired,
};

ResolveComponent.defaultProps = {
  error: null,
};

export default multilanguage(ResolveComponent);
