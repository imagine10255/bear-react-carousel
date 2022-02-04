/**
 * i18n.js
 *
 * This will setup the i18n language files and locale data for your app.
 *
 *   IMPORTANT: This file is used by the internal build
 *   script `extract-intl`, and must use CommonJS module syntax
 *   You CANNOT use import/export in this file.
 */
import {ELocales, II18nTexts, TMessage, TLocaleSetting} from './types';

const localeConfig: TLocaleSetting = {
    [ELocales.enUS]: require('locales/en-US').default,
    [ELocales.zhTW]: require('locales/zh-TW').default,
    // [ELocales.zhCN]: require('locales/zh-CN').default,
    // [ELocales.thTH]: require('locales/th-TH').default,
    // [ELocales.viVN]: require('locales/vi-VN').default,
    // [ELocales.idID]: require('locales/id-ID').default,
};

export const DEFAULT_LOCALE = ELocales.enUS;

const formatTranslationMessages = (locale: ELocales, messages: II18nTexts): II18nTexts => {
    const defaultFormattedMessages = locale !== DEFAULT_LOCALE ? formatTranslationMessages(DEFAULT_LOCALE, localeConfig[DEFAULT_LOCALE]) : {};
    const flattenFormattedMessages = (formattedMessages: TMessage, key: string): TMessage => {
        const formattedMessage = !messages[key] && locale !== DEFAULT_LOCALE ? defaultFormattedMessages[key] : messages[key];
        return Object.assign(formattedMessages, {[key]: formattedMessage});
    };
    return Object.keys(messages).reduce((formattedMessages, key) => flattenFormattedMessages(formattedMessages, key), {});
};

export const translationMessages = {
    [ELocales.enUS]: formatTranslationMessages(ELocales.enUS, localeConfig[ELocales.enUS]),
    [ELocales.zhTW]: formatTranslationMessages(ELocales.zhTW, localeConfig[ELocales.zhTW]),
    // [ELocales.zhCN]: formatTranslationMessages(ELocales.zhCN, localeConfig[ELocales.zhCN]),
    // [ELocales.thTH]: formatTranslationMessages(ELocales.thTH, localeConfig[ELocales.thTH]),
    // [ELocales.viVN]: formatTranslationMessages(ELocales.viVN, localeConfig[ELocales.viVN]),
    // [ELocales.idID]: formatTranslationMessages(ELocales.idID, localeConfig[ELocales.idID]),
};
