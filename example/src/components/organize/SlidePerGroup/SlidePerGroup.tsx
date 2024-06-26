import {useRef, useState} from 'react';
import BearCarousel, {
    BearSlideCard,
    TBearSlideItemDataList,
    elClassName,
    IInfo,
    ICarouselState
} from 'bear-react-carousel';
import {baseImage as images} from '@/config/images';

import {Controller} from 'bear-react-carousel';




// 輪播項目1
const bearSlideItemData1: TBearSlideItemDataList = images.map(row => {
    return <BearSlideCard>
        <div className="h-100 d-flex"
            style={{fontSize: '40px', backgroundColor: row.color}}
        >
            {/*<a href="https://bear-react-carousel.pages.dev/" rel="noreferrer" target="_blank">{row.id}</a>*/}
        </div>
    </BearSlideCard>;
});




function SlidePerGroup() {
    const [carouselState, setCarouselState] = useState<ICarouselState>();
    const [enable, setEnable] = useState<boolean>(true);
    const [count, setCount] = useState<number>(0);

    return <div>
        {/*測試依照比例設定容器高度*/}
        {enable && (
            <BearCarousel
                data={bearSlideItemData1}
                onSlideChange={setCarouselState}

                slidesPerView={3}
                slidesPerGroup={3}
                height="200px"
                isEnableNavButton
                isEnablePagination
                isEnableLoop
                isDebug
            />)}

        {/*<button type="button" onClick={() => setCount(curr => curr += 1)}> count: {count}</button>*/}
        {/*<button type="button" onClick={() => setEnable(curr => !curr)}> enable: {String(enable)}</button>*/}

        {/*<br/>*/}
        {/*<pre>*/}
        {/*    {JSON.stringify(carouselState, null, '\t')}*/}
        {/*</pre>*/}
    </div>;

}

export default SlidePerGroup;



