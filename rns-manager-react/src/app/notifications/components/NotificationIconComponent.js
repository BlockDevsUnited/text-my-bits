import React from 'react';
import propTypes from 'prop-types';
import { Badge } from 'react-bootstrap';
import { multilanguage } from 'redux-multilanguage';

const NotificationIconComponent = ({ strings, notifications }) => (
  <React.Fragment>
    {strings.notifications}
    {' '}
    {notifications > 0 && <Badge variant="warning">{notifications}</Badge>}
    <span className="sr-only">{strings.unread_notifications}</span>
  </React.Fragment>
);

NotificationIconComponent.propTypes = {
  strings: propTypes.shape({
    notifications: propTypes.string.isRequired,
    unread_notifications: propTypes.string.isRequired,
  }).isRequired,
  notifications: propTypes.number.isRequired,
};

export default multilanguage(NotificationIconComponent);
