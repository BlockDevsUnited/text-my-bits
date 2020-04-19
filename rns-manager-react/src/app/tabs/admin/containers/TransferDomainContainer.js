import { connect } from 'react-redux';
import { transferToken } from '../operations';
import { TransferDomainComponent } from '../components';

const mapStateToProps = state => ({
  name: state.auth.name,
  currentAddress: state.auth.address,
  isWaiting: state.newAdmin.transfer.requestingTransfer,
  isError: state.newAdmin.transfer.isError,
  ...state.admin.transferDomain,
});

const mapDispatchToProps = dispatch => ({
  transferToken: (
    name,
    addressToTransfer,
    currentAddress,
  ) => dispatch(transferToken(name, addressToTransfer, currentAddress)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  transfer: addressToTransfer => dispatchProps.transferToken(
    stateProps.name,
    addressToTransfer,
    stateProps.currentAddress,
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(TransferDomainComponent);
