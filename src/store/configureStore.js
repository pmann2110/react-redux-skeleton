import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory } from 'history';
import { createLogger } from 'redux-logger';
import createSagaMiddleware, { END } from 'redux-saga';
import { pick } from 'lodash';

import { reducers } from '.';
import sagas from './sagas';
import { Helpers } from 'common';

const logger = createLogger({
  level: 'info',
  collapsed: true
});

const sagaMiddleware = createSagaMiddleware();
const persistedState = Helpers.loadAppState();
export const storeHistory = createBrowserHistory();

export const configureStore = (
  history = storeHistory,
  initialState = persistedState,
) => {
  const composeEnhancers = composeWithDevTools({});

  const middleware = [
    routerMiddleware(history),
    sagaMiddleware
  ];

  if (DEV) {
    middleware.push(logger);
  }

  const store = createStore(
    reducers,
    initialState,
    composeEnhancers(applyMiddleware(
      ...middleware
    )),
  );

  sagaMiddleware.run(sagas);
  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);

  // Listen store state change and save into storage
  store.subscribe(() => {
    Helpers.saveAppState(pick(store.getState(), ['auth']));
  });

  return store;
};
