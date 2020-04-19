import { connect } from 'react-redux';
import { parse } from 'query-string';
import { LoadingComponent } from '../components';
import { checkCanReveal } from '../operations';

const mapStateToProps = state => ({
  waiting: state.registrar.waiting,
  hash: state.registrar.hash,
  setupAddr: state.registrar.setupAddr,
  commitConfirmed: state.registrar.commitConfirmed,
  domain: parse(state.router.location.search).domain,
});

const mapDispatchToProps = dispatch => ({
  checkCanReveal: (hashCommit, domain) => dispatch(checkCanReveal(hashCommit, domain)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  checkCanReveal: () => dispatchProps.checkCanReveal(stateProps.hash, stateProps.domain),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(LoadingComponent);
