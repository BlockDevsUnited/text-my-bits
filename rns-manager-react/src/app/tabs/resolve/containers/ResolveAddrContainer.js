import { connect } from 'react-redux';
import { ResolveQRComponent } from '../components';
import { getSearch, getResolverAddress, getAddr } from '../selectors';
import { addr } from '../operations';

const mapStateToProps = state => ({
  name: getSearch(state),
  resolverAddress: getResolverAddress(state),
  addr: getAddr(state),
});

const mapDispatchToProps = dispatch => ({
  getAddr: (resolverAddress, name) => dispatch(addr(resolverAddress, name)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps.addr,
  getResolution: () => dispatchProps.getAddr(stateProps.resolverAddress, stateProps.name),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(ResolveQRComponent);
