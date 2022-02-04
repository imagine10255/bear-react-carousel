import React, { ReactNode, useCallback, useContext, useState } from 'react'
import { ELocales } from '../library/intl/types'


/** -----------------------------------------
 |               Interface                   |
 /** ---------------------------------------*/
export interface IState {
    locale: ELocales,
    setLocale: (locale: ELocales) => void
}

/** -----------------------------------------
 |            Initial State                 |
 /** ---------------------------------------*/
const state: IState = {
    locale: ELocales.enUS,
    setLocale: () => {}
};

const StoreContext = React.createContext<IState>(state);
StoreContext.displayName = 'LocaleProvider'
const Consumer = StoreContext.Consumer;


/** -----------------------------------------
 |            useContext Hook               |
 /** ---------------------------------------*/
const useLocale = () => useContext(StoreContext);




interface IProps {
    children: ReactNode,
}

/**
 * Provider
 * @param slidesPerView
 * @param children
 * @constructor
 */
const LocaleProvider = ({
    children
}: IProps) => {

    const [locale, setLocale] = useState<ELocales>(ELocales.enUS);

    return (
      <StoreContext.Provider value={{locale, setLocale}}>
          {children}
      </StoreContext.Provider>
    );
};


export default LocaleProvider;
export {
    useLocale,
    Consumer,
}
