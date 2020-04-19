import { connect } from 'react-redux';
import { RenewButtonComponent } from '../components';
import { toggleRenew } from '../actions';

const mapStateToProps = state => ({
  expires: state.newAdmin.domainInfo.expires,
  isRenewOpen: state.newAdmin.domainInfo.isRenewOpen,
  checkingExpirationTime: state.newAdmin.domainInfo.checkingExpirationTime,
});

const mapDispatchToProps = dispatch => ({
  handleClick: isRenewOpen => dispatch(toggleRenew(!isRenewOpen)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  handleClick: () => dispatchProps.handleClick(stateProps.isRenewOpen),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(RenewButtonComponent);
