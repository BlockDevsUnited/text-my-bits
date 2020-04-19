import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import { LoginDropdownComponent } from '../components';

import { togglePopUp, logOut } from '../actions';
import { authenticate } from '../operations';

const getStoredDomains = (address, current) => {
  if (!localStorage.getItem('storedDomains')) {
    return [];
  }

  const storedDomains = JSON.parse(localStorage.getItem('storedDomains'));
  if (!storedDomains[process.env.REACT_APP_ENVIRONMENT]) {
    return [];
  }

  return storedDomains[process.env.REACT_APP_ENVIRONMENT].filter(
    d => (d.owner === address && d.domain !== current),
  );
};

const mapStateToProps = state => ({
  name: state.auth.name,
  address: state.auth.address,
  isOwner: state.auth.isOwner,
  authError: state.auth.authError,
  showPopUp: state.auth.showPopUp,
  previousDomains: getStoredDomains(state.auth.address, state.auth.name),
});

const mapDispatchToProps = dispatch => ({
  handleLogin: (domain, address) => {
    dispatch(push('/newAdmin'));
    dispatch(logOut());
    dispatch(authenticate(domain, address, true));
  },
  toggleShowPopUp: newState => dispatch(togglePopUp(newState)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  handleLogin: domain => dispatchProps.handleLogin(domain, stateProps.address),
  handleLogOut: () => dispatchProps.handleLogOut(stateProps.name),
  toggleShowPopUp: () => dispatchProps.toggleShowPopUp(!stateProps.showPopUp),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(LoginDropdownComponent);
