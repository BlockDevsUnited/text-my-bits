import { connect } from 'react-redux';
import { parse } from 'query-string';
import { RentalPeriodComponent } from '../components';
import { getCost, getConversionRate } from '../operations';

const mapStateToProps = state => ({
  rifCost: state.registrar.rifCost,
  getting: state.registrar.gettingCost,
  committing: state.registrar.committing,
  committed: state.registrar.committed,
  domain: parse(state.router.location.search).domain || state.auth.name,
  hasBalance: state.registrar.hasBalance,
  gettingConversionRate: state.registrar.gettingConversionRate,
  conversionRate: state.registrar.conversionRate,
});

const mapDispatchToProps = dispatch => ({
  getCost: (domain, duration) => dispatch(getCost(domain, duration)),
  getConversionRate: () => dispatch(getConversionRate()),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  getCost: duration => dispatchProps.getCost(stateProps.domain, duration),
  getConversionRate: () => dispatchProps.getConversionRate(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(RentalPeriodComponent);
