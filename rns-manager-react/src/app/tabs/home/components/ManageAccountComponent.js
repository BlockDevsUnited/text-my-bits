import React, { Component } from 'react'
import { multilanguage } from 'redux-multilanguage';
import propTypes from 'prop-types';
import { Row, Button } from 'react-bootstrap';

class ManageAccountComponent extends Component {
  constructor(props) {
    super(props)
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
       deposit: '',
       withdraw: '',
       error: ''
    }
  }
  
  handleChange(e, transaction){
    this.setState({
      [transaction]: e.target.value
    })
  }
  handleOnClick(transaction){
    if(transaction==='deposit'){
      this.props.deposit(this.state.deposit)
    }

    else if(transaction==='withdraw')
      this.props.withdraw(this.state.withdraw)
    this.setState({
      deposit: '',
      withdraw: ''
    })
  }
  render() {
    return (
      <>
        <Row>
          <div className="col-md-7 offset-md-1">
            <p>Online Wallet Balance: {this.props.walletBalance}</p>
            <p>Phone Number: </p>
            <p>Texting Balance: {this.props.textingBalance } </p>
          </div>
        </Row>
        <Row className="searchBox">
          <div className="col-md-7 offset-md-1 searchInput">
            <input
              placeholder='Cash'
              value={this.state.deposit}
              onChange={e => this.handleChange(e, 'deposit')}
            />
            <span className="blue"></span>
          </div>
          <div className="col-md-3">
            <Button
              onClick={() => this.handleOnClick('deposit')}
            >
              Deposit
            </Button>
          </div>
        </Row>
          <Row className="searchBox">
            <div className="col-md-7 offset-md-1 searchInput">
            <input
              placeholder='Cash'
              value={this.state.withdraw}
              onChange={e => this.handleChange(e, 'withdraw')}
            />
            <span className="blue"></span>
          </div>
          <div className="col-md-3">
            <Button
              onClick={() => this.handleOnClick('withdraw')}
            >
              Withdraw
            </Button>
          </div>
        </Row>
        {this.state.error
        && (
          <Row className="errorMessage">
            <div className="col-md-8 offset-md-2">
              <p>{this.state.error}</p>
            </div>
          </Row>
        )}
      </>
    );
  }
};

ManageAccountComponent.propTypes = {
  strings: propTypes.shape({
    search: propTypes.string.isRequired,
    blocked_domain: propTypes.string.isRequired,
    invalid_name: propTypes.string.isRequired,
  }).isRequired,
};

export default multilanguage(ManageAccountComponent);
