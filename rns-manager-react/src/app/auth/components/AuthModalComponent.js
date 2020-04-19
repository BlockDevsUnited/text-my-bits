import React, { Component } from 'react';
import propTypes from 'prop-types';
import {
  Modal, Row, Col, Form, Button, Spinner,
} from 'react-bootstrap';
import { multilanguage } from 'redux-multilanguage';

class AuthModalComponent extends Component {
  constructor(props) {
    super(props);

    this.state = { nameInputValue: props.defaultName || props.storageName };

    this.changeInputName = this.changeInputName.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  changeInputName(event) {
    this.setState({ nameInputValue: event.target.value });
  }

  handleFormSubmit(event) {
    event.preventDefault();

    const { authenticate } = this.props;
    const { nameInputValue } = this.state;
    authenticate(nameInputValue);
  }

  render() {
    const {
      strings,
      show,
      close,
      hasMetamask,
      walletUnlocked,
      enabling,
      enableError,
      managerNetwork,
      networkMatch,
      authError,
      name,
      isOwner,
      openWallets,
      authenticating,
    } = this.props;

    let nameInput;

    const variant = 'rif';

    const { nameInputValue } = this.state;

    let body;

    if (!hasMetamask) {
      body = <Button type="link" onClick={openWallets}>{strings.get_metamask}</Button>;
    } else if (!walletUnlocked) {
      body = <div>{strings.unlock_wallet}</div>;
    } else if (!networkMatch) {
      body = (
        <div>
          <p><strong>{strings.unknown_network}</strong></p>
          <p>{`${strings.connect_to_network} ${managerNetwork}`}</p>
        </div>
      );
    } else if (authenticating) {
      body = <Spinner animation="grow" variant="primary" />;
    } else {
      body = (
        enabling
          ? 'Enabling...'
          : (
            enableError
        || (
        <Form onSubmit={this.handleFormSubmit}>
          <Form.Group controlId="network">
            <Row>
              <Col lg={2}>
                <Form.Label className={`control-label-${variant}`}>Network</Form.Label>
              </Col>
              <Col lg={10}>
                {managerNetwork}
              </Col>
            </Row>
          </Form.Group>

          <Form.Group controlId="name">
            <Row>
              <Col lg={2}>
                <Form.Label className={`control-label-${variant}`}>Name</Form.Label>
              </Col>
              <Col lg={10}>
                <Form.Control
                  className={`form-control-${variant}`}
                  type="text"
                  value={nameInputValue}
                  onChange={this.changeInputName}
                />
              </Col>
            </Row>
          </Form.Group>
          {
            authError
            && (
            <Form.Group as={Row}>
              <Form.Label column sm="12">
                {authError}
              </Form.Label>
            </Form.Group>
            )
          }
          {
            (name && !isOwner)
            && (
              <Row>
                <Col>
                  <p>{strings.not_domains_owner_message}</p>
                </Col>
              </Row>
            )
          }
        </Form>
        ))
      );
    }

    return (
      <Modal show={show} onEntered={() => nameInput && nameInput.focus()} onHide={close}>
        <Modal.Header closeButton>
          <Modal.Title>{strings.log_in}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {body}
        </Modal.Body>
        <Modal.Footer>
          {
            hasMetamask && walletUnlocked && !enabling && !enableError && !authenticating
            && (
            <React.Fragment>
              <Button onClick={this.handleFormSubmit}>{strings.log_in}</Button>
            </React.Fragment>
            )
          }
        </Modal.Footer>
      </Modal>
    );
  }
}

AuthModalComponent.propTypes = {
  defaultName: propTypes.string,
  storageName: propTypes.string,
  strings: propTypes.objectOf(propTypes.string).isRequired,
  show: propTypes.bool.isRequired,
  close: propTypes.func.isRequired,
  hasMetamask: propTypes.bool.isRequired,
  walletUnlocked: propTypes.bool.isRequired,
  enabling: propTypes.bool.isRequired,
  enableError: propTypes.string,
  managerNetwork: propTypes.string.isRequired,
  networkMatch: propTypes.bool.isRequired,
  authenticate: propTypes.func.isRequired,
  authError: propTypes.string,
  name: propTypes.string,
  isOwner: propTypes.bool.isRequired,
  openWallets: propTypes.func.isRequired,
  authenticating: propTypes.bool.isRequired,
};

AuthModalComponent.defaultProps = {
  defaultName: '',
  storageName: null,
  enableError: null,
  authError: null,
  name: null,
};

export default multilanguage(AuthModalComponent);
