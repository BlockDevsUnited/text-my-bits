import { connect } from 'react-redux';
import { SingleAccountComponent } from '../components';
// import getAddressState from '../../search/operations';
const mapStateToProps = state => ({
  account: state.home.account,
});
const mapDispatchToProps = dispatch => ({
  // handleClick: address => dispatch(getAddressState(address)),
  handleClick: address => dispatch(()=> {
    console.log("Hi " + address);
  })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SingleAccountComponent);
