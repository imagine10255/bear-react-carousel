import React, {useCallback, useContext, useState} from 'react';


interface IContext {isExpend: boolean, toggleExpend: () => void}

const isExpend = false;

export const StoreContext = React.createContext<IContext>({
    isExpend,
    toggleExpend: () => {}
});

export const useSidebar = () => useContext(StoreContext);


export const SidebarProvider = ({
    children
}: FCChildrenProps) => {
    const [isExpend, setIsExpend] = useState<boolean>(false);

    const toggleExpend = useCallback(() => {
        setIsExpend(prev => !prev);

    }, []);

    return (
        <StoreContext.Provider value={{isExpend, toggleExpend}}>
            {children}
        </StoreContext.Provider>
    );
};


