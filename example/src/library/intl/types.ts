import {MessageFormatElement} from 'intl-messageformat-parser';

export enum ELocales {
    enUS = 'en-US',
    zhTW= 'zh-TW',
    jaJP= 'ja-JP',
    // zhCN = 'zh-CN',
    // thTH = 'th-TH',
    // idID = 'id-ID',
    // viVN = 'vi-VN',
}


export interface II18nTexts {
    [i18nKey: string]: string
}

export type TLocaleSetting = {
    [localeCode in ELocales]: II18nTexts
}


export type TMessage = {
    [code in ELocales]?: Record<string, string> | Record<string, MessageFormatElement[]>;
}
