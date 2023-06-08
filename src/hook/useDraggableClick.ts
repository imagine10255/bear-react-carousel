import { useState, useCallback } from 'react';

interface useDraggableClickProps {
    onClick?: () => void,
    onClickAllowTime?: number
}

const useDraggableClick = ({ onClick, onClickAllowTime = 150 }: useDraggableClickProps) => {
    let lastTouchEnd = 0;
    const [isDragging, setDragging] = useState(false);

    const onMouseDown = useCallback((event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        lastTouchEnd = (new Date()).getTime();
        setDragging(false);
    }, []);

    const onMouseUp = useCallback((event: React.MouseEvent<HTMLElement>) => {
        const now = (new Date()).getTime();
        if (onClick && !isDragging && (now - lastTouchEnd <= onClickAllowTime)) {
            event.preventDefault();
            onClick();
        }
    }, [onClick, isDragging, onClickAllowTime]);

    const onMouseMove = useCallback(() => {
        setDragging(true);
    }, []);

    return { onMouseDown, onMouseUp, onMouseMove };
}

export default useDraggableClick;
