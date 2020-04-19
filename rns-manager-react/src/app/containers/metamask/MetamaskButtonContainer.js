import { connect } from 'react-redux';
import { MetamaskButtonComponent } from '../../components';
import { start } from '../../auth';

const mapStateToProps = state => ({
  address: state.auth.address,
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  startAndClick: () => dispatch(start(ownProps.onClick)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MetamaskButtonComponent);
