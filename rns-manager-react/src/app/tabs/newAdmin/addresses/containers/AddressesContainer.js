import { connect } from 'react-redux';
import { AddressesComponent } from '../components';

const mapStateToProps = state => ({
  domain: state.auth.name,
  resolverName: state.newAdmin.resolver.resolverName,
  gettingResolver: state.newAdmin.resolver.gettingResolver,
});

export default connect(
  mapStateToProps,
)(AddressesComponent);
