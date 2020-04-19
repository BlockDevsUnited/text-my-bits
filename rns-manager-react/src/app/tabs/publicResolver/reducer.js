import { combineReducers } from 'redux';
import { ADDR, CONTENT } from './types';
import fieldReducer from '../../factories/reducerFactory';

export default combineReducers({
  addr: fieldReducer(ADDR),
  content: fieldReducer(CONTENT),
});
