import { connect } from 'react-redux';
import { parse } from 'query-string';
import { multilanguage } from 'redux-multilanguage';
import { FieldComponent } from '../components';
import * as valueTypes from '../types';
import { validateAddress, validatePositiveNumber, validateBytes32 } from '../validations';
import { toChecksumAddress } from '../selectors';
import { publicResolver, multiChainResolver } from '../adapters/configAdapter';

function getResolverName(address, rskResolverText, multiChainResolverText) {
  if (address.toLowerCase() === publicResolver.toLowerCase()) return rskResolverText;
  if (address.toLowerCase() === multiChainResolver.toLowerCase()) return multiChainResolverText;
  return address;
}

const mapStateToProps = (state, ownProps) => {
  const { getField, valueType, strings } = ownProps;
  const {
    getting, value, editOpen, editing,
  } = getField(state);
  const { name, network, address } = state.auth;
  const { action, defaultValue } = parse(state.router.location.search);

  let displayValue = value;

  if (valueType === valueTypes.ADDRESS) {
    displayValue = toChecksumAddress(state)(value);
  } else if (valueType === valueTypes.RESOLVER) {
    displayValue = (
      value
      && getResolverName(value, strings.rsk_resolver, strings.multi_chain_resolver)
    );
  } else if (valueType === valueTypes.POSITIVE_NUMBER) {
    // eslint-disable-next-line radix
    displayValue = value && parseInt(value);
  }

  let validate = () => null;

  if (valueType === valueTypes.ADDRESS || valueType === valueTypes.RESOLVER) {
    validate = addr => validateAddress(addr, network);
  } else if (valueType === valueTypes.POSITIVE_NUMBER) {
    validate = number => validatePositiveNumber(number);
  } else if (valueType === valueTypes.BYTES32) {
    validate = bytes => validateBytes32(bytes);
  } else if (valueType === valueTypes.STRING) {
    validate = () => null;
  }

  const preloadedValue = action === ownProps.fieldName ? defaultValue : '';

  return {
    name,
    getting,
    value: displayValue,
    address,
    editOpen,
    editing,
    validate,
    preloadedValue,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { get, changeEdit, set } = ownProps;

  return {
    get: name => dispatch(get(name)),
    changeEdit: () => dispatch(changeEdit()),
    set: (name, value, address) => dispatch(set(name, value, address)),
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  get: () => dispatchProps.get(stateProps.name),
  set: value => dispatchProps.set(stateProps.name, value, stateProps.address),
});

export default multilanguage(connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(FieldComponent));
