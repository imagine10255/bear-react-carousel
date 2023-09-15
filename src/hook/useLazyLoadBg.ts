import {useEffect, useState, useRef, useCallback} from 'react';

interface IUseLazyLoadProps {
    isLazy: boolean,
    imageUrl: string,
}

export enum ELoadStatus {
    ready,
    loading,
    done,
    fail,
}

/**
 * 攬加載背景圖片
 *
 * 背景圖片會造成二次加載，因為透過 new Image 加載一次,
 * 成功後再給予 style background image 再次加載
 * 這部分只能透過瀏覽器的緩存來避免第二次
 * @param isLazy
 * @param imageUrl
 */
const useLazyLoadBg = ({isLazy, imageUrl}: IUseLazyLoadProps) => {
    const imageRef = useRef<HTMLDivElement>(null);
    const [status, setStatus] = useState<ELoadStatus>(ELoadStatus.ready);
    const [doneImageUrl, setDoneImageUrl] = useState<string>(undefined);
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
                const el = entry.target as HTMLDivElement;

                const img = new Image();
                if(status === ELoadStatus.ready){
                    setStatus(ELoadStatus.loading);

                    img.src = el.dataset.lazySrc;
                    img.onload = () => setStatus(ELoadStatus.done);
                    img.onerror = () => setStatus(ELoadStatus.fail);
                }
                observer.unobserve(el);
            }
        }
    }, [status]);

    return {imageRef, status, doneImageUrl};
};

export default useLazyLoadBg;
