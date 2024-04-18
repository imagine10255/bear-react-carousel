import {useRef, useState} from 'react';
import BearCarousel, {BearSlideCard, TBearSlideItemDataList, ICarouselState, Controller} from 'bear-react-carousel';
import {foodImages} from '@/config/images';
import sample from '@/config/sample';
import {Flex} from 'bear-react-grid';





// 輪播項目1
const bearSlideItemData1: TBearSlideItemDataList = foodImages.map(row => {
    return <BearSlideCard key={row.id}>
        <Flex col="column" className="p-4 gap-2 h-100"
            style={{fontSize: '40px', backgroundImage: `url(${row.imageUrl})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}
        >
            <h2>{sample.title}</h2>
            <p>{sample.desc}</p>
            {/*<a href="https://bear-react-carousel.pages.dev/" rel="noreferrer" target="_blank">{row.id}</a>*/}
        </Flex>
    </BearSlideCard>;
});




function Loop() {
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
                // onSlideChange={setCarouselState}
                height="500px"
                isEnableNavButton
                isEnablePagination
                isEnableLoop
                isDebug
            />)}

        {/*<button type="button" onClick={() => setCount(curr => curr += 1)}> count: {count}</button>*/}
        {/*<button type="button" onClick={() => setEnable(curr => !curr)}> enable: {String(enable)}</button>*/}
        {/*<button type="button" onClick={() => {*/}
        {/*    if(controllerRef.current){*/}
        {/*        controllerRef.current.slideToPage(5);*/}
        {/*    }*/}
        {/*}}> slideToPage5 </button>*/}

        {/*<br/>*/}
        {/*<pre>*/}
        {/*    {JSON.stringify(carouselState, null, '\t')}*/}
        {/*</pre>*/}
    </div>;

}

export default Loop;



