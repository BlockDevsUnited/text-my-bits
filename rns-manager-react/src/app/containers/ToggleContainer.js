import { connect } from 'react-redux';
import { ToggleComponent } from '../components';

const mapStateToProps = (_state, ownProps) => ({
  labelLeft: ownProps.labelLeft,
  labelRight: ownProps.labelRight,
  value: ownProps.value,
});

const mapDispatchToProps = (_dispatch, ownProps) => ({
  onChange: value => ownProps.onChange(value),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ToggleComponent);
