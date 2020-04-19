import { connect } from 'react-redux';
import { NotificationListComponent } from '../components';
import { viewNotification } from '../actions';

const mapStateToProps = state => ({
  notifications: state.notifications.filter(n => !n.viewed),
});

const mapDispatchToProps = dispatch => ({
  viewNotification: id => dispatch(viewNotification(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NotificationListComponent);
