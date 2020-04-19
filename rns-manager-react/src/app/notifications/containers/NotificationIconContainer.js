import { connect } from 'react-redux';
import { NotificationIconComponent } from '../components';
import { notificationTypes } from '../types';

const mapStateToProps = state => ({
  notifications: state.notifications.filter(n => (
    !n.viewed && n.type === notificationTypes.TX
  )).length,
});

export default connect(mapStateToProps)(NotificationIconComponent);
