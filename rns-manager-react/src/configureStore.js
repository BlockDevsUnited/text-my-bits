import { createBrowserHistory } from 'history';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from './app/reducers';

export const history = createBrowserHistory();

const middleware = [thunk, routerMiddleware(history)];


const configureStore = (prelodedState) => {
  const store = createStore(
    rootReducer(history),
    prelodedState,
    applyMiddleware(...middleware),
  );
  return store;
};

export default configureStore;
