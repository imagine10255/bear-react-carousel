import {useRef, useState} from 'react';
import BearCarousel, {
    BearSlideCard,
    TBearSlideItemDataList,
    elClassName,
    IInfo,
    BearSlideImage, ICarouselState
} from 'bear-react-carousel';
import {carImages as images} from '@/config/images';




// 輪播項目1
const bearSlideItemData1: TBearSlideItemDataList = images.map(row => {
    return <BearSlideImage imageUrl={row.imageUrl} imageSize="contain" onClick={() => console.log('xxx')}/>;
});




function SlideImage() {
    const [carouselState, setCarouselState] = useState<ICarouselState>();
    const [enable, setEnable] = useState<boolean>(true);
    const [count, setCount] = useState<number>(0);
    const [slidePreview, setSlidePreview] = useState(1);

    return <div style={{width: '500px'}}>
        {/*測試依照比例設定容器高度*/}
        <BearCarousel
            // style={{width: '400px'}}
            // controllerRef={controllerRef}
            data={bearSlideItemData1}
            // onSlideChange={setCarouselState}
            slidesPerView={1}
            spaceBetween={5}
            isCenteredSlides
            // height="200px"
            // height="200px"
            isEnableNavButton
            isEnablePagination
            // isEnableLoop
            // isEnableAutoPlay={false}
            // isDebug
        />


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

export default SlideImage;



