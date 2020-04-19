import { connect } from 'react-redux';

import { TransferSuccessModalComponent } from '../components';
import { logoutManager } from '../../../../auth/operations';
import { handleTransferSuccessClose } from '../actions';

const mapStateToProps = state => ({
  domain: state.auth.storageName,
});

const mapDispatchToProps = dispatch => ({
  handleClick: (path) => {
    dispatch(handleTransferSuccessClose());
    dispatch(logoutManager(path));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TransferSuccessModalComponent);
