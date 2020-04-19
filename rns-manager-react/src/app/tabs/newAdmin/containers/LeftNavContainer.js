import { connect } from 'react-redux';
import { LeftNavComponent } from '../components';

const mapStateToProps = state => ({
  advancedView: state.newAdmin.view.advancedView,
  location: state.router.location.pathname,
  domain: state.auth.name,
});

export default connect(
  mapStateToProps,
  null,
)(LeftNavComponent);
