import { connect } from 'react-redux';
import { AddressInputComponent } from '../../../../components';

import { setReverse } from '../operations';
import { closeMessages } from '../actions';

const mapStateToProps = state => ({
  domain: state.auth.domain,
  address: state.auth.address,
});

const mapDispatchToProps = dispatch => ({
  handleSubmit: value => dispatch(setReverse(value)),
  handleErrorClose: () => dispatch(closeMessages()),
  handleSuccessClose: () => dispatch(closeMessages()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddressInputComponent);
