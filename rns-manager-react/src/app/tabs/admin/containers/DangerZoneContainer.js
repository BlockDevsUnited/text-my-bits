import { connect } from 'react-redux';
import { checkIfSubdomainOrTokenOwner } from '../operations';
import { DangerZoneComponent } from '../components';

const mapStateToProps = state => ({
  name: state.auth.name,
  currentAddress: state.auth.address,
  ...state.admin.transferDomain,
});

const mapDispatchToProps = dispatch => ({
  checkIfSubdomainOrTokenOwner:
    (name, currentAddress) => dispatch(checkIfSubdomainOrTokenOwner(name, currentAddress)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  checkIfSubdomainOrTokenOwner:
    () => dispatchProps.checkIfSubdomainOrTokenOwner(stateProps.name, stateProps.currentAddress),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(DangerZoneComponent);
