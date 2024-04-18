import {useRef, useState} from 'react';
import BearCarousel, {
    TBearSlideItemDataList,
    ICarouselState,
    Controller,
    BearSlideImage
} from 'bear-react-carousel';
import {carImages} from '@/config/images';
import styled from 'styled-components';






// 輪播項目1
const bearSlideItemData1: TBearSlideItemDataList|undefined = carImages?.map(row => {
    return <BearSlideImage
        key={row.id}
        imageUrl={row.imageUrl}
        imageSize="cover"
    />;
});




function Paginate() {
    const [carouselState, setCarouselState] = useState<ICarouselState>();
    const [controller, setController] = useState<Controller>();

    const [isEnableLoop, setIsEnableLoop] = useState<boolean>(false);
    const [enable, setEnable] = useState<boolean>(true);
    const [count, setCount] = useState<number>(0);
    const controllerRef = useRef<Controller>(null);

    return <div>
        {/*測試依照比例設定容器高度*/}
        <Button type="button" onClick={() => setIsEnableLoop(curr => !curr)}>
            Toggle setIsEnableLoop: {String(isEnableLoop)}
        </Button>
        {enable && (
            <BearCarousel
                setController={setController}
                data={bearSlideItemData1}
                onSlideChange={setCarouselState}
                height="200px"
                slidesPerView={1}
                slidesPerGroup={1}
                isEnableNavButton
                isEnablePagination
                isEnableLoop={isEnableLoop}
                isDebug

                isEnableMouseMove
                spaceBetween={0}
            />)}

        {/*<button type="button" onClick={() => setCount(curr => curr += 1)}> count: {count}</button>*/}
        {/*<button type="button" onClick={() => setEnable(curr => !curr)}> enable: {String(enable)}</button>*/}

        {/*<br/>*/}
        {/*<pre>*/}
        {/*    {JSON.stringify(carouselState, null, '\t')}*/}
        {/*</pre>*/}
    </div>;

}

export default Paginate;


const Button = styled.button`
    color: #fff;
    margin-bottom: 10px;
`;


