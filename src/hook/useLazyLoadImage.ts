import {useEffect, useState, useRef, useCallback} from 'react';

interface IUseLazyLoadProps {
    isLazy: boolean,
    imageUrl: string,
}

enum ELoadStatus {
    ready,
    loading,
    done,
    fail,
}

/**
 * 攬加載圖片標籤
 * @param isLazy
 * @param imageUrl
 */
const useLazyLoadImage = ({isLazy, imageUrl}: IUseLazyLoadProps) => {
    const imageRef = useRef<HTMLImageElement>(null);
    const watcher = useRef<IntersectionObserver>();
    const [status, setStatus] = useState<ELoadStatus>(ELoadStatus.ready);

    useEffect(() => {
        if(isLazy && imageRef.current && imageUrl){
            watcher.current = new window.IntersectionObserver(onEnterView);
            watcher.current.observe(imageRef.current); // Start watching
        }
    }, [imageUrl, isLazy]);

    const onEnterView: IntersectionObserverCallback = useCallback((entries, observer) => {
        for (let entry of entries) {
            if (entry.isIntersecting) {
                // 監視目標進入畫面

                const img = entry.target as HTMLImageElement;
                if(status === ELoadStatus.ready){
                    setStatus(ELoadStatus.loading);

                    img.src = imageUrl;
                    img.onload = () => setStatus(ELoadStatus.done);
                    img.onerror = () => setStatus(ELoadStatus.fail);
                }
                observer.unobserve(img);
            }
        }
    }, [status]);

    return {imageRef, status};
};

export default useLazyLoadImage;
