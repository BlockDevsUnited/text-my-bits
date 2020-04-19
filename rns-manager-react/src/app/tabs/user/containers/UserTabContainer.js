import { connect } from 'react-redux';
import { UserTabComponent } from '../components';
import { networkSelector, toChecksumAddress } from '../../../selectors';
import { logoutManager } from '../../../auth/operations';

const mapStateToProps = state => ({
  name: state.auth.name,
  network: networkSelector(state.auth.network),
  address: state.auth.address && toChecksumAddress(state)(state.auth.address),
});

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(logoutManager()),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(UserTabComponent);
