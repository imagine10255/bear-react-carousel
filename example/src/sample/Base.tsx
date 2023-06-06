import {useRef, useState} from 'react';
import BearCarousel, {BearSlideCard, TBearSlideItemDataList, elClassName, IInfo} from 'bear-react-carousel';
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




function Base() {
    const [info, setInfo] = useState<IInfo>();
    const [enable, setEnable] = useState<boolean>(true);
    const [count, setCount] = useState<number>(0);
    const controllerRef = useRef<Controller>(null);
    const [slidePreview, setSlidePreview] = useState(1);

    console.log('slidePreview', slidePreview);
    return <div>
        {/*測試依照比例設定容器高度*/}
        {enable && (
            <BearCarousel
                style={{width: '400px'}}
                // controllerRef={controllerRef}
                data={bearSlideItemData1}
                // onChange={setInfo}
                slidesPerView={slidePreview}
                isCenteredSlides={true}
                staticHeight="200px"
                isEnableNavButton
                isEnablePagination
                // isEnableLoop
                // isEnableAutoPlay={false}
                // moveTime={400}
                isDebug
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

export default Base;



