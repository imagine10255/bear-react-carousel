import React, {ReactNode, useCallback, useEffect, useRef, useState} from 'react';
import CSS from 'csstype';
import elClassName from './el-class-name';

interface IProps {
  className?: string,
  style?: CSS.Properties,
  bgUrl?: string,
  bgSize?: '100%'|'cover',
  isLazy?: boolean,
  preloader?: JSX.Element,
  children?: ReactNode,
  onClick?: () => void,
  onClickAllowTime?: number,
}

const BearSlideCard = ({
    className,
    style,
    bgUrl,
    bgSize,
    isLazy = false,
    preloader = <div>loading...</div>,
    children,
    onClick,
    onClickAllowTime = 150,
}: IProps) => {
    let lastTouchEnd = 0;
    const imageRef = useRef<HTMLImageElement>(null);
    const [isLoading, setLoading] = useState(false);
    const watcher = useRef<IntersectionObserver>();

    useEffect(() => {
        if(isLazy && imageRef.current){
            watcher.current = new window.IntersectionObserver(onEnterView);
            watcher.current.observe(imageRef.current); // 開始監視
        }
    }, [bgUrl, isLazy]);



    const onEnterView: IntersectionObserverCallback = useCallback((entries, observer) => {
        for (let entry of entries) {
            if (entry.isIntersecting) {
                setLoading(true);
                const el = entry.target as HTMLElement;

                const img = new Image();
                img.src = el.dataset.lazySrc;
                img.onload = () => {
                    setLoading(false);
                };

                el.style.backgroundImage = `url(${img.src})`;
                el.removeAttribute('data-lazy-src');
                observer.unobserve(el);
            }
        }
    }, []);


    const onMouseDown = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        lastTouchEnd = (new Date()).getTime();
    };


    const onMouseUp = (event: React.MouseEvent<HTMLElement>) => {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= onClickAllowTime) {
            event.preventDefault();
            if(onClick) onClick();
        }
    };

    return <div
        ref={imageRef}
        className={[className, elClassName.slideItemCard].join(' ').trim()}
        onMouseDown={onMouseDown}
        onClick={onMouseUp}
        data-lazy-src={isLazy ? bgUrl: undefined}
        style={{
            ...style,
            backgroundImage: isLazy ? undefined: `url(${bgUrl})`,
            backgroundSize: bgSize,
        }}
    >
        {isLazy && isLoading ? <div className={elClassName.slideItemImagePreLoad}>
            {preloader}
        </div>: children}
    </div>;

};



export default BearSlideCard;
