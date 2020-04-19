import React, { Component } from 'react';
import propTypes from 'prop-types';
import {
  Row, Col, Form, InputGroup, Button,
} from 'react-bootstrap';
import { multilanguage } from 'redux-multilanguage';
import { ChecksumErrorContainer } from '../containers';

class FieldComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: props.preloadedValue,
      isValid: true,
      validationError: null,
    };

    this.validate = this.validate.bind(this);
    this.onInputValueChange = this.onInputValueChange.bind(this);
    this.handleChecksumClick = this.handleChecksumClick.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount() {
    const {
      get, domain, preloadedValue, changeEdit,
    } = this.props;
    get(domain);

    if (preloadedValue) {
      changeEdit();
    }
  }

  componentWillReceiveProps(newProps) {
    const { get, domain } = this.props;
    if (newProps.domain !== domain) {
      get(newProps.domain);
    }
  }

  onInputValueChange(event) {
    this.setState({ inputValue: event.target.value });
  }

  validate() {
    const { inputValue } = this.state;
    const { validate } = this.props;
    const validationError = validate(inputValue);
    const isValid = validationError === null;
    this.setState({ validationError, isValid });
    return isValid;
  }

  handleFormSubmit(e) {
    if (e) {
      e.preventDefault();
    }
    const { set } = this.props;
    const { inputValue } = this.state;
    if (this.validate()) {
      set(inputValue.toLowerCase());
    }
  }

  handleChecksumClick(newValue) {
    this.setState({ inputValue: newValue }, () => {
      this.handleFormSubmit();
    });
  }

  render() {
    const {
      strings,
      fieldName,
      type,
      getting,
      value,
      changeEdit,
      editOpen,
      editing,
      options,
      preloadedValue,
    } = this.props;

    const { inputValue, isValid, validationError } = this.state;

    return (
      <React.Fragment>
        <Row>
          <Col md={2}>{fieldName}</Col>
          <Col md={8}><b>{getting ? '...' : value}</b></Col>
          <Col md={2}>
            <Button variant="link" onClick={changeEdit}>{editOpen ? strings.cancel : strings.edit}</Button>
          </Col>
        </Row>
        {
          editOpen
          && (
          <React.Fragment>
            <br />
            <Row>
              <Col>
                <Form onSubmit={this.handleFormSubmit}>
                  <Form.Group>
                    <InputGroup>
                      <Form.Control type={type} value={inputValue} onChange={this.onInputValueChange} className={!isValid ? 'is-invalid' : null} list={options && options.name} />
                      {options && options.datalist}
                      <InputGroup.Append>
                        <Button type="submit" variant={preloadedValue ? 'success' : 'primary'} size="sm">{strings.edit}</Button>
                      </InputGroup.Append>
                      <div className="invalid-feedback">
                        <div className="title">{validationError}</div>
                        <ChecksumErrorContainer
                          show={validationError === 'Invalid checksum'}
                          inputValue={inputValue}
                          handleClick={newValue => this.handleChecksumClick(newValue)}
                        />
                      </div>
                    </InputGroup>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </React.Fragment>
          )
        }
        {
          editing && '...'
        }
      </React.Fragment>
    );
  }
}

FieldComponent.propTypes = {
  get: propTypes.func.isRequired,
  domain: propTypes.string,
  preloadedValue: propTypes.oneOfType([
    propTypes.string,
    propTypes.number,
  ]).isRequired,
  changeEdit: propTypes.func.isRequired,
  validate: propTypes.func.isRequired,
  strings: propTypes.shape({
    cancel: propTypes.string.isRequired,
    edit: propTypes.string.isRequired,
  }).isRequired,
  fieldName: propTypes.string.isRequired,
  type: propTypes.string.isRequired,
  getting: propTypes.bool.isRequired,
  value: propTypes.oneOfType([
    propTypes.string,
    propTypes.number,
  ]),
  editOpen: propTypes.bool.isRequired,
  set: propTypes.func.isRequired,
  editing: propTypes.bool.isRequired,
  options: propTypes.shape({
    name: propTypes.string.isRequired,
    datalist: propTypes.node.isRequired,
  }),
};

FieldComponent.defaultProps = {
  domain: null,
  value: null,
  options: null,
};

export default multilanguage(FieldComponent);
