import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {useSidebar} from '../../../App/SidebarProvider';


/**
 * 自動捲動到最上方
 */
const AutoScrollTop = () => {
    const {pathname} = useLocation();
    const {toggleExpend} = useSidebar();

    useEffect(() => {
        window.scrollTo(0, 0);
        toggleExpend(false);

    }, [pathname]);

    return null;
};

export default AutoScrollTop;
