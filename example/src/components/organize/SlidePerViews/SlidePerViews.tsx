import {useCallback, useRef, useState} from 'react';
import BearCarousel, {
    BearSlideCard,
    TBearSlideItemDataList,
    elClassName,
    IInfo,
    ICarouselState, IBearCarouselProps,
    Controller
} from 'bear-react-carousel';
import {baseImage as images} from '@/config/images';





// 輪播項目1
const bearSlideItemData1: TBearSlideItemDataList = images.map(row => {
    return {
        key: row.id,
        children: <BearSlideCard>
            <div className="h-100 d-flex"
                style={{fontSize: '40px', backgroundColor: row.color}}
            >
                {/*<a href="https://bear-react-carousel.pages.dev/" rel="noreferrer" target="_blank">{row.id}</a>*/}
            </div>
        </BearSlideCard>
    };
});




function SlidePerViews() {
    const [enable, setEnable] = useState<boolean>(true);
    const [count, setCount] = useState<number>(0);
    const [controller0, setController0] = useState<Controller>();
    const [controller1, setController1] = useState<Controller>();
    const [controller2, setController2] = useState<Controller>();
    const [controller3, setController3] = useState<Controller>();
    const [controller4, setController4] = useState<Controller>();
    const [controller5, setController5] = useState<Controller>();

    const [carouselState0, setCarouselState0] = useState<ICarouselState>();
    const [carouselState1, setCarouselState1] = useState<ICarouselState>();
    const [carouselState2, setCarouselState2] = useState<ICarouselState>();
    const [carouselState3, setCarouselState3] = useState<ICarouselState>();
    const [carouselState4, setCarouselState4] = useState<ICarouselState>();
    const [carouselState5, setCarouselState5] = useState<ICarouselState>();

    const stat = [
        {carouselState: carouselState0, setCarouselState: setCarouselState0, controller: controller0, setController: setController0},
        {carouselState: carouselState1, setCarouselState: setCarouselState1, controller: controller1, setController: setController1},
        {carouselState: carouselState2, setCarouselState: setCarouselState2, controller: controller2, setController: setController2},
        {carouselState: carouselState3, setCarouselState: setCarouselState3, controller: controller3, setController: setController3},
        {carouselState: carouselState4, setCarouselState: setCarouselState4, controller: controller4, setController: setController4},
        {carouselState: carouselState5, setCarouselState: setCarouselState5, controller: controller5, setController: setController5},
    ];


    const baseConfig: Partial<IBearCarouselProps> = {
        data: enable ? bearSlideItemData1: undefined,
        height: '150px',
        isEnableNavButton: true,
        isEnablePagination: true,
        isDebug: true,
    };


    const configList: Partial<IBearCarouselProps>[] = [
        {slidesPerView: 1},
        {slidesPerView: 1.3},
        {slidesPerView: 4},
        {slidesPerView: 4, data: enable ? bearSlideItemData1.slice(0, 2): undefined,},
        {slidesPerView: 4, isEnableLoop: true},
        {slidesPerView: 3, isCenteredSlides: true},
        {slidesPerView: 3, isCenteredSlides: true, isEnableLoop: true},
    ];



    return <div>
        {/*測試依照比例設定容器高度*/}


        {configList.map((config, idx) => {
            return <div className="mb-4" key={`carousel_example_${idx}`}>

                {JSON.stringify(config)}

                <BearCarousel
                    {...baseConfig}
                    {...config}
                    setController={stat[idx]?.setController}
                    onSlideChange={stat[idx]?.setCarouselState}
                />

                <div>slideToSourceIndex</div>
                {Array.from({length: (stat[idx]?.carouselState?.source.total ?? 0)}).map((row, index) => {
                    return <button key={`index_${index}`} type="button" onClick={() => stat[idx]?.controller?.slideToSourceIndex(index)}>Idx {index} </button>;
                })}

                <div>slideToPage</div>
                {Array.from({length: stat[idx]?.carouselState?.page.total ?? 0}).map((row, index) => {
                    return <button key={`page_${index}`} type="button" onClick={() => stat[idx]?.controller?.slideToPage(index + 1)}> Page {index +1} </button>;
                })}


                <pre>
                    {JSON.stringify(stat[idx]?.carouselState, null, '\t')}
                </pre>


            </div>;
        })}

        {/*<button type="button" onClick={() => setCount(curr => curr += 1)}> count: {count}</button>*/}
        {/*<button type="button" onClick={() => setEnable(curr => !curr)}> enable: {String(enable)}</button>*/}







    </div>;

}

export default SlidePerViews;



