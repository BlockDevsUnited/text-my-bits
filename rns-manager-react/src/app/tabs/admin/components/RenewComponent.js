import React, { Component } from 'react';
import { multilanguage } from 'redux-multilanguage';
import { Redirect } from 'react-router-dom';
import propTypes from 'prop-types';
import {
  Spinner, Container, Button, Col,
} from 'react-bootstrap';

class RenewComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      renewName: false,
    };

    this.renewName = this.renewName.bind(this);
  }

  componentDidMount() {
    const { checkIfSubdomainAndGetExpirationRemaining } = this.props;
    checkIfSubdomainAndGetExpirationRemaining();
  }

  renewName() {
    return this.setState({ renewName: true });
  }

  render() {
    const {
      isSubdomain, checking, strings, expirationRemaining, domain,
    } = this.props;

    const { renewName } = this.state;

    if (renewName) {
      const redirection = `/renew?domain=${domain}`;
      return <Redirect to={redirection} />;
    }

    if (!isSubdomain) {
      if (checking) {
        return <Spinner animation="grow" variant="primary" />;
      }

      if (expirationRemaining > 0) {
        return (
          <Container>
            <Col>
              {strings.your_domain_expires}
              {expirationRemaining}
              {strings.days}
            </Col>
            <Button onClick={this.renewName}>
              {strings.renew_your_domain}
            </Button>
            <hr />
          </Container>
        );
      }
    }

    return '';
  }
}

RenewComponent.defaultProps = {
  domain: '',
  isSubdomain: undefined,
};

RenewComponent.propTypes = {
  strings: propTypes.shape({
    renew_your_domain: propTypes.string.isRequired,
    your_domain_expires: propTypes.string.isRequired,
    days: propTypes.string.isRequired,
  }).isRequired,
  checkIfSubdomainAndGetExpirationRemaining: propTypes.func.isRequired,
  isSubdomain: propTypes.bool,
  checking: propTypes.bool.isRequired,
  expirationRemaining: propTypes.number.isRequired,
  domain: propTypes.string,
};

export default multilanguage(RenewComponent);
