import {useState} from 'react';
import BearCarousel, {BearSlideCard, TBearSlideItemDataList, BearSlideImage, ICarouselState} from 'bear-react-carousel';
import {carImages, baseImage as images} from '@/config/images';
import {Flex} from 'bear-react-grid';
import sample from '@/config/sample';








// 輪播項目2
const bearSlideItemData2: TBearSlideItemDataList = carImages.map(row => {
    return {
        key: row.id,
        children: <BearSlideImage imageUrl={row.imageUrl} onClick={() => console.log('xxx')}/>
    };
});




function AutoCard() {
    const [carouselState, setCarouselState] = useState<ICarouselState>();
    const [enable, setEnable] = useState<boolean>(true);
    const [count, setCount] = useState<number>(0);

    return <div>
        {/*測試依照比例設定容器高度*/}
        {/*<BearCarousel*/}
        {/*    // style={{width: '400px'}}*/}
        {/*    // controllerRef={controllerRef}*/}
        {/*    data={bearSlideItemData1}*/}
        {/*    height="200px"*/}
        {/*    // onSlideChange={setCarouselState}*/}
        {/*    slidesPerView="auto"*/}
        {/*    // isCenteredSlides*/}
        {/*    spaceBetween={5}*/}
        {/*    isEnableNavButton*/}
        {/*    isEnablePagination*/}
        {/*    // isEnableLoop*/}
        {/*    // isEnableAutoPlay={false}*/}
        {/*    isDebug*/}
        {/*/>*/}

        {/*<button type="button" onClick={() => setCount(curr => curr += 1)}> count: {count}</button>*/}
        {/*<button type="button" onClick={() => setEnable(curr => !curr)}> enable: {String(enable)}</button>*/}

        {/*<BearCarousel*/}
        {/*    // style={{width: '400px'}}*/}
        {/*    // controllerRef={controllerRef}*/}
        {/*    data={bearSlideItemData1.slice(0, 3)}*/}
        {/*    // onSlideChange={setCarouselState}*/}
        {/*    slidesPerView="auto"*/}
        {/*    isCenteredSlides*/}
        {/*    spaceBetween={5}*/}
        {/*    isEnableNavButton*/}
        {/*    isEnablePagination*/}
        {/*    // isEnableLoop*/}
        {/*    // isEnableAutoPlay={false}*/}
        {/*    isDebug*/}
        {/*/>*/}


        <BearCarousel
            // style={{width: '400px'}}
            // controllerRef={controllerRef}
            data={bearSlideItemData2.slice(0, 3)}
            // onSlideChange={setCarouselState}
            slidesPerView={3}
            spaceBetween={5}
            isCenteredSlides
            // height="200px"
            // height="200px"
            isEnableNavButton
            isEnablePagination
            // isEnableLoop
            // isEnableAutoPlay={false}
            isDebug
        />

        {/*<pre>*/}
        {/*    {JSON.stringify(carouselState, null, '\t')}*/}
        {/*</pre>*/}
    </div>;

}

export default AutoCard;



