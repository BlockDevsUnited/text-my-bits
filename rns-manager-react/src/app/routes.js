import React from 'react';
import propTypes from 'prop-types';
import { Switch, Route, withRouter } from 'react-router';
import { connect } from 'react-redux';
import {
  HomeTab,
  SetUpTab,
  NoMetamaskTab,
  ResolveTab,
  SearchTab,
  RegistrarTab,
  AdminTab,
  PublicResolverTab,
  MultiChainResolverTab,
  NotificationTab,
  UserTab,
  RenewTab,
  ErrorTab,
  StringResolverTab,
  NewAdminTab,
  FaqTab,
} from './tabs';

const NoMatch = () => <p>404! Page not found :(</p>;

const Routes = (props) => {
  const { networkMatch, walletUnlocked } = props;

  const notLoggedIn = !window.ethereum || !networkMatch || !walletUnlocked;

  return (
    <Switch>
      <Route exact path="/" component={HomeTab} />
      <Route path="/setup" component={SetUpTab} />
      <Route path="/search" component={SearchTab} />
      <Route path="/resolve" component={ResolveTab} />
      <Route path="/faq" component={FaqTab} />
      {
        notLoggedIn && <Route component={ErrorTab} />
      }
      <Route path="/user" component={UserTab} />
      <Route path="/registrar" component={RegistrarTab} />
      <Route path="/admin" component={AdminTab} />
      <Route path="/newAdmin" component={NewAdminTab} />
      <Route path="/publicResolver" component={PublicResolverTab} />
      <Route path="/multiChainResolver" component={MultiChainResolverTab} />
      <Route path="/stringResolver" component={StringResolverTab} />
      <Route path="/notifications" component={NotificationTab} />
      <Route path="/wallets" component={NoMetamaskTab} />
      <Route path="/renew" component={RenewTab} />
      <Route component={NoMatch} />
    </Switch>
  );
};

Routes.defaultProps = {
  networkMatch: false,
  walletUnlocked: false,
};

Routes.propTypes = {
  networkMatch: propTypes.bool,
  walletUnlocked: propTypes.bool,
};

const mapStateToProps = state => ({
  networkMatch: state.auth.networkMatch,
  walletUnlocked: state.auth.walletUnlocked,
});

export default withRouter(connect(mapStateToProps)(Routes));
