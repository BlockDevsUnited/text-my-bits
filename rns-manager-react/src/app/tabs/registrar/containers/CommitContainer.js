import { connect } from 'react-redux';
import { parse } from 'query-string';
import { CommitComponent } from '../components';
import { commit, checkIfAlreadyCommitted } from '../operations';
import { toggleSetupAddr } from '../actions';

const mapStateToProps = state => ({
  committing: state.registrar.committing,
  committed: state.registrar.committed,
  domain: parse(state.router.location.search).domain,
  hasBalance: state.registrar.hasBalance,
  setupAddr: state.registrar.setupAddr,
  duration: state.registrar.duration,
  rifCost: state.registrar.rifCost,
});

const mapDispatchToProps = dispatch => ({
  doCommitment: (domain, duration, rifCost, setupAddr) => dispatch(commit(
    domain,
    duration,
    rifCost,
    setupAddr,
  )),
  checkIfAlreadyCommitted: domain => dispatch(checkIfAlreadyCommitted(domain)),
  toggleSetupAddr: setupAddr => dispatch(toggleSetupAddr(setupAddr)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  doCommitment: () => dispatchProps.doCommitment(
    stateProps.domain,
    stateProps.duration,
    stateProps.rifCost,
    stateProps.setupAddr,
  ),
  checkIfAlreadyCommitted: () => dispatchProps.checkIfAlreadyCommitted(stateProps.domain),
  toggleSetupAddr: () => dispatchProps.toggleSetupAddr(stateProps.setupAddr),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(CommitComponent);
