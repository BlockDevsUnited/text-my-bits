import React from 'react';
import propTypes from 'prop-types';
import { Loader } from 'rimble-ui';

const UserWaitingComponent = ({ message, visible }) => {
  if (!visible) {
    return (<></>);
  }

  return (
    <div className="row waiting">
      <div className="col-md-6 offset-md-3">
        <Loader color="#008FF7" size="80px" className="loader-center" />
        <p>{message}</p>
      </div>
    </div>
  );
};

UserWaitingComponent.defaultProps = {
  message: '',
  visible: true,
};

UserWaitingComponent.propTypes = {
  message: propTypes.string,
  visible: propTypes.bool,
};

export default UserWaitingComponent;
