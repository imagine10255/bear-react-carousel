import {useState, useCallback, useRef} from 'react';

interface useDraggableClickProps {
    onClick?: () => void,
    onClickAllowTime?: number
}

const useDraggableClick = ({onClick, onClickAllowTime = 150}: useDraggableClickProps) => {
    const lastTouchEnd = useRef(0);
    const [isDragging, setDragging] = useState(false);

    const onMouseDown = useCallback((event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        lastTouchEnd.current = (new Date()).getTime();
        setDragging(false);
    }, []);

    const onMouseUp = useCallback((event: React.MouseEvent<HTMLElement>) => {
        const now = (new Date()).getTime();
        if (onClick && !isDragging && (now - lastTouchEnd.current <= onClickAllowTime)) {
            event.preventDefault();
            onClick();
        }
    }, [onClick, isDragging, onClickAllowTime]);

    const onMouseMove = useCallback(() => {
        setDragging(true);
    }, []);

    return {onMouseDown, onMouseUp, onMouseMove};
};

export default useDraggableClick;
