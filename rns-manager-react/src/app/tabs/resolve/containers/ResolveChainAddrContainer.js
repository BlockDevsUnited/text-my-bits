import { connect } from 'react-redux';
import { ResolveChainAddrComponent } from '../components';
import { getSearch, getChainAddr, getResolverAddress } from '../selectors';
import { chainAddr } from '../operations';

const mapStateToProps = state => ({
  name: getSearch(state),
  resolverAddress: getResolverAddress(state),
  chainAddr: getChainAddr(state),
});

const mapDispatchToProps = dispatch => ({
  getChainAddr: (resolverAddress, name, chainId) => {
    dispatch(chainAddr(resolverAddress, name, chainId));
  },
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps.chainAddr,
  getChainAddr: (chainId) => {
    dispatchProps.getChainAddr(stateProps.resolverAddress, stateProps.name, chainId);
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(ResolveChainAddrComponent);
