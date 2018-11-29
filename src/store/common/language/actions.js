import { LanguageActionTypes } from './types';
import { AppConstants } from 'common/index';

/**
 * Change locale
 */
export const changeLocale = (locale) => {
    localStorage.setItem(AppConstants.LocaleSessionStorageKey, locale);
    return {
        type: LanguageActionTypes.LANGUAGE_CHANGE,
        payload: {locale}
    };
};

/**
 * Clear current locale
 */
export const clearLocale = () => {
    return {
        type: LanguageActionTypes.LANGUAGE_CLEAR
    };
};
