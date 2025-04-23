import {useRef, useState} from 'react';
import styled from 'styled-components';
import BearCarousel, {BearSlideCard, ICarouselState, TBearSlideItemDataList, moveEffectFn, IInfo} from 'bear-react-carousel';
import {baseImage} from "../../data";




// 輪播項目1
const bearSlideItemData1: TBearSlideItemDataList = baseImage.map(row => {
    return <BearSlideCard bgUrl={row.imageUrl}/>;
});

// 輪播項目2
const bearSlideItemData2: TBearSlideItemDataList = baseImage.map(row => {
    return <BearSlideCard key={row.id} bgUrl={row.imageUrl}/>;
});



const SyncControl = () => {
    const [carouselState, setCarouselState] = useState<ICarouselState>();

    // const [carousel, setCarousel] = useState<IBearCarouselObj>();
    const [enable, setEnable] = useState<boolean>(true);
    const [count, setCount] = useState<number>(0);
    const syncCarouselRef = useRef<BearCarousel>(null);
    const sync2CarouselRef = useRef<BearCarousel>(null);

    const slideRef = useRef<HTMLInputElement>(null);




    return <div>

        {/*測試同步*/}
        <Box>
            <BearCarousel
                ref={syncCarouselRef}
                syncCarouselRefs={[sync2CarouselRef]}

                data={bearSlideItemData2}
                slidesPerView={3}
                isCenteredSlides

                height="200px"
                moveEffect={{
                    moveFn: moveEffectFn.rotate(),
                    moveTime: '300ms',
                }}
                // spaceBetween={20}
                isEnableNavButton
                isEnablePagination
                // onElementMove={handleMove}
                // onElementDone={handleDone}
                isDebug
            />
        </Box>


        <Box2>
            <BearCarousel
                ref={sync2CarouselRef}
                syncCarouselRefs={[syncCarouselRef]}
                onSlideChange={setCarouselState}

                data={bearSlideItemData1}
                slidesPerView={1}
                isCenteredSlides
                height="200px"
                // spaceBetween={20}
                isEnableNavButton
                isEnablePagination
                // onElementMove={handleMove}
                // onElementDone={handleDone}
                isDebug
            />
        </Box2>


        <br/>
        <pre>
            {JSON.stringify(carouselState, null, '\t')}
        </pre>

        <button type="button" onClick={() => setCount(curr => curr += 1)}> count: {count}</button>
        <button type="button" onClick={() => setEnable(curr => !curr)}> enable: {String(enable)}</button>
    </div>;

}

export default SyncControl;



const Box = styled.div`
    width: 400px;
  display: flex;
  margin: 0 auto;
`;

const Box2 = styled.div`
  display: flex;
  margin: 0 auto;
`;
