import React, { Component } from 'react';
import propTypes from 'prop-types';
import {
  Container, Row, Col, Button, Form, InputGroup, FormControl,
} from 'react-bootstrap';
import { multilanguage } from 'redux-multilanguage';
import { validateAddress } from '../../../validations';
import { ChecksumErrorContainer } from '../../../containers';

class SubdomainComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addressToEdit: '',
      isValid: true,
      validationError: null,
    };

    this.addressChange = this.addressChange.bind(this);
    this.handleEditFormSubmit = this.handleEditFormSubmit.bind(this);
    this.validate = this.validate.bind(this);
    this.handleChecksumClick = this.handleChecksumClick.bind(this);
  }

  addressChange(event) {
    this.setState({ addressToEdit: event.target.value });
  }

  validate() {
    const { addressToEdit } = this.state;
    const validationError = validateAddress(addressToEdit, process.env.REACT_APP_ENVIRONMENT_ID);
    const isValid = validationError === null;
    this.setState({ validationError, isValid });
    return isValid;
  }

  handleEditFormSubmit(e) {
    if (e) {
      e.preventDefault();
    }

    const { addressToEdit } = this.state;
    if (this.validate()) {
      const { set } = this.props;
      set(addressToEdit.toLowerCase());
    }
  }

  handleChecksumClick(newValue) {
    this.setState({ addressToEdit: newValue }, () => {
      this.handleEditFormSubmit();
    });
  }

  render() {
    const {
      strings, label, parent, owner, changeEdit, viewEdit, editing,
    } = this.props;
    const subdomain = `${label}.${parent}`;

    const { isValid, validationError, addressToEdit } = this.state;

    return (
      <Container>
        <Row>
          <Col md={3}>
            {subdomain}
          </Col>
          <Col md={6}>
            {`owner: ${owner}`}
          </Col>
          <Col md={3}>
            <Button variant="link" onClick={changeEdit}>{viewEdit ? strings.cancel : strings.set_owner}</Button>
          </Col>
        </Row>
        {
          viewEdit
          && (
          <React.Fragment>
            <br />
            <Form onSubmit={this.handleEditFormSubmit}>
              <InputGroup>
                <FormControl
                  type="text"
                  value={addressToEdit}
                  onChange={this.addressChange}
                />
                <InputGroup.Append>
                  <Button type="submit" size="sm">{strings.set}</Button>
                </InputGroup.Append>
              </InputGroup>
            </Form>
            <div className="invalid-feedback" style={{ display: !isValid ? 'block' : 'none' }}>
              <div className="title">{validationError}</div>
              <ChecksumErrorContainer
                show={validationError === 'Invalid checksum'}
                inputValue={addressToEdit}
                handleClick={newValue => this.handleChecksumClick(newValue)}
              />
            </div>
          </React.Fragment>
          )
        }
        {
          editing && '...'
        }
      </Container>
    );
  }
}

SubdomainComponent.propTypes = {
  strings: propTypes.shape({
    cancel: propTypes.string.isRequired,
    owner: propTypes.string.isRequired,
    set: propTypes.string.isRequired,
    set_owner: propTypes.string.isRequired,
  }).isRequired,
  label: propTypes.string.isRequired,
  parent: propTypes.string.isRequired,
  owner: propTypes.string.isRequired,
  changeEdit: propTypes.func.isRequired,
  viewEdit: propTypes.bool.isRequired,
  editing: propTypes.bool.isRequired,
  set: propTypes.func.isRequired,
};

export default multilanguage(SubdomainComponent);
