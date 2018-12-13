import { isNull, isEqual } from 'lodash';

import { LanguageActionTypes } from './types';
import { AppConstants } from 'common/index';

const localeSession = localStorage.getItem(AppConstants.LocaleSessionStorageKey);
const isValidLocale = localeSession && !isNull(localeSession) && !isEqual(localeSession, 'null');
const locale = isValidLocale ? localeSession : 'en';

export const initialState = {
  newLocale: locale,
  isSwitched: isValidLocale
};

const reducer = (state = initialState, action) => {
  const {payload, type} = action;
  switch (type) {
    case LanguageActionTypes.LANGUAGE_CHANGE:
      return {...state, newLocale: payload.locale, isSwitched: true};
    case LanguageActionTypes.LANGUAGE_CLEAR:
      return {...state, isSwitched: false};
    default:
      return state;
  }
};

export default reducer;
