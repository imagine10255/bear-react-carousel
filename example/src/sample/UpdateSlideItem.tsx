import {useRef, useState} from 'react';
import BearCarousel, {BearSlideItem, TBearSlideItemDataList, elClassName, IInfo} from 'bear-react-carousel';
import {baseImage, baseImage as images, catImages} from '../config/images';

import {Controller} from 'bear-react-carousel';







function UpdateSlideItem() {
    const [info, setInfo] = useState<IInfo>();
    const [enable, setEnable] = useState<boolean>(true);
    const [count, setCount] = useState<number>(0);
    const [activeId, setActiveId] = useState<number>(0);
    const controllerRef = useRef<Controller>(null);



    // 輪播項目1
    const bearSlideItemData1: TBearSlideItemDataList = baseImage.map(row => {
        return {
            key: `${row.id}_${activeId}`,
            children: <BearSlideItem as="card">
                <div className="h-100 d-flex"
                     style={{fontSize: '40px', backgroundColor: row.color, border: row.id === activeId ? '5px solid #bdbdbd': undefined}}
                     onClick={() => setActiveId(row.id)}
                >
                    {/*<a href="https://carousel.bearests.com" rel="noreferrer" target="_blank">{row.id}</a>*/}
                </div>
            </BearSlideItem>
        };
    });

    return <div>
        {/*測試依照比例設定容器高度*/}
        {enable && (
            <BearCarousel
                controllerRef={controllerRef}
                data={bearSlideItemData1}
                onChange={setInfo}

                slidesPerView={5}
                isCenteredSlides
                staticHeight="200px"
                isEnableNavButton
                isEnablePagination
                isEnableLoop
                isEnableAutoPlay={false}
                moveTime={400}
                isDebug
            />)}

        <button type="button" onClick={() => setCount(curr => curr += 1)}> count: {count}</button>
        <button type="button" onClick={() => setEnable(curr => !curr)}> enable: {String(enable)}</button>
        <button type="button" onClick={() => setActiveId(1)}> activeId: {String(activeId)}</button>
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

export default UpdateSlideItem;



