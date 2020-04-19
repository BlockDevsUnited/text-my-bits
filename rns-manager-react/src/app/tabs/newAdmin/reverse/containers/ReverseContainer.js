import { connect } from 'react-redux';
import { ReverseComponent } from '../components';

const mapStateToProps = state => ({
  reverseValue: state.newAdmin.reverse.value,
  address: state.auth.address,
  chainId: state.auth.network,
  isRequesting: state.newAdmin.reverse.isRequesting,
  isWaiting: state.newAdmin.reverse.isWaiting,
  isError: state.newAdmin.reverse.isError,
  isSuccess: state.newAdmin.reverse.isSuccess,
  successTx: state.newAdmin.reverse.successTx,
  errorMessage: state.newAdmin.reverse.errorMessage,
});

export default connect(mapStateToProps)(ReverseComponent);
