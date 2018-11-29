import { combineReducers, Reducer, Dispatch } from 'redux';
import { routerReducer } from 'react-router-redux';
import { all } from 'redux-saga/effects';

// Import your state types and reducers here.
// Alert
import alertReducer from './common/alert/reducer';
import alertSaga from './common/alert/sagas';
// Language
import languageReducer from './common/language/reducer';
// Spinner
import spinnerReducer from './common/spinner/reducer';
// Modal
import modalReducer from './common/modal/reducer';

// Whenever an action is dispatched, Redux will update each top-level application state property
// using the reducer with the matching name. It's important that the names match exactly, and that
// the reducer acts on the corresponding ApplicationState property type.
const appReducers = combineReducers({
    router: routerReducer,
    alert: alertReducer,
    language: languageReducer,
    spinner: spinnerReducer,
    modal: modalReducer
});

export const reducers = (state, action) => {
    // if (action.type === AuthActionTypes.LOGGED_OUT) {
    //     state = {};
    // }

    return appReducers(state, action);
};

export function* sagas() {
    yield all([
        alertSaga(),
    ]);
}