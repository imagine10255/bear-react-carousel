import React, {useState} from 'react';
import styled, {css} from 'styled-components/macro';
import {ELocales} from 'library/intl/types';
import {useLocale} from 'library/intl';

const itemHeight = 30;

/**
 * 語系選擇
 */
const LanguagePicker = () => {
    const {locale: currentLocale, setLocale} = useLocale();
    const [isVisible, setIsVisible] = useState<boolean>(false);


    /**
     * 設定選擇語系
     */
    const handleSetLocale = (locale: ELocales) => {
        setIsVisible(prev => !prev);
        setLocale(locale);
    };


    const renderLocaleButton = (locale: ELocales) => {
        return <LocaleButton
            type="button"
            onClick={() => handleSetLocale(locale)}
            key={`navbar-localeButton-${locale}`}
        >
            <LocaleIcon src={`/static/images/locales/${locale}.png`}/>
        </LocaleButton>;
    };


    return (<LanguagePickerRoot
        isVisible={isVisible}
        length={Object.keys(ELocales).length}>
        <Absolute>
            {(Object.keys(ELocales) as Array<keyof typeof ELocales>)
                .sort((locale) => currentLocale === ELocales[locale] ? -1: 1)
                .map((locale) => {
                    return renderLocaleButton(ELocales[locale]);
                })}
        </Absolute>
    </LanguagePickerRoot>
    );
};

export default LanguagePicker;


const LocaleButton = styled.button`
  padding: 0;
  height: ${itemHeight}px;
  width: ${itemHeight}px;
  border-radius: 99em;
  overflow: hidden;

`;

const LocaleIcon = styled.img`
  height: inherit;
  width: inherit;
  background-color: #fff;
  padding: 2px;
  border-radius: 99em;
  overflow: hidden;
`;

const Absolute = styled.div`
  
  height: ${itemHeight}px;
  width: 100%;

  border-radius: 99em;
  z-index: 4;
  overflow: hidden;
  background-color: #fff;
  transition: height .2s;

`;

const LanguagePickerRoot = styled.div<{
    length: number
    isVisible: boolean
}>`
  width: ${itemHeight}px;
  height: ${itemHeight}px;
  border-radius: 99em;
  position: relative;

  ${props => props.isVisible && css`
    ${Absolute}{
        height: ${(itemHeight * props.length)}px;
    }
  `}
`;
