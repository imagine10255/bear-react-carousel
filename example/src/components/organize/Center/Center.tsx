import {useRef, useState} from 'react';
import BearCarousel, {
    BearSlideCard,
    TBearSlideItemDataList,
    ICarouselState,
    Controller
} from 'bear-react-carousel';
import {baseImage as images} from '@/config/images';




// 輪播項目1
const bearSlideItemData1: TBearSlideItemDataList = images.map(row => {
    return <BearSlideCard key={row.id}>
        <div className="h-100 d-flex"
            style={{fontSize: '40px', backgroundColor: row.color}}
        >
            {/*<a href="https://bear-react-carousel.pages.dev/" rel="noreferrer" target="_blank">{row.id}</a>*/}
        </div>
    </BearSlideCard>;
});




function Center() {
    const [carouselState, setCarouselState] = useState<ICarouselState>();
    const [enable, setEnable] = useState<boolean>(true);
    const [count, setCount] = useState<number>(0);
    const controllerRef = useRef<Controller>(null);

    return <div>
        {/*測試依照比例設定容器高度*/}
        {enable && (
            <BearCarousel
                // style={{width: '400px'}}
                // controllerRef={controllerRef}
                data={bearSlideItemData1}
                slidesPerView={3}
                // onSlideChange={setCarouselState}
                height="200px"
                isEnableNavButton
                isEnablePagination
                isCenteredSlides
                isDebug
            />
        )}


        {/*<button type="button" onClick={() => setCount(curr => curr += 1)}> count: {count}</button>*/}
        {/*<button type="button" onClick={() => setEnable(curr => !curr)}> enable: {String(enable)}</button>*/}


        {/*<br/>*/}
        {/*<pre>*/}
        {/*    {JSON.stringify(carouselState, null, '\t')}*/}
        {/*</pre>*/}
    </div>;

}

export default Center;



