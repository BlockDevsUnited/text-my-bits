import { connect } from 'react-redux';
import { HeaderComponent } from '../components';
import { logoutManager } from '../auth/operations';

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isOwner,
  domain: state.auth.name,
  network: process.env.REACT_APP_ENVIRONMENT_ID,
});

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(logoutManager()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HeaderComponent);
