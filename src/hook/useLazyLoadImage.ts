import {useEffect, useState, useRef, useCallback} from 'react';

interface IUseLazyLoadProps {
    isLazy: boolean,
    imageUrl: string,
}

const useLazyLoadBg = ({isLazy, imageUrl}: IUseLazyLoadProps) => {
    const imageRef = useRef<HTMLImageElement>(null);
    const [isLoading, setLoading] = useState(false);
    const watcher = useRef<IntersectionObserver>();

    useEffect(() => {
        if(isLazy && imageRef.current){
            watcher.current = new window.IntersectionObserver(onEnterView);
            watcher.current.observe(imageRef.current); // Start watching
        }
    }, [imageUrl, isLazy]);

    const onEnterView: IntersectionObserverCallback = useCallback((entries, observer) => {
        for (let entry of entries) {
            if (entry.isIntersecting) {
                setLoading(true);
                // 監視目標進入畫面
                const img = entry.target as HTMLImageElement;
                if(img.dataset.lazySrc === ''){
                    img.onload = () => setLoading(false);
                    img.setAttribute('src', img.dataset.lazySrc); // 把值塞回 src
                    img.removeAttribute('data-lazy-src');
                }
                observer.unobserve(img);
            }
        }
    }, []);

    return {imageRef, isLoading};
};

export default useLazyLoadBg;
