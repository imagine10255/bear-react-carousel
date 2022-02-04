/*
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `src/resources/lang`)
 */

import React, { Children, useState } from 'react'
import {IntlProvider, IntlContext} from 'react-intl';
import TranslationWrapper from './TranslationWrapper';
import IntlGlobalProvider from '../global';
import {ELocales, TMessage} from '../types';


// Stores

interface IProps extends FCChildrenProps {
    messages: TMessage
}

const LanguageProvider = ({
    messages,
    children
}: IProps) => {
    const [locale, setLocale] = useState<ELocales>(ELocales.enUS);

    const activeMessage = messages[locale];

    return <IntlProvider
      locale={locale}
      key={locale}
      defaultLocale={ELocales.enUS}
      messages={activeMessage}
      // @ts-ignore
      textComponent={TranslationWrapper}
    >
        <IntlGlobalProvider>
            {Children.only(children)}
        </IntlGlobalProvider>
    </IntlProvider>
};

export default LanguageProvider;
