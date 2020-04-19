import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { StartButtonComponent } from '../components';
import { showModal } from '../actions';
import { start } from '../operations';

const mapStateToProps = state => ({
  address: state.auth.address,
  isOwner: state.auth.isOwner,
  domain: state.auth.name,
});

const mapDispatchToProps = dispatch => ({
  open: () => {
    dispatch(showModal());
    dispatch(start());
  },
  user: () => dispatch(push('/admin')),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  open: dispatchProps.open,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(StartButtonComponent);
