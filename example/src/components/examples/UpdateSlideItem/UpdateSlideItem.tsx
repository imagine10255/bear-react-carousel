import {useState} from 'react';
import BearCarousel, {
    BearSlideCard,
    TBearSlideItemDataList,
    ICarouselState
} from '@acrool/react-carousel';
import {baseImage} from "../../data";








function UpdateSlideItem() {
    const [carouselState, setCarouselState] = useState<ICarouselState>();
    const [activeId, setActiveId] = useState<string>('1');

    const bearSlideItemData1: TBearSlideItemDataList = baseImage.map(row => {
        console.log('activeId', activeId);
        return <BearSlideCard
            key={row.id}
            bgUrl={row.imageUrl}
            style={{
                // width: '200px',
                // height: '200px',
                border: row.id === activeId ? '5px solid yellow' : undefined
        }}
            onClick={() => setActiveId(row.id)}
        />;
    });


    return <div>
        click card active id: {activeId}
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
            // isSlideItemMemo
            breakpoints={{
                992: {
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                    isCenteredSlides: false,
                }
            }}
        />

    </div>;

}

export default UpdateSlideItem;



