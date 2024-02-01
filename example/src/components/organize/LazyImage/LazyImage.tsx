import {useState, useEffect} from 'react';
import BearCarousel, {
    TBearSlideItemDataList,
    BearSlideImage, ICarouselState
} from 'bear-react-carousel';
import {carImages as images, ICarImage} from '@/config/images';









function LazyImage() {
    const [data, setData] = useState<ICarImage[]|undefined>(undefined);
    const [carouselState, setCarouselState] = useState<ICarouselState>();
    const [enable, setEnable] = useState<boolean>(true);
    const [count, setCount] = useState<number>(0);
    const [slidePreview, setSlidePreview] = useState(1);


    useEffect(() => {
        setData(images);
    }, []);


    // 輪播項目1
    const bearSlideItemData1: TBearSlideItemDataList|undefined = data?.map(row => {
        return {
            key: row.id,
            children: <BearSlideImage
                imageUrl={row.imageUrl}
                imageSize="cover"
            />
        };
    });



    return <div style={{width: '100%', paddingTop: '0'}}>
        {/*測試依照比例設定容器高度*/}
        {enable && (
            <BearCarousel
                data={bearSlideItemData1}
                slidesPerView={1}
                slidesPerGroup={1}
                isEnablePagination={false}
                isEnableNavButton={false}
                isEnableLoop
                // height="150px"
                spaceBetween={14}
                autoPlayTime={1200}
                isEnableAutoPlay
                // renderLazyPreloader={() => <Loader/>}
                isLazy

                // height="auto"
                // slidesPerView={3}
                // isEnableNavButton={false}
                // isEnablePagination
                // isEnableLoop
                // isLazy
            />)}

        {/*<button type="button" onClick={() => setCount(curr => curr += 1)}> count: {count}</button>*/}
        {/*<button type="button" onClick={() => setEnable(curr => !curr)}> enable: {String(enable)}</button>*/}

        {/*<br/>*/}

        {/*<select onChange={event => setSlidePreview(Number(event.target.value))}>*/}
        {/*    <option value={1}>1</option>*/}
        {/*    <option value={2}>2</option>*/}
        {/*    <option value={3}>3</option>*/}
        {/*</select>*/}
        {/*<pre>*/}
        {/*    {JSON.stringify(carouselState, null, '\t')}*/}
        {/*</pre>*/}
    </div>;

}

export default LazyImage;



