import React, { Component } from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';
import { Link, Redirect } from 'react-router-dom';
import {
  Card, Spinner, Row, Col, Button,
} from 'react-bootstrap';
import { RentalPeriodContainer } from '../../registrar/containers';
import { isValidName } from '../../../validations';

class RenewComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      invalid: null,
    };
  }

  componentDidMount() {
    const { domain, getState } = this.props;
    if (domain && this.validate() && getState) getState(domain);
  }

  validate() {
    const { domain } = this.props;
    const invalid = isValidName(domain);
    this.setState({ invalid });
    return !invalid;
  }

  render() {
    const {
      strings, domain, available, domainStateLoading, renewing, doRenew, hasBalance,
    } = this.props;
    const { invalid } = this.state;

    if (!domain) {
      return <Redirect to="/search" />;
    }

    if (invalid) {
      return <h4>{invalid}</h4>;
    }

    if (domainStateLoading) {
      return <Spinner animation="grow" variant="primary" />;
    }

    if (available) {
      const domainDisplay = `${domain}.rsk`;
      return (
        <Card.Text>
          {strings.not_registered_domain}
          <br />
          <Link to={`/registrar?domain=${domain}`} className="btn btn-primary">
            {strings.register}
            {' '}
            {domainDisplay}
          </Link>
        </Card.Text>
      );
    }

    const domainDisplay = `${domain}.rsk`;

    return (
      <div>
        <h2>
          {strings.start_renovation_for}
          {' '}
          <code>{domainDisplay}</code>
        </h2>
        <Row>
          <div className="col-md-6 offset-md-3">
            <RentalPeriodContainer />
          </div>
        </Row>
        <Row>
          <Col>
            {
              renewing
                ? <Spinner animation="grow" variant="primary" />
                : (
                  <Button
                    disabled={!hasBalance}
                    onClick={doRenew}
                  >
                    {strings.renew}
                  </Button>
                )
            }
          </Col>
        </Row>
      </div>
    );
  }
}

RenewComponent.propTypes = {
  strings: propTypes.shape({
    start_renovation_for: propTypes.string.isRequired,
    rental_period: propTypes.string.isRequired,
    register: propTypes.string.isRequired,
    not_registered_domain: propTypes.string.isRequired,
    renew: propTypes.string.isRequired,
  }).isRequired,
  domain: propTypes.string.isRequired,
  domainStateLoading: propTypes.bool.isRequired,
  available: propTypes.bool.isRequired,
  renewing: propTypes.bool.isRequired,
  hasBalance: propTypes.bool.isRequired,
  getState: propTypes.func.isRequired,
  doRenew: propTypes.func.isRequired,
};

export default multilanguage(RenewComponent);
