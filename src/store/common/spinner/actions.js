import {
    SpinnerActionTypes
} from './types';

/**
 * Load Spinner
 */
export const loadSpinner = () => {
    return {
        type: SpinnerActionTypes.SPINNER_LOAD
    };
};

/**
 * Hide Spinner
 */
export const hideSpinner = () => {
    return {
        type: SpinnerActionTypes.SPINNER_HIDE
    };
};
