import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import SearchResultsComponent from '../components/SearchResultsComponent';
import { clearDomainState } from '../../search/actions';

const mapStateToProps = state => ({
  domain: state.search.domain,
  available: !state.search.owned,
  blocked: state.search.blocked,
  isSearching: state.search.domainStateLoading,
  rifCost: state.search.rifCost,
});

const mapDispatchToProps = dispatch => ({
  handleClick: (domain) => {
    dispatch(clearDomainState());
    dispatch(push(`/registrar?domain=${domain}`));
  },
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  handleClick: () => dispatchProps.handleClick(stateProps.domain),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(SearchResultsComponent);
