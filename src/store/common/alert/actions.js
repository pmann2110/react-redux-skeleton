import { AlertActionTypes } from './types';

/**
 * Show alert error
 */
export const showError =
    (message, options) => {
        return {
            type: AlertActionTypes.ERROR_SHOW,
            payload: { message, options }
        };
    };

/**
 * Show alert info
 */
export const showInfo =
    (message, options) => {
        return {
            type: AlertActionTypes.INFO_SHOW,
            payload: { message, options }
        };
    };

/**
 * Destroy Alert
 */
export const destroyAlert = () => {
    return {
        type: AlertActionTypes.ALERT_DESTROY
    };
};

/**
 * Handle and Standardized error
 */
export const handleError =
    (error) => {
        return {
            type: AlertActionTypes.ERROR_HANDLE,
            payload: error
        };
    };
