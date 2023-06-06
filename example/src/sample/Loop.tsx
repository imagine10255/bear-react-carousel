import {useRef, useState} from 'react';
import BearCarousel, {BearSlideCard, TBearSlideItemDataList, elClassName, IInfo} from 'bear-react-carousel';
import {baseImage as images, foodImages} from '../config/images';

import {Controller} from 'bear-react-carousel';




// 輪播項目1
const bearSlideItemData1: TBearSlideItemDataList = foodImages.map(row => {
    return {
        key: row.id,
        children: <BearSlideCard>
            <div className="h-100 d-flex"
                style={{fontSize: '40px', backgroundImage: `url(${row.imageUrl})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}
            >
                {/*<a href="https://carousel.bearests.com" rel="noreferrer" target="_blank">{row.id}</a>*/}
            </div>
        </BearSlideCard>
    };
});




function Loop() {
    const [info, setInfo] = useState<IInfo>();
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
                // onChange={setInfo}
                staticHeight="500px"
                isEnableNavButton
                moveTime={1500}
                isEnablePagination
                isEnableLoop
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
        <pre>
            {JSON.stringify(info, null, '\t')}
        </pre>
    </div>;

}

export default Loop;



