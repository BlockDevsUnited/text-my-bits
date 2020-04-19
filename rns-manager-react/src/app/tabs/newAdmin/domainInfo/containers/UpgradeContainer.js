import { connect } from 'react-redux';
import { UpgradeComponent } from '../components';
import { migrateToFifsRegistrar } from '../operations';

const mapStateToProps = state => ({
  domain: state.auth.name,
  address: state.auth.address,
  isFifsMigrated: state.newAdmin.view.isFifsMigrated,
  isMigrating: state.newAdmin.domainInfo.isMigrating,
});

const mapDispatchToProps = dispatch => ({
  handleClick: (domain, sender) => dispatch(migrateToFifsRegistrar(domain, sender)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  handleClick: () => dispatchProps.handleClick(stateProps.domain, stateProps.address),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(UpgradeComponent);
