import { put, takeLatest } from 'redux-saga/effects';

import { AlertActionTypes } from './types';
import { showError } from 'store/common/alert/actions';

/**
 * Handle alert error sage
 */
export function* handleErrorSaga({payload}) {
    const { error, isSilence, options } = payload;
    let standardizedError;
    let errorMessage;

    // Standardize error
    if (typeof error === 'string') {
        standardizedError = new Error(error);
        errorMessage = error;
    } else if (error instanceof Error) {
        standardizedError = error;
        errorMessage = error.message;
    } else if (error.message && error.code) {
        // If error is returned from server
        if (typeof error.message === 'string') {
            standardizedError = new Error(error.message);
            errorMessage = error.message;
        }
    } else if ( error.response && error.response.data) {
        // Try get error message from response
        errorMessage = error.response.data;
    } else if (error.details) {
        errorMessage = '';

        for (const errorItem of error.details) {
            errorMessage = errorMessage ? `${errorMessage}<br/><p>${errorItem.message}</p>`
                : `<p>${errorItem.message}</p>`;
        }
    }

    // TODO logging standardizedError
    if (!standardizedError) {
        standardizedError = new Error('Something wrong happened!');
    }

    // Log error / send stack trace error to remote server
    // Or using Sentry (Raven.js), OverOps for error tracking

    // If this value is false, shouldn't show alert/notification
    if (!isSilence) {
        // We can using modal or toast for notify/alert to end user
        yield put(showError(errorMessage, options));
    }
}

export default function* handleErrorWatcher() {
    yield takeLatest(AlertActionTypes.ERROR_HANDLE, handleErrorSaga);
}
