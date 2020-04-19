import { combineReducers } from 'redux';
import { STR } from './types';
import fieldReducer from '../../factories/reducerFactory';

export default combineReducers({
  str: fieldReducer(STR),
});
