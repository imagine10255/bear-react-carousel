import React, {useCallback, useContext, useState} from 'react';


/**
 * Type
 */
interface IContext {isExpend: boolean, toggleExpend: (isExpend?: boolean) => void}

/**
 * State
 */
const isExpend = false;

export const StoreContext = React.createContext<IContext>({
    isExpend,
    toggleExpend: () => {}
});

/**
 * Hook
 * @param isExpend
 */
export const useSidebar = (isExpend?: boolean) => useContext(StoreContext);


/**
 * Provider
 * @param children
 * @constructor
 */
export const SidebarProvider = ({
    children
}: FCChildrenProps) => {
    const [isExpend, setIsExpend] = useState<boolean>(false);

    const toggleExpend = useCallback((targetIsExpend) => {
        setIsExpend(prev => {
            if(typeof targetIsExpend !== 'undefined'){
                return targetIsExpend;
            }
            return !prev;
        });
    }, []);

    return (
        <StoreContext.Provider value={{isExpend, toggleExpend}}>
            {children}
        </StoreContext.Provider>
    );
};


