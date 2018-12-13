import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// Import your state types and reducers here.
// Language
import languageReducer from './common/language/reducer';
// Spinner
import spinnerReducer from '../app/views/containers/Spinner/reducer';
// Whenever an action is dispatched, Redux will update each top-level application state property
// using the reducer with the matching name. It's important that the names match exactly, and that
// the reducer acts on the corresponding ApplicationState property type.
const appReducers = combineReducers({
  router: routerReducer,
  language: languageReducer,
  spinner: spinnerReducer
});

export const reducers = (state, action) => {
  // if (action.type === AuthActionTypes.LOGGED_OUT) {
  //     state = {};
  // }

  return appReducers(state, action);
};
