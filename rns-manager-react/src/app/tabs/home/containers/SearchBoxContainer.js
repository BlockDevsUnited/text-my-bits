import { connect } from 'react-redux';
import { SearchBoxComponent } from '../components';
// import getAddressState from '../../search/operations';

const mapDispatchToProps = dispatch => ({
  // handleClick: address => dispatch(getAddressState(address)),
  handleClick: address => dispatch(()=> {
    console.log("Hi " + address);
  })
});

export default connect(
  null,
  mapDispatchToProps,
)(SearchBoxComponent);
