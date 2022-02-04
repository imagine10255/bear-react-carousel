/*
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `src/resources/lang`)
 */

import React, {Children, useEffect, useState} from 'react';
import {IntlProvider} from 'react-intl';
import TranslationWrapper from './TranslationWrapper';
import {ELocales, TMessage} from '../types';
import {LocaleContextProvider} from './context';
import {persistKey} from 'config/app';
import {decodeToJson} from 'bear-jsutils/string';


// Stores

interface IProps extends FCChildrenProps {
    messages: TMessage
}

const cacheData = decodeToJson<{locale: ELocales}>(window.localStorage.getItem(persistKey) ?? '');

const LanguageProvider = ({
    messages,
    children
}: IProps) => {
    const [locale, setLocale] = useState<ELocales>(cacheData?.locale ?? ELocales.enUS);

    const activeMessage = messages[locale];

    useEffect(() => {
        // 同步語系到瀏覽器中
        window.localStorage.setItem(persistKey, JSON.stringify({locale}));

    }, [locale]);


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

    </LocaleContextProvider>;

};

export default LanguageProvider;
