import { connect } from 'react-redux';
import { ResolveQRComponent } from '../components';
import { getSearch, getResolverAddress, getName } from '../selectors';
import { name } from '../operations';

const mapStateToProps = state => ({
  name: getSearch(state),
  resolverAddress: getResolverAddress(state),
  nameResolution: getName(state),
});

const mapDispatchToProps = dispatch => ({
  getName: (resolverAddress, address) => dispatch(name(resolverAddress, address)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps.nameResolution,
  getResolution: () => dispatchProps.getName(stateProps.resolverAddress, stateProps.name),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(ResolveQRComponent);
