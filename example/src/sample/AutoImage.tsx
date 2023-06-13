import {useRef, useState} from 'react';
import BearCarousel, {
    BearSlideCard,
    TBearSlideItemDataList,
    elClassName,
    IInfo,
    BearSlideImage, ICarouselState
} from 'bear-react-carousel';
import {baseImage as images} from '../config/images';






// 輪播項目1
const bearSlideItemData1: TBearSlideItemDataList = images.map(row => {
    return {
        key: row.id,
        children: <BearSlideImage imageUrl={row.imageUrl}/>
    };
});





function AutoImage() {
    const [carouselState, setCarouselState] = useState<ICarouselState>();
    const [enable, setEnable] = useState<boolean>(true);
    const [count, setCount] = useState<number>(0);

    return <div>
        {/*測試依照比例設定容器高度*/}
        {enable && (
            <BearCarousel
                // style={{width: '400px'}}
                // controllerRef={controllerRef}
                data={bearSlideItemData1}
                // onChange={setCarouselState}
                slidesPerView="auto"
                spaceBetween={5}
                isEnableNavButton
                height="400px"
                isEnablePagination
                // isEnableLoop
                // isEnableAutoPlay={false}
                // isDebug
            />)}

        <button type="button" onClick={() => setCount(curr => curr += 1)}> count: {count}</button>
        <button type="button" onClick={() => setEnable(curr => !curr)}> enable: {String(enable)}</button>

        <pre>
            {JSON.stringify(carouselState, null, '\t')}
        </pre>
    </div>;

}

export default AutoImage;



