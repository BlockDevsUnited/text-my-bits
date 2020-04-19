import { connect } from 'react-redux';
import { RenewDomainComponent } from '../components';
import { renewDomain } from '../operations';
import { closeRenewError, closeRenewSuccess } from '../actions';

const mapStateToProps = state => ({
  isRenewOpen: state.newAdmin.domainInfo.isRenewOpen,
  isRenewing: state.newAdmin.domainInfo.isRenewing,
  domain: state.auth.name.replace('.rsk', ''),
  duration: state.registrar.duration,
  rifCost: state.registrar.rifCost,
  renewError: state.newAdmin.domainInfo.renewError,
  renewSuccess: state.newAdmin.domainInfo.renewSuccess,
  renewSuccessTx: state.newAdmin.domainInfo.renewSuccessTx,
});

const mapDispatchToProps = dispatch => ({
  handleRenewClick: (domain, rifCost, duration) => dispatch(renewDomain(domain, rifCost, duration)),
  closeRenewError: () => dispatch(closeRenewError()),
  closeSuccess: () => dispatch(closeRenewSuccess()),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  handleRenewClick: () => dispatchProps.handleRenewClick(
    stateProps.domain, stateProps.rifCost, stateProps.duration,
  ),
  closeRenewError: () => dispatchProps.closeRenewError(),
  closeSuccess: () => dispatchProps.closeSuccess(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(RenewDomainComponent);
