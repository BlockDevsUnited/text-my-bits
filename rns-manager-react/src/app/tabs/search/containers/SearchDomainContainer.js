import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { parse } from 'query-string';
import { GetDomainStateComponent } from '../../../components';
import getAuctionState from '../operations';

const mapStateToProps = state => ({
  domain: parse(state.router.location.search).domain,
});

const mapDispatchToProps = dispatch => ({
  getDomainState: (domain) => {
    dispatch(getAuctionState(domain));
    dispatch(push(`/search?domain=${domain}`));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GetDomainStateComponent);
