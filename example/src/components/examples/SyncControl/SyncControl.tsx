import {useRef, useState} from 'react';
import styled from 'styled-components';
import AcroolCarousel, {AcroolSlideCard, ICarouselState, TAcroolSlideItemDataList, moveEffectFn, IInfo} from '@acrool/react-carousel';
import {baseImage} from "../../data";




// 輪播項目1
const acroolSlideItemData1: TAcroolSlideItemDataList = baseImage.map(row => {
    return <AcroolSlideCard bgUrl={row.imageUrl}/>;
});

// 輪播項目2
const acroolSlideItemData2: TAcroolSlideItemDataList = baseImage.map(row => {
    return <AcroolSlideCard key={row.id} bgUrl={row.imageUrl}/>;
});



const SyncControl = () => {
    const [carouselState, setCarouselState] = useState<ICarouselState>();

    // const [carousel, setCarousel] = useState<IAcroolCarouselObj>();
    const [enable, setEnable] = useState<boolean>(true);
    const [count, setCount] = useState<number>(0);
    const syncCarouselRef = useRef<AcroolCarousel>(null);
    const sync2CarouselRef = useRef<AcroolCarousel>(null);

    const slideRef = useRef<HTMLInputElement>(null);




    return <div>

        {/*測試同步*/}
        <Box>
            <AcroolCarousel
                ref={syncCarouselRef}
                syncCarouselRefs={[sync2CarouselRef]}

                data={acroolSlideItemData2}
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
            <AcroolCarousel
                ref={sync2CarouselRef}
                syncCarouselRefs={[syncCarouselRef]}
                onSlideChange={setCarouselState}

                data={acroolSlideItemData1}
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
