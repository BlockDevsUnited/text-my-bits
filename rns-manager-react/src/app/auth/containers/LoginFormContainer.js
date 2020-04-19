import { connect } from 'react-redux';
import { LoginFormComponent } from '../components';

const mapStateToProps = state => ({
  domainInputInitialState: state.auth.authErrorDomain.replace('.rsk', ''),
});

export default connect(
  mapStateToProps,
  null,
)(LoginFormComponent);
