import React from 'react';
import ReactDOM from 'react-dom';

import App from './app/App';
import { configureStore } from 'store/configureStore';
import registerServiceWorker from 'common/register.worker';

// Get the root element from the HTML
const rootEl = document.getElementById('root');

const store = configureStore();

ReactDOM.render(
  <App store={store}/>,
  rootEl
);
registerServiceWorker();
