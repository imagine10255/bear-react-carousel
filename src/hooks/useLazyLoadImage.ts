import {useCallback, useEffect, useRef, useState, useTransition} from 'react';

interface IUseLazyLoadProps {
    enabled?: boolean
    imageUrl: string
    delayTime?: number
}


/**
 * 攬加載圖片標籤
 * @param isLazy
 * @param imageUrl
 */
const useLazyLoadImage = ({
    enabled,
    imageUrl,
}: IUseLazyLoadProps) => {
    const imageRef = useRef<HTMLImageElement>(null);
    const watcher = useRef<IntersectionObserver>(null);
    const [isPending, startTransition] = useTransition();
    const [isFetching, setFetching] = useState<boolean>(false);

    useEffect(() => {
        if(enabled && imageRef.current && imageUrl){
            watcher.current = new window.IntersectionObserver(onEnterView);
            watcher.current.observe(imageRef.current); // Start watching
        }
        return () => {
            if (watcher.current) {
                watcher.current.disconnect(); // Cleanup observer on unmount or dependencies change
            }
        };
    }, [imageUrl, enabled]);


    const handleSetFetching = (_isFetching: boolean) => {
        startTransition(() => {
            setFetching(_isFetching);
        });
    };

    const onEnterView: IntersectionObserverCallback = useCallback((entries, observer) => {
        for (let entry of entries) {
            if (entry.isIntersecting) {
                const el = entry.target as HTMLImageElement;
                observer.unobserve(el);
                handleSetFetching(true);

                el.src = imageUrl;
                el.onload = () => {
                    handleSetFetching(false);
                };
                el.onerror = () => {
                    handleSetFetching(false);
                };
            }
        }
    }, [imageUrl]);

    return {
        imageRef,
        isPending,
        isFetching,
    };
};

export default useLazyLoadImage;
