import {useRef, useState} from 'react';
import BearCarousel, {
    BearSlideCard,
    TBearSlideItemDataList,
    elClassName,
    IInfo,
    ICarouselState,
    Controller, moveEffectFn, TMoveEffectFn
} from '@acrool/react-carousel';
import {baseImage} from "../../data";






// 輪播項目1
const bearSlideItemData1: TBearSlideItemDataList = baseImage.map(row => {
            return <BearSlideCard key={row.id} bgUrl={row.imageUrl} style={{width: '200px', height: '200px'}}/>;

});




function Effect2() {
    const [carouselState, setCarouselState] = useState<ICarouselState>();
    const [enable, setEnable] = useState<boolean>(true);
    const [count, setCount] = useState<number>(0);
    const [controller, setController] = useState<Controller>();
    const [slidePreview, setSlidePreview] = useState(1);


    // const handleOnPercentage: IBreakpointSetting['effectFn'] = (el, percentage) => {
    //     el.style.transform = `translate(0px, ${-50 * percentage}px)`;
    //     el.style.transition = 'none';
    // };
    const customMoveEffectFn: TMoveEffectFn = (percentageInfo) => {
        const transformY = 80;
        return {
            transform: `translate(0px, ${-transformY * (percentageInfo.calcPercentage - 1)}px)`,
            opacity: percentageInfo.calcPercentage,
        };
    };


    return <div style={{width: '375px'}}>
        {/*測試依照比例設定容器高度*/}
        <BearCarousel
            // style={{width: '400px'}}
            setController={setController}
            data={enable ? bearSlideItemData1: undefined}
            onSlideChange={setCarouselState}
            // onSlideChange={setCarouselState}
            slidesPerView={1.5}
            isCenteredSlides={true}
            height="200px"
            // height={{widthRatio: 21, heightRatio: 9}}
            isEnableNavButton
            // renderPagination={(pageTotal) => {
            //     return [
            //         <div>sad</div>
            //     ];
            // }}
            isEnablePagination
            // isEnableLoop
            // isEnableAutoPlay={false}
            moveEffect={{
                moveFn: customMoveEffectFn,
                // moveFn: moveEffectFn.transformY(80),
            }}
            // effectFn={handleOnPercentage}

            isDebug
        />

        {/*<button type="button" onClick={() => setCount(curr => curr += 1)}> count: {count}</button>*/}
        {/*<button type="button" onClick={() => setEnable(curr => !curr)}> enable: {String(enable)}</button>*/}

        {/*{Array.from({length: 5}).map((row, index) => {*/}
        {/*    return <button key={index} type="button" onClick={() => controller?.slideToPage(index + 1)}> slideToPage {index +1} </button>;*/}
        {/*})}*/}

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

export default Effect2;



