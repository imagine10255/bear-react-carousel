import {useEffect, useState, useRef, useCallback} from 'react';

interface IUseLazyLoadProps {
    isLazy: boolean,
    imageUrl: string,
}

const useLazyLoadBg = ({isLazy, imageUrl}: IUseLazyLoadProps) => {
    const imageRef = useRef<HTMLDivElement>(null);
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
                const el = entry.target as HTMLDivElement;

                const img = new Image();
                if(el.dataset.lazySrc === ''){
                    img.src = el.dataset.lazySrc;
                    img.onload = () => setLoading(false);

                    el.style.backgroundImage = `url(${img.src})`;
                    el.removeAttribute('data-lazy-src');
                }
                observer.unobserve(el);
            }
        }
    }, []);

    return {imageRef, isLoading};
};

export default useLazyLoadBg;
