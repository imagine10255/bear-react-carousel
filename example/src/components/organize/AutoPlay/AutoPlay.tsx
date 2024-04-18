import {useRef, useState} from 'react';
import BearCarousel, {BearSlideCard, TBearSlideItemDataList, ICarouselState, Controller} from 'bear-react-carousel';
import {baseImage as images} from '@/config/images';
import {Flex} from 'bear-react-grid';
import sample from '@/config/sample';





// 輪播項目1
const bearSlideItemData1: TBearSlideItemDataList = images.map(row => {
    return <BearSlideCard key={row.id}>
        <Flex col="column" className="p-4 gap-2 h-100"
            style={{fontSize: '40px', backgroundColor: row.color}}
        >
            <h2>{sample.title}</h2>
            <p>{sample.desc}</p>
            {/*<a href="https://bear-react-carousel.pages.dev/" rel="noreferrer" target="_blank">{row.id}</a>*/}
        </Flex>
    </BearSlideCard>;
});




function AutoPlay() {
    const [carouselState, setCarouselState] = useState<ICarouselState>();
    const [controller, setController] = useState<Controller>();

    const [enable, setEnable] = useState<boolean>(true);
    const [count, setCount] = useState<number>(0);
    const controllerRef = useRef<Controller>(null);

    return <div>
        {/*測試依照比例設定容器高度*/}
        {enable && (
            <BearCarousel
                setController={setController}
                data={bearSlideItemData1}
                onSlideChange={setCarouselState}
                isCenteredSlides={true}
                height="200px"
                isEnableNavButton
                isEnablePagination
                isEnableLoop
                isEnableAutoPlay
                autoPlayTime={1500}
                initStartPlayTime={10000}
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

export default AutoPlay;



