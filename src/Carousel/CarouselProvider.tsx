import React, {ReactNode, useContext} from 'react';
import {TSlidesPerView} from './types';


/**
 * Type
 */
interface IState {
    slidesPerView: TSlidesPerView,
    staticHeight?: string,
}

/**
 * State
 */
const state: IState = {
    slidesPerView: 1,
    staticHeight: undefined,
};

export const StoreContext = React.createContext<IState>(state);

/**
 * useContext Hook
 */
export const useCarousel = () => useContext(StoreContext);


interface IProps extends IState{
    children: ReactNode,
}

/**
 * Provider
 * @param slidesPerView
 * @param staticHeight
 * @param children
 * @constructor
 */
export const CarouselProvider = ({
    slidesPerView,
    staticHeight                                 ,
    children
}: IProps) => {

    return (
        <StoreContext.Provider value={{slidesPerView, staticHeight}}>
            {children}
        </StoreContext.Provider>
    );
};


