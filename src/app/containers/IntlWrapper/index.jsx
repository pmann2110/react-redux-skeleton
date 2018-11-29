import { isNull, isEqual } from 'lodash';
import moment from 'moment';
import React, { Component } from 'react';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';

import { languageWithoutRegionCode as defaultLocale, messages } from 'i18n';
import { getNewLocale } from 'store/common/language';

class IntlWrapper extends Component {
    render() {
        const {children, locale} = this.props;
        let localeSession = locale;

        if (!locale || isNull(locale) || isEqual(locale, 'null')) {
            localeSession = defaultLocale;
        }

        // Update moment language
        moment.locale(localeSession);

        return (
            <IntlProvider
                locale={localeSession}
                key={localeSession}
                messages={messages[localeSession]}>
                {children}
            </IntlProvider>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        locale: getNewLocale(state)
    };
};

const connectedIntl = connect(mapStateToProps)(IntlWrapper);
export default connectedIntl;
