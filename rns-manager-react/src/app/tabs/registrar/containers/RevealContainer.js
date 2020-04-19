import { connect } from 'react-redux';
import { parse } from 'query-string';
import { RevealComponent } from '../components';
import { revealCommit } from '../operations';

const mapStateToProps = state => ({
  waiting: state.registrar.waiting,
  commitConfirmed: state.registrar.commitConfirmed,
  revealConfirmed: state.registrar.revealConfirmed,
  canReveal: state.registrar.canReveal,
  revealing: state.registrar.revealing,
  revealed: state.registrar.revealed,
  committed: state.registrar.committed,
  domain: parse(state.router.location.search).domain,
  hash: state.registrar.hash,
  rifCost: state.registrar.rifCost,
  duration: state.registrar.duration,
  setupAddr: state.registrar.setupAddr,
});

const mapDispatchToProps = dispatch => ({
  revealCommit: domain => dispatch(revealCommit(domain)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  revealCommit: () => dispatchProps.revealCommit(stateProps.domain),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(RevealComponent);
