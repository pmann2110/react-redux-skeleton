/**
 * Get new language selector=
 * @returns {string}
 */
export const getNewLocale = (state) => state.language.newLocale;

/**
 * Check locale switched state
 * @returns {boolean}
 */
export const isSwitchLocale = (state) => state.language.isSwitched;
