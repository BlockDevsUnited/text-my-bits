import { connect } from 'react-redux';
import { parse } from 'query-string';
import { RenewComponent } from '../components';
import getDomainState from '../../search/operations';
import renew from '../operations';


const mapStateToProps = state => ({
  domain: parse(state.router.location.search).domain,
  domainStateLoading: state.search.domainStateLoading,
  available: !state.search.owner,
  renewing: state.renew.renewing,
  duration: state.registrar.duration,
  rifCost: state.registrar.rifCost,
  hasBalance: state.registrar.hasBalance,
});

const mapDispatchToProps = dispatch => ({
  getState: domain => dispatch(getDomainState(domain)),
  doRenew: (domain, rifCost, duration) => dispatch(renew(domain, rifCost, duration)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  doRenew: () => dispatchProps.doRenew(stateProps.domain, stateProps.rifCost, stateProps.duration),
  getState: domain => dispatchProps.getState(domain),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(RenewComponent);
