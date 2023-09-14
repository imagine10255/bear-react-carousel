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





// 輪播項目1
const bearSlideItemData1: TBearSlideItemDataList = images.map(row => {
    return {
        key: row.id,
        children: <BearSlideCard>
            <div className="h-100 d-flex"
                style={{fontSize: '40px', backgroundColor: row.color}}
            />
        </BearSlideCard>
    };
});


// 輪播項目1
const bearSlideItemData2: TBearSlideItemDataList = images.map(row => {
    return {
        key: row.id,
        children: <BearSlideCard>
            <div className="h-100 d-flex"
                style={{fontSize: '40px', width: '200px', backgroundColor: row.color}}
            />
        </BearSlideCard>
    };
});


// 共用輪播設定
const carouselConfig: IBearCarouselProps = {
    slidesPerView: 4,
    slidesPerGroup: 1,
    isEnableMouseMove: true,
    isEnableNavButton: true,
    height: '96px',
    isEnableLoop: false,
};


function CustomNav() {
    const [carouselState, setCarouselState] = useState<ICarouselState>();
    const [enable, setEnable] = useState<boolean>(true);
    const [count, setCount] = useState<number>(0);
    const [controller, setController] = useState<Controller>();
    const [slidePreview, setSlidePreview] = useState(1);


    
    return <div>
        {/*測試依照比例設定容器高度*/}
        <BearCarousel
            // style={{width: '400px'}}
            setController={setController}
            data={enable ? bearSlideItemData1: undefined}
            onSlideChange={setCarouselState}
            // onSlideChange={setCarouselState}
            slidesPerView={1}
            // isCenteredSlides={true}
            height="200px"
            // height={{widthRatio: 21, heightRatio: 9}}
            isEnableNavButton
            isEnablePagination
            // isEnableLoop
            renderNavButton={(toPrev, toNext) => {
                return <div className={elClassName.navGroup}>
                    <button type="button" className={elClassName.navPrevButton} onClick={toPrev}>
                        {'く'}
                    </button>
                    <button type="button" className={elClassName.navNextButton} onClick={toNext}>
                        {'く'}
                    </button>
                </div>;
            }}
            // isEnableAutoPlay={false}

            isDebug
        />

        <button type="button" onClick={() => setCount(curr => curr += 1)}> count: {count}</button>
        <button type="button" onClick={() => setEnable(curr => !curr)}> enable: {String(enable)}</button>


        <BearCarousel
            {...carouselConfig}
            // style={{width: '400px'}}
            setController={setController}
            data={enable ? bearSlideItemData2: undefined}
            onSlideChange={setCarouselState}
            // onSlideChange={setCarouselState}
            // slidesPerView="auto"
            // // isCenteredSlides={true}
            // height="200px"
            // // height={{widthRatio: 21, heightRatio: 9}}
            // isEnableNavButton
            // isEnablePagination
            // isEnableLoop
            renderNavButton={(toPrev, toNext) => {
                return <div className={elClassName.navGroup}>
                    <button type="button" className={elClassName.navPrevButton} onClick={toPrev}>
                        {'く'}
                    </button>
                    <button type="button" className={elClassName.navNextButton} onClick={toNext}>
                        {'く'}
                    </button>
                </div>;
            }}
            // isEnableAutoPlay={false}

            isDebug
        />

        {bearSlideItemData2.map((row, index) => {
            return <button key={index} type="button" onClick={() => controller?.slideToSourceIndex(index + 1)}> slideToPage {index +1} </button>;
        })}

        <br/>

        <select onChange={event => setSlidePreview(Number(event.target.value))}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
        </select>

        <pre>
            {JSON.stringify(carouselState, null, '\t')}
        </pre>
    </div>;

}

export default CustomNav;



