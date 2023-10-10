import {useMemo, useRef, useState} from 'react';
import BearCarousel, {
    BearSlideCard,
    TBearSlideItemDataList,
    elClassName,
    IInfo,
    Controller,
    ICarouselState
} from 'bear-react-carousel';
import {baseImage, baseImage as images, catImages} from '../config/images';








function UpdateSlideItem() {
    const [carouselState, setCarouselState] = useState<ICarouselState>();
    const [enable, setEnable] = useState<boolean>(true);
    const [count, setCount] = useState<number>(0);
    const [activeId, setActiveId] = useState<number>(0);
    const controllerRef = useRef<Controller>(null);


    const data: TBearSlideItemDataList = baseImage.map(row => {
        return {
            key: row.id,
            children: <BearSlideCard onClick={() => setActiveId(row.id)}>
                <div className="h-100 d-flex"
                    style={{fontSize: '40px', backgroundColor: row.color, border: row.id === activeId ? '5px solid #bdbdbd' : undefined}}
                >
                    {/*<a href="https://bear-react-carousel.github.io" rel="noreferrer" target="_blank">{row.id}</a>*/}
                </div>
            </BearSlideCard>
        };
    });

    // 輪播項目1
    const bearSlideItemData1 = useMemo(() => data, [activeId]);

    return <div>
        {/*測試依照比例設定容器高度*/}
        <BearCarousel
            data={bearSlideItemData1}
            onSlideChange={setCarouselState}
            slidesPerView={4}
            isCenteredSlides
            height="200px"
            isEnableNavButton
            isEnablePagination
            // isEnableLoop
            isEnableAutoPlay={false}
            isDebug
            isSlideItemMemo
            breakpoints={{
                992: {
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                    isCenteredSlides: false,
                }
            }}
        />

        <button type="button" onClick={() => setCount(curr => curr += 1)}> count: {count}</button>
        <button type="button" onClick={() => setEnable(curr => !curr)}> enable: {String(enable)}</button>
        <button type="button" onClick={() => setActiveId(1)}> activeId: {String(activeId)}</button>


        <br/>
        <pre>
            {JSON.stringify(carouselState, null, '\t')}
        </pre>
    </div>;

}

export default UpdateSlideItem;



