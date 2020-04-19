import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Alert, Badge } from 'react-bootstrap';
import { multilanguage } from 'redux-multilanguage';
import txDisplay from '../selectors';
import { explorer } from '../../adapters/explorerAdapter';

class NotificationComponent extends Component {
  getTxDisplay(params) {
    const { strings } = this.props;
    return txDisplay(strings)(params);
  }

  render() {
    const {
      strings, viewNotification, notification, dismissible,
    } = this.props;

    const display = this.getTxDisplay(notification.params);

    return (
      <Alert variant="light" dismissible={dismissible} onClose={viewNotification}>
        <code>{notification.params.name}</code>
        <Alert.Heading>{display.title}</Alert.Heading>
        <p>
          <Alert.Link href={`${explorer}/tx/${notification.tx}`} target="_blank">{notification.tx}</Alert.Link>
          <br />
          {/* eslint-disable-next-line no-underscore-dangle */}
          {notification.mined ? <Badge variant="success">{strings.Confirmed}</Badge> : <Badge variant="warning">{strings.Waiting_for_confirmation_}</Badge>}
        </p>
        {
          notification.mined && display.description
          && (
          <React.Fragment>
            <hr />
            {display.description}
          </React.Fragment>
          )
        }
        {
          notification.mined && display.action
          && (
          <React.Fragment>
            <hr />
            {display.action}
          </React.Fragment>
          )
        }
        {notification.mined && display.value && display.value}
      </Alert>
    );
  }
}

NotificationComponent.propTypes = {
  strings: propTypes.shape({
    Confirmed: propTypes.string.isRequired,
    Waiting_for_confirmation_: propTypes.string.isRequired,
  }).isRequired,
  viewNotification: propTypes.func.isRequired,
  notification: propTypes.shape({
    params: propTypes.objectOf(propTypes.string.isRequired),
    tx: propTypes.string.isRequired,
    mined: propTypes.bool.isRequired,
  }).isRequired,
  dismissible: propTypes.bool.isRequired,
};

export default multilanguage(NotificationComponent);
