import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { parse } from 'query-string';
import { GetDomainStateComponent } from '../components';

const mapStateToProps = state => ({
  domain: parse(state.router.location.search).domain,
  disableSearchButton: (state.registrar.committing || state.registrar.committed) && state.router.location.pathname === '/registrar',
});

const mapDispatchToProps = dispatch => ({
  getDomainState: domain => dispatch(push(`/search?domain=${domain}`)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GetDomainStateComponent);
