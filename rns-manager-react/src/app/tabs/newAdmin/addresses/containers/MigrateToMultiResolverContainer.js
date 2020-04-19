import { connect } from 'react-redux';
import { MigrateToMultiResolverComponent } from '../components';
import { multiChainResolver } from '../../../../adapters/configAdapter';
import { setDomainResolver } from '../../resolver/operations';
import { closeMessage } from '../../resolver/actions';

const mapStateToProps = state => ({
  domain: state.auth.name,
  isWaiting: state.newAdmin.resolver.isWaiting,
  isEditing: state.newAdmin.resolver.isEditing,
  errorMessage: state.newAdmin.resolver.errorMessage,
});

const mapDispatchToProps = dispatch => ({
  handleClick: (domain, resolver) => dispatch(setDomainResolver(domain, resolver)),
  closeErrorMessage: () => dispatch(closeMessage()),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  handleClick: () => dispatchProps.handleClick(stateProps.domain, multiChainResolver),
  handleCloseClick: () => dispatchProps.closeErrorMessage(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(MigrateToMultiResolverComponent);
