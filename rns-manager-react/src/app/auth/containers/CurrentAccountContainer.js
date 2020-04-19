import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { logoutManager, removeDomainToLocalStorage } from '../operations';
import { togglePopUp } from '../actions';

import { CurrentAccountComponent } from '../components';


const mapStateToProps = state => ({
  name: state.auth.name,
});

const mapDispatchToProps = dispatch => ({
  handleLogOut: (domain) => {
    removeDomainToLocalStorage(domain);
    dispatch(logoutManager());
  },
  handleCurrentClick: () => {
    dispatch(togglePopUp(false));
    dispatch(push('/newAdmin'));
  },
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  handleLogOut: () => dispatchProps.handleLogOut(stateProps.name),
  handleCurrentClick: () => dispatchProps.handleCurrentClick(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(CurrentAccountComponent);
