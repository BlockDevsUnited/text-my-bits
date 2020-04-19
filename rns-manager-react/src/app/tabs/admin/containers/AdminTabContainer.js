import { connect } from 'react-redux';
import { AdminTabComponent } from '../components';

const mapStateToProps = state => ({
  name: state.auth.name,
  resolver: state.admin.resolver.value && state.admin.resolver.value.toLowerCase(),
});

export default connect(mapStateToProps)(AdminTabComponent);
