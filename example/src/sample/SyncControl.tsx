import {useCallback, useRef, useState} from 'react';
import styled from 'styled-components';
import BearCarousel, {BearSlideItem, TBearSlideItemDataList, elClassName} from 'bear-react-carousel';
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
        children: <BearSlideItem as="card">
            <div className="h-100 d-flex"
                style={{fontSize: '40px', backgroundColor: row.color}}
            >
                {/*<a href="https://carousel.bearests.com" rel="noreferrer" target="_blank">{row.id}</a>*/}
            </div>
        </BearSlideItem>
    };
});

// 輪播項目2
const bearSlideItemData2: TBearSlideItemDataList = images.map(row => {
    return {
        key: row.id,
        children: <BearSlideItem as="card">
            <div className="h-100 d-flex"
                style={{fontSize: '40px', width: '200px', height: '200px', backgroundColor: row.color}}
            >
                {/*<a href="https://carousel.bearests.com" rel="noreferrer" target="_blank">{row.id}</a>*/}
            </div>
        </BearSlideItem>
    };
});

// 輪播項目3
const bearSlideItemData3: TBearSlideItemDataList = images.map(row => {
    return {
        key: row.id,
        children: <BearSlideItem as="card">
            <div className="h-100 d-flex"
                style={{fontSize: '40px', backgroundColor: row.color}}
            >
                <Do/>
                {/*<a href="https://carousel.bearests.com" rel="noreferrer" target="_blank">{row.id}</a>*/}
            </div>
        </BearSlideItem>
    };
});



function SyncControl() {
    const [carousel, setCarousel] = useState<IBearCarouselObj>();
    const [enable, setEnable] = useState<boolean>(true);
    const [count, setCount] = useState<number>(0);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const flexItemRef = useRef<HTMLDivElement>(null);
    const syncControlRefs = useRef<BearCarousel>(null);

    const slideRef = useRef<HTMLInputElement>(null);



    const handleMove = useCallback((activeActualIndex: number, percentage: number) => {
        if(textareaRef.current){
            textareaRef.current.innerHTML = `activeActualIndex: ${activeActualIndex}, percentage: ${percentage}\r\n` + textareaRef.current.innerHTML;
        }
        if(flexItemRef.current){
            flexItemRef.current.style.width = `${percentage * 100 / 7}%`;
            flexItemRef.current.style.transition = 'none';
        }
        if(slideRef.current){
            slideRef.current.value = `${percentage * 100 / 7}`;
        }
    }, []);

    const handleDone = useCallback((activeActualIndex: number) => {
        if(textareaRef.current){
            textareaRef.current.innerHTML = `activeActualIndex: ${activeActualIndex}, percentage: ${activeActualIndex}\r\n` + textareaRef.current.innerHTML;
        }
        if(flexItemRef.current){
            flexItemRef.current.style.width = `${activeActualIndex * 100 / 7}%`;
            flexItemRef.current.style.transition = 'width .3s';
        }
        if(slideRef.current){
            slideRef.current.value = `${activeActualIndex * 100 / 7}`;
        }
        console.log('activeActualIndex', activeActualIndex);
        carousel?.goToPage(activeActualIndex + 1);
    }, [carousel]);

    const handleControl = () => {

    };

    return <div>

        {/*測試同步*/}
        {/*<Box>*/}
        {/*    <BearCarousel*/}
        {/*        ref={syncControlRefs}*/}
        {/*        data={bearSlideItemData2}*/}
        {/*        slidesPerView="auto"*/}
        {/*        isCenteredSlides={true}*/}
        {/*        staticHeight="200px"*/}
        {/*        // spaceBetween={20}*/}
        {/*        isEnableNavButton*/}
        {/*        isEnablePagination*/}
        {/*        // onElementMove={handleMove}*/}
        {/*        // onElementDone={handleDone}*/}
        {/*        isDebug*/}
        {/*    />*/}
        {/*</Box>*/}


        <Box2>
            <BearCarousel
                // syncControlRefs={syncControlRefs}
                data={bearSlideItemData2}
                slidesPerView="auto"
                isCenteredSlides={true}
                staticHeight="200px"
                // spaceBetween={20}
                isEnableNavButton
                isEnablePagination
                // onElementMove={handleMove}
                // onElementDone={handleDone}
                isDebug
            />
        </Box2>



        {/*<textarea cols={30} rows={10} ref={textareaRef} style={{width: '100%'}}/>*/}

        {/*<Flex>*/}
        {/*    <FlexItem ref={flexItemRef}/>*/}
        {/*    <SlideControlInput*/}
        {/*        type="range"*/}
        {/*        min="1"*/}
        {/*        max="100"*/}
        {/*        ref={slideRef}*/}
        {/*    />*/}
        {/*</Flex>*/}

        <button type="button" onClick={() => setCount(curr => curr += 1)}> count: {count}</button>
        <button type="button" onClick={() => setEnable(curr => !curr)}> enable: {String(enable)}</button>
    </div>;

}

export default SyncControl;




const Box = styled.div`
    width: 375px;
  display: flex;
  margin: 0 auto;

  .${elClassName.slideItem}:not([data-active="true"]){
    opacity: .1;
    -webkit-transform: scale3d(0.8, 0.8, 1);
    transform: scale3d(0.8, 0.8, 1);
    -webkit-transition: all 0.3s ease-in-out;
    -moz-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
  }
`;


const Box2 = styled.div`
  display: flex;
  margin: 0 auto;

  .${elClassName.slideItem}:not([data-active="true"]){
    opacity: .1;
    -webkit-transform: scale3d(0.8, 0.8, 1);
    transform: scale3d(0.8, 0.8, 1);
    -webkit-transition: all 0.3s ease-in-out;
    -moz-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
  }
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
