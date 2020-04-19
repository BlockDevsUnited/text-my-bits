import { connect } from 'react-redux';
import ManageAccountComponent from '../components/ManageAccountComponent';
// import getAddressState from '../../search/operations';

const mapStateToProps = state => ({
  walletBalance: state.home.walletBalance,
  textingBalance: state.home.textingBalance,
});
// const mapDispatchToProps = dispatch => ({
//   handleWithdraw: value => dispatch(()=> {

//   })
// })
export default connect(
  mapStateToProps,
  null
  // mapDispatchToProps
)(ManageAccountComponent);
