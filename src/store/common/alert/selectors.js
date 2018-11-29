/**
 * Alert type selector
 * @returns {string}
 */
export const getAlertType = (state) => state.alert.alertType;

/**
 * Alert message selector
 * @returns {string}
 */
export const getAlertMessage = (state) => state.alert.message;

/**
 * Alert options selector
 */
export const getAlertOptions = (state) => state.alert.options;
