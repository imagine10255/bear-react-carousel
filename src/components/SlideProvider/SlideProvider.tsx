import {createContext,ReactNode, useContext} from 'react';

import {TRenderLazyPreloader} from '../../types';

interface IProps extends IState{
    children: ReactNode
}



/** -----------------------------------------
 |               Interface                   |
 /** ---------------------------------------*/
interface IState {
    isLazy?: boolean
    renderLazyPreloader: TRenderLazyPreloader
}

/** -----------------------------------------
 |            Initial State                 |
 /** ---------------------------------------*/
export const SlideContext = createContext<IState>({
    isLazy: false,
    renderLazyPreloader: () => <div>loading...</div>,
});


/** -----------------------------------------
 |            useContext Hook               |
 /** ---------------------------------------*/
export const useSlide = () => useContext(SlideContext);



interface IProps extends IState{
    children: ReactNode
}

/**
 * Provider
 */
export const SlideProvider = (props: IProps) => {
    const {children, ...otherProps} = props;

    return (
        <SlideContext.Provider value={otherProps}>
            {children}
        </SlideContext.Provider>
    );
};

