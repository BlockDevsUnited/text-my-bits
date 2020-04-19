import { connect } from 'react-redux';
import { SubdomainsListComponent } from '../components';
import { loadSubdomains, addSubdomain } from '../operations';

const mapStateToProps = state => ({
  domain: state.auth.name,
  subdomains: state.admin.subdomains.map(subdomain => subdomain.label),
});

const mapDispatchToProps = dispatch => ({
  onAddSubdomain: (domain, subdomain) => dispatch(addSubdomain(domain, subdomain)),
  loadSubdomains: domain => dispatch(loadSubdomains(domain)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  onAddSubdomain: (subdomain) => {
    if (stateProps.subdomains && !stateProps.subdomains.find(s => s === subdomain)) {
      dispatchProps.onAddSubdomain(stateProps.domain, subdomain);
    }
  },
  loadSubdomains: () => dispatchProps.loadSubdomains(stateProps.domain),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(SubdomainsListComponent);
