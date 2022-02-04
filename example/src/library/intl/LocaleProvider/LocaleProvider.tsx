/*
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `src/resources/lang`)
 */

import React, { Children, useState } from 'react'
import {IntlProvider} from 'react-intl';
import TranslationWrapper from './TranslationWrapper';
import {ELocales, TMessage} from '../types';
import { LocaleContextProvider } from './context'


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


    return <LocaleContextProvider
      value={{
          locale,
          setLocale,
      }}

    >

        <IntlProvider
              locale={locale}
              key={locale}
              defaultLocale={ELocales.enUS}
              messages={activeMessage}
              // @ts-ignore
              textComponent={TranslationWrapper}
            >
                {Children.only(children)}

                {/*<IntlGlobalProvider>*/}
                {/*</IntlGlobalProvider>*/}
            </IntlProvider>

    </LocaleContextProvider>

};

export default LanguageProvider;
