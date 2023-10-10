import {useCallback, useRef, useState} from 'react';
import styled from 'styled-components';
import BearCarousel, {BearSlideCard, ICarouselState, TBearSlideItemDataList, moveEffectFn, IInfo} from 'bear-react-carousel';
import {baseImage as images} from '../config/images';



const Do = styled.div`
  background-color: #000;
  width: 20px;
  height: 20px;
  margin: auto;
  border-radius: 99em;


`;


// 輪播項目1
const bearSlideItemData1: TBearSlideItemDataList = images.map(row => {
    return {
        key: row.id,
        children: <BearSlideCard>
            <div className="h-100 d-flex"
                style={{fontSize: '40px', backgroundColor: row.color}}
            >
                {/*<a href="https://bear-react-carousel.github.io" rel="noreferrer" target="_blank">{row.id}</a>*/}
            </div>
        </BearSlideCard>
    };
});

// 輪播項目2
const bearSlideItemData2: TBearSlideItemDataList = images.map(row => {
    return {
        key: row.id,
        children: <BearSlideCard>
            <div className="h-100 d-flex"
                style={{fontSize: '40px', width: '200px', height: '200px', backgroundColor: row.color}}
            >
                {/*<a href="https://bear-react-carousel.github.io" rel="noreferrer" target="_blank">{row.id}</a>*/}
            </div>
        </BearSlideCard>
    };
});



function SyncControl2() {
    const [carouselState, setCarouselState] = useState<ICarouselState>();

    // const [carousel, setCarousel] = useState<IBearCarouselObj>();
    const [enable, setEnable] = useState<boolean>(true);
    const [count, setCount] = useState<number>(0);
    const syncCarouselRef = useRef<BearCarousel>(null);
    const sync2CarouselRef = useRef<BearCarousel>(null);
    const sync3CarouselRef = useRef<BearCarousel>(null);

    const slideRef = useRef<HTMLInputElement>(null);




    return <div>

        {/*測試同步*/}
        <Box>
            <BearCarousel
                ref={syncCarouselRef}
                syncCarouselRefs={[sync2CarouselRef, sync3CarouselRef]}

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

        <Box2>
            <BearCarousel
                ref={sync3CarouselRef}
                // syncCarouselRef={syncCarouselRef}
                // onSlideChange={setCarouselState}

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

export default SyncControl2;




const Box = styled.div`
    width: 400px;
  display: flex;
  margin: 0 auto;

`;


const Box2 = styled.div`
  display: flex;
  margin: 0 auto;

`;


const SlideControlInput = styled.input`
    width: 100%;
`;


const Flex = styled.div`
    display: flex;
    width: 100%;
  background-color: #646cff;
  flex-direction: column;
`;

const FlexItem = styled.div`
  background-color: red;
  height: 20px;
  
  
`;

const FlexChild = styled.div`
  width: 100%;
  background-color: #c77f37;
`;
