import {useRef, useState} from 'react';
import BearCarousel, {
    BearSlideCard,
    TBearSlideItemDataList,
    elClassName,
    IInfo,
    BearSlideImage
} from 'bear-react-carousel';
import {baseImage as images} from '../config/images';

import {Controller} from 'bear-react-carousel';




// 輪播項目1
const bearSlideItemData1: TBearSlideItemDataList = images.map(row => {
    return {
        key: row.id,
        children: <BearSlideImage imageUrl={row.imageUrl}/>
    };
});




function SlideImage() {
    const [info, setInfo] = useState<IInfo>();
    const [enable, setEnable] = useState<boolean>(true);
    const [count, setCount] = useState<number>(0);
    const controllerRef = useRef<Controller>(null);
    const [slidePreview, setSlidePreview] = useState(1);

    return <div>
        {/*測試依照比例設定容器高度*/}
        {enable && (
            <BearCarousel
                // style={{width: '400px'}}
                // controllerRef={controllerRef}
                data={bearSlideItemData1}
                // onChange={setInfo}
                slidesPerView="auto"
                spaceBetween={5}
                isCenteredSlides
                height="200px"
                // height="200px"
                isEnableNavButton
                isEnablePagination
                // isEnableLoop
                // isEnableAutoPlay={false}
                // isDebug
            />)}

        <button type="button" onClick={() => setCount(curr => curr += 1)}> count: {count}</button>
        <button type="button" onClick={() => setEnable(curr => !curr)}> enable: {String(enable)}</button>
        <button type="button" onClick={() => {
            if(controllerRef.current){
                controllerRef.current.slideToPage(5);
            }
        }}> slideToPage5 </button>

        <br/>

        <select onChange={event => setSlidePreview(Number(event.target.value))}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
        </select>
        <pre>
            {JSON.stringify(info, null, '\t')}
        </pre>
    </div>;

}

export default SlideImage;



