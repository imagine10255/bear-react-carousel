import React, {ReactNode, useCallback, useContext, useEffect, useState} from 'react';
import {enableBodyScroll, disableBodyScroll} from 'bear-jsutils/bodyScroll';
import {TSlidesPerView} from './types';
import CSS from 'csstype';


/**
 * Type
 */
interface IContext {slidesPerView: TSlidesPerView}

/**
 * State
 */
const slidesPerView = 1;

export const StoreContext = React.createContext<IContext>({
    slidesPerView,
});

/**
 * Hook
 */
export const useCarousel = () => useContext(StoreContext);

interface IProps {
    slidesPerView: TSlidesPerView
    children: ReactNode,
}

/**
 * Provider
 * @param slidesPerView
 * @param children
 * @constructor
 */
export const CarouselProvider = ({
    slidesPerView,
    children
}: IProps) => {

    return (
        <StoreContext.Provider value={{slidesPerView}}>
            {children}
        </StoreContext.Provider>
    );
};


