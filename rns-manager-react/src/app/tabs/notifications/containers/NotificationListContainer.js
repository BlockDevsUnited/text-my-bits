import { connect } from 'react-redux';
import { NotificationListComponent } from '../components';
import { notificationTypes } from '../../../notifications';

const mapStateToProps = state => ({
  notifications: state.notifications.filter(n => n.type === notificationTypes.TX),
});

export default connect(mapStateToProps)(NotificationListComponent);
