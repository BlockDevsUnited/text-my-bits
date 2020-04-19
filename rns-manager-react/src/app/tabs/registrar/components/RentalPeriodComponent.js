import React, { Component } from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';
import {
  InputGroup, FormControl, Button, Row, Spinner, Alert,
} from 'react-bootstrap';


class RentalPeriodComponent extends Component {
  constructor(props) {
    super(props);
    const { duration } = this.props;

    this.state = {
      duration,
    };

    this.handleChangeDuration = this.handleChangeDuration.bind(this);
    this.decrement = this.decrement.bind(this);
    this.increment = this.increment.bind(this);
  }

  componentDidMount() {
    const { getConversionRate } = this.props;
    getConversionRate();

    this.handleChangeDuration();
  }

  handleChangeDuration() {
    const { getCost } = this.props;
    const { duration } = this.state;
    getCost(duration);
  }

  decrement() {
    const { duration } = this.state;
    if (duration <= 1) {
      return;
    }
    this.setState({ duration: duration - 1 }, this.handleChangeDuration);
  }

  increment() {
    const { duration } = this.state;
    this.setState({ duration: duration + 1 }, this.handleChangeDuration);
  }

  render() {
    const {
      strings,
      getting,
      rifCost,
      committing,
      committed,
      hasBalance,
      gettingConversionRate,
      conversionRate,
    } = this.props;

    const { duration } = this.state;

    const counter = (
      <div className="counter">
        <h3>
          {strings.how_long_want_domain}
          ?
        </h3>
        <InputGroup>
          <InputGroup.Append>
            <Button size="sm" disabled={committing || committed} onClick={this.decrement}>-</Button>
          </InputGroup.Append>
          <FormControl
            value={duration}
            readOnly
          />
          <InputGroup.Append>
            <Button size="sm" disabled={committing || committed || !hasBalance} onClick={this.increment}>+</Button>
          </InputGroup.Append>
        </InputGroup>
        <p>{strings.period_in_years}</p>
        <p className="blue">{strings.discount}</p>
      </div>
    );

    const usdAmount = parseFloat(rifCost * conversionRate).toPrecision(4);

    const price = (
      <div className="price">
        <h3>{strings.price}</h3>
        <div className="box">
          <p className="rifPrice">
            {rifCost}
            {' '}
            rif
          </p>
          <p className="usdPrice">
            {(!gettingConversionRate && conversionRate) && <>{`$${usdAmount} USD`}</> }
          </p>
        </div>
      </div>
    );

    return (
      <div className="rentalPeriod">
        <Row>
          <div className="col-md-6">
            {counter}
          </div>
          <div className="col-md-6">
            {
              getting
                ? <Spinner animation="grow" variant="primary" />
                : price
            }
          </div>
        </Row>
        {
          !hasBalance
          && (
            <Alert variant="warning" dismissible="false">
              <p>{strings.not_enough_balance}</p>
              <a
                href="https://www.rifos.org/#rif-token"
                target="_blank"
                rel="noopener noreferrer"
              >
                {strings.click_here_not_enough_balance}
              </a>
            </Alert>
          )
        }
      </div>
    );
  }
}

RentalPeriodComponent.propTypes = {
  strings: propTypes.shape({
    period_in_years: propTypes.string.isRequired,
    discount: propTypes.string.isRequired,
    price: propTypes.string.isRequired,
    how_long_want_domain: propTypes.string.isRequired,
    click_here_not_enough_balance: propTypes.string.isRequired,
    not_enough_balance: propTypes.string.isRequired,
  }).isRequired,
  getting: propTypes.bool.isRequired,
  rifCost: propTypes.number,
  hasBalance: propTypes.bool.isRequired,
  duration: propTypes.number,
  getCost: propTypes.func.isRequired,
  getConversionRate: propTypes.func.isRequired,
  committing: propTypes.bool.isRequired,
  committed: propTypes.bool.isRequired,
  gettingConversionRate: propTypes.bool.isRequired,
  conversionRate: propTypes.number.isRequired,
};

RentalPeriodComponent.defaultProps = {
  rifCost: 0,
  duration: 3,
};

export default multilanguage(RentalPeriodComponent);
