import React from 'react';
import styled, {css} from 'styled-components/macro';
import {ELocales} from 'library/intl/types';

const itemHeight = 30;


interface IProps extends FCProps {
    locale: ELocales,
    onSetLocale: (locale: ELocales) => void,
}

/**
 * 語系按鈕
 */
const LocaleButton = ({
    className,
    style,
    locale,
    onSetLocale,
}: IProps) => {
    return <LocaleButtonRoot
        className={className}
        style={style}
        type="button"
        onClick={() => onSetLocale(locale)}
        key={`navbar-localeButton-${locale}`}
    >
        <LocaleIcon src={`/static/images/locales/${locale}.png`}/>
    </LocaleButtonRoot>;
};

export default LocaleButton;


const LocaleButtonRoot = styled.button`
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
