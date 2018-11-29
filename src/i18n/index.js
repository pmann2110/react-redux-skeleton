import { addLocaleData } from 'react-intl';

/* Locales data */
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';
import es from 'react-intl/locale-data/es';
/* We have to add others lang support manually here */

// Helper library to get query URL language parameter
import * as Helper from 'common/utils/helpers';

addLocaleData([...en, ...fr, ...es]);

import enLocaleData from './en.json';
import frLocaleData from './fr.json';
import esLocaleData from './es.json';

export const messages = {
    en: enLocaleData,
    fr: frLocaleData,
    es: esLocaleData
};

export let locale = (navigator.language ||
    navigator.languages && navigator.languages[0]);

// If query param that get from URL has value ('lang' query parameter) using it\
const langQuery = Helper.getUrlVars();

if (langQuery.lang && messages[langQuery.lang]) {
    locale = langQuery.lang;
}

// Split locales with a region code
export const languageWithoutRegionCode = locale.toLowerCase().split(/[_-]+/)[0];
