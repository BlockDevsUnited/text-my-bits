import React from 'react';
import propTypes from 'prop-types';
import { Container, Alert } from 'react-bootstrap';

import TxNotificationComponent from './TxNotificationComponent';
import { notificationTypes } from '../types';

const NotificationListComponent = ({ notifications, viewNotification }) => (
  <Container>
    {
      notifications.map((n) => {
        if (n.type === notificationTypes.ERROR) {
          return (
            <Alert key={n.id} variant="danger" onClose={() => viewNotification(n.id)} dismissible>
              {n.message}
            </Alert>
          );
        } if (n.type === notificationTypes.TX) {
          return (
            <TxNotificationComponent
              key={n.id}
              notification={n}
              dismissible
              viewNotification={() => viewNotification(n.id)}
            />
          );
        } return null;
      })
    }
  </Container>
);

NotificationListComponent.propTypes = {
  notifications: propTypes.arrayOf(propTypes.shape({
    id: propTypes.number.isRequired,
    message: propTypes.string.isRequired,
  })).isRequired,
  viewNotification: propTypes.func.isRequired,
};

export default NotificationListComponent;
