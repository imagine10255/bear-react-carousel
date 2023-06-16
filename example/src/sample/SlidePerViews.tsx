import {useRef, useState} from 'react';
import BearCarousel, {
    BearSlideCard,
    TBearSlideItemDataList,
    elClassName,
    IInfo,
    ICarouselState, IBearCarouselProps
} from 'bear-react-carousel';
import {baseImage as images} from '../config/images';

import {Controller} from 'bear-react-carousel';
import controller from '../../../src/manager/Controller';




// 輪播項目1
const bearSlideItemData1: TBearSlideItemDataList = images.map(row => {
    return {
        key: row.id,
        children: <BearSlideCard>
            <div className="h-100 d-flex"
                style={{fontSize: '40px', backgroundColor: row.color}}
            >
                {/*<a href="https://bear-react-carousel.github.io" rel="noreferrer" target="_blank">{row.id}</a>*/}
            </div>
        </BearSlideCard>
    };
});




function SlidePerViews() {
    const [carouselState, setCarouselState] = useState<ICarouselState>();
    const [enable, setEnable] = useState<boolean>(true);
    const [count, setCount] = useState<number>(0);
    const [controller, setController] = useState<Controller>();


    const baseConfig: IBearCarouselProps = {
        data: enable ? bearSlideItemData1: undefined,
        height: "150px",
        isEnableNavButton: true,
        isEnablePagination: true,
        isDebug: true,
    };

    return <div>
        {/*測試依照比例設定容器高度*/}


        <BearCarousel
            data={enable ? bearSlideItemData1: undefined}
            slidesPerView={1}
            // setController={setController}
            // onSlideChange={setCarouselState}
        />

        <BearCarousel
            {...baseConfig}
            slidesPerView={1.2}
            // setController={setController}
            // onSlideChange={setCarouselState}
        />


        <BearCarousel
            {...baseConfig}
            slidesPerView={3}
            isCenteredSlides={true}
            // setController={setController}
            // onSlideChange={setCarouselState}
        />


        <BearCarousel
            {...baseConfig}
            slidesPerView={4}
            // setController={setController}
            // onSlideChange={setCarouselState}
        />



        <BearCarousel
            {...baseConfig}
            slidesPerView={4}
            isEnableLoop
            setController={setController}
            onSlideChange={setCarouselState}
        />



        <button type="button" onClick={() => setCount(curr => curr += 1)}> count: {count}</button>
        <button type="button" onClick={() => setEnable(curr => !curr)}> enable: {String(enable)}</button>


        <div>slideToActualIndex</div>
        {Array.from({length: (carouselState?.actual.total ?? 0)}).map((row, index) => {
            return <button key={`index_${index}`} type="button" onClick={() => controller?.slideToActualIndex(index)}>Index {index} </button>;
        })}

        <div>slideToPage</div>
        {Array.from({length: carouselState?.page.pageTotal ?? 0}).map((row, index) => {
            return <button key={`page_${index}`} type="button" onClick={() => controller?.slideToPage(index + 1)}> Page {index +1} </button>;
        })}


        <br/>
        <pre>
            {JSON.stringify(carouselState, null, '\t')}
        </pre>
    </div>;

}

export default SlidePerViews;



