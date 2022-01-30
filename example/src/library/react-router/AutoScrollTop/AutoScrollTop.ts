import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';


/**
 * 自動捲動到最上方
 */
const AutoScrollTop = () => {
    const {pathname} = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);

    }, [pathname]);

    return null;
};

export default AutoScrollTop;
