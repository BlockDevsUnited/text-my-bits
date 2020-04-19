import { connect } from 'react-redux';
import { SubdomainComponent } from '../components';
import { viewEditSubdomainOwner } from '../actions';
import { setSubdomainOwner } from '../operations';
import { toChecksumAddress } from '../../../selectors';

const mapStateToProps = (state, ownProps) => {
  const subdomain = state.admin.subdomains.find(s => s.label === ownProps.label);

  return {
    parent: state.auth.name,
    address: state.auth.address,
    owner: subdomain.owner && toChecksumAddress(state)(subdomain.owner),
    viewEdit: subdomain.viewEdit,
    editing: subdomain.editing,
    response: subdomain.response,
    hasError: subdomain.hasError,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  changeEdit: () => dispatch(viewEditSubdomainOwner(ownProps.label)),
  set: (node, owner, address) => dispatch(setSubdomainOwner(node, ownProps.label, owner, address)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  set: owner => dispatchProps.set(stateProps.parent, owner, stateProps.address),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(SubdomainComponent);
