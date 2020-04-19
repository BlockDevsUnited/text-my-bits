import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import ReactGA from 'react-ga';
import configureStore, { history } from './configureStore';
import App from './app';
import * as serviceWorker from './serviceWorker';

import { start } from './app/auth/operations';

import './assets/css/main.css';
import './assets/css/theming.css';
import './assets/css/ReplaceBootstrap.css';
import './assets/css/OverwriteBootstrap.css';
import './assets/css/sass/_index.scss';

const store = configureStore();

if (process.env.NODE_ENV === 'production') {
  ReactGA.initialize('UA-127960783-4');

  history.listen((location) => {
    window.ga('set', 'page', location.pathname + location.search);
    window.ga('send', 'pageview');
  });
}

store.dispatch(start());

render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
