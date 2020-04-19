import { connect } from 'react-redux';
import { checkIfSubdomainOrMigrated, migrateToFifsRegistrar } from '../operations';
import { FIFSMigrationComponent } from '../components';

const mapStateToProps = state => ({
  name: state.auth.name,
  address: state.auth.address,
  ...state.admin.fifsMigration,
});

const mapDispatchToProps = dispatch => ({
  checkIfSubdomainOrMigrated: name => dispatch(checkIfSubdomainOrMigrated(name)),
  migrate: (name, address) => dispatch(migrateToFifsRegistrar(name, address)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  checkIfSubdomainOrMigrated: () => dispatchProps.checkIfSubdomainOrMigrated(stateProps.name),
  migrate: () => dispatchProps.migrate(stateProps.name, stateProps.address),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(FIFSMigrationComponent);
