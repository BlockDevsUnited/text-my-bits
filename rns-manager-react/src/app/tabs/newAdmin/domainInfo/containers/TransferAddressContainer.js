import { connect } from 'react-redux';
import { AddressInputComponent } from '../../../../components';
import { transferDomain } from '../operations';
import { handleTransferErrorClose } from '../actions';

const mapStateToProps = (state, ownProps) => ({
  allowDelete: false,
  isWaiting: state.newAdmin.domainInfo.requestingTransfer,
  isError: state.newAdmin.domainInfo.isError,
  isSuccess: state.newAdmin.domainInfo.isSuccess,
  label: state.auth.name,
  currentAddress: state.auth.address,
  value: state.auth.address,
  validate: true,
  validationChainId: state.auth.network,
  strings: {
    ...ownProps.strings,
    error_message: state.newAdmin.domainInfo.errorMessage,
  },
});

const mapDispatchToProps = dispatch => ({
  handleSubmit: (
    domain, addressToTransfer, sender,
  ) => dispatch(transferDomain(domain, addressToTransfer, sender)),
  handleTransferErrorClose: () => dispatch(handleTransferErrorClose()),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  handleSubmit: addressToTransfer => dispatchProps.handleSubmit(
    stateProps.label,
    addressToTransfer.toLowerCase(),
    stateProps.currentAddress.toLowerCase(),
  ),
  handleErrorClose: () => dispatchProps.handleTransferErrorClose(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(AddressInputComponent);
