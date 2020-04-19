import React, { Component } from 'react';
import {connect} from 'react-redux';
import propTypes from 'prop-types';
import {
  Container, Row,
} from 'react-bootstrap';
import { multilanguage } from 'redux-multilanguage';
import { SingleAccountContainer, ManageAccountContainer } from '../containers';
import Web3 from 'web3';
import tmbABI from '../tmbABI.json';
import {getWalletBalance, getTextingBalance, getAccount} from '../actions';


class HomeComponent extends Component {
  constructor(props) {
    super(props)
    this.formatPage = this.formatPage.bind(this);
    this.state = {
       account: '',
      //  moo: undefined,
    }
  } 
  
  componentDidMount() {
    this.web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    this.contract = new this.web3.eth.Contract(tmbABI, "0x86e2073284B72256Fa674FfFa19B2449485F7192")
    this.loadBlockchainData()
  }
  async loadBlockchainData() {
    const accounts = await this.web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    this.props.getAccount({account : accounts[0]})

    const wb = new this.web3.eth.getBalance(accounts[0]).then(payload => this.props.getWalletBalance({walletBalance: payload}))
    const tb = await this.contract.methods.getBalance("0x86e2073284B72256Fa674FfFa19B2449485F7192").call();
    this.props.getTextingBalance({textingBalance: tb})
  }
  async deposit(value){
    this.contract.methods.deposit().send({from: this.state.account, value: value});
  }
  async withdraw(value){
    this.contract.methods.withdraw(value).send({from: this.state.account});
  }
  formatPage() {
    return(
    <div className="col-md-8 offset-md-2 accountBox">
      <h1>Manage Account</h1>
      <ManageAccountContainer 
        deposit = {this.deposit.bind(this)}
        withdraw = {this.withdraw.bind(this)}
      />
      <h1>Register Account</h1>
      <SingleAccountContainer />
    </div>
    )
  }
  render() {
    return (
      <div className="home">
      <Container className="search">
        <Container>
          <Row>
            {this.formatPage()}
          </Row>
        </Container>
      </Container>
      <div className="spacer">&nbsp;</div>
    </div>
    )
  }
}
HomeComponent.propTypes = {
  strings: propTypes.shape({
    get_your_domain: propTypes.string.isRequired,
    home_explanation: propTypes.string.isRequired,
  }).isRequired,
  getWalletBalance: propTypes.func.isRequired,
  getTextingBalance: propTypes.func.isRequired,
  getAccount: propTypes.func.isRequired,
};

export default connect(
  null,
  {getWalletBalance, getTextingBalance, getAccount},
)(multilanguage(HomeComponent));
