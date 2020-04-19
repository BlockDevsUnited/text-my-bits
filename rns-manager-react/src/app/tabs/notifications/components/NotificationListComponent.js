import React from 'react';
import propTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import { TxNotificationComponent } from '../../../notifications';

const NotificationListComponent = (props) => {
  const { notifications } = props;

  return (
    <Container>
      {
        notifications.map(n => (
          <TxNotificationComponent key={n.id} notification={n} dismissible={false} />
        ))
      }
    </Container>
  );
};

NotificationListComponent.propTypes = {
  notifications: propTypes.arrayOf(propTypes.shape({
    id: propTypes.number.isRequired,
  }).isRequired).isRequired,
};

export default NotificationListComponent;
