import { connect } from 'react-redux';
import { checkIfSubdomainAndGetExpirationRemaining } from '../operations';
import { RenewComponent } from '../components';

const mapStateToProps = state => ({
  name: state.auth.name,
  domain: state.admin.renewDomain.domain,
  expirationRemaining: state.admin.renewDomain.expirationRemaining,
  ...state.admin.fifsMigration,
});

const mapDispatchToProps = dispatch => ({
  checkIfSubdomainAndGetExpirationRemaining:
    name => dispatch(checkIfSubdomainAndGetExpirationRemaining(name)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  checkIfSubdomainAndGetExpirationRemaining:
    () => dispatchProps.checkIfSubdomainAndGetExpirationRemaining(stateProps.name),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(RenewComponent);
