import { connect } from 'react-redux';
import { AdminTabComponent } from '../components';
import { toggleBasicAdvancedSwitch } from '../operations';

const mapStateToProps = state => ({
  advancedView: state.newAdmin.view.advancedView,
  domain: state.auth.name,
});

const mapDispatchToProps = dispatch => ({
  toggleAdvancedBasic: value => dispatch(toggleBasicAdvancedSwitch(value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminTabComponent);
