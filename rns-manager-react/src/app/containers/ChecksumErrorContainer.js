import { connect } from 'react-redux';
import { ChecksumErrorComponent } from '../components';

const mapStateToProps = (_state, ownProps) => ({
  show: ownProps.show,
  inputValue: ownProps.inputValue,
  handleClick: ownProps.handleClick,
});

export default connect(mapStateToProps, {})(ChecksumErrorComponent);
