import { combineReducers } from 'redux';
import { CONTENT, CHAIN_ADDR } from './types';
import fieldReducer from '../../factories/reducerFactory';

export default combineReducers({
  content: fieldReducer(CONTENT),
  chainAddr: fieldReducer(CHAIN_ADDR),
});
