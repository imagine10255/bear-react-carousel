import {useRef, useState} from 'react';
import BearCarousel, {BearSlideCard, TBearSlideItemDataList, ICarouselState, Controller, TOnAnimationEnd} from 'bear-react-carousel';
import {baseImage as images} from '@/config/images';

import styled, {createGlobalStyle} from 'styled-components';
import sample from '@/config/sample';





function Modal() {
    const [carouselState, setCarouselState] = useState<ICarouselState>();
    const [enable, setEnable] = useState<boolean>(true);


    const handleOnAnimationEnd: TOnAnimationEnd = (carouselState, elementor) => {
        console.log('stater', carouselState.virtual.prevActiveIndex);

        const preIndex = carouselState.virtual.prevActiveIndex;

        if(elementor._slideItemRefs.current){
            (elementor._slideItemRefs.current[preIndex].firstChild as HTMLElement)?.scrollTo({top: 0});
        }
    };

    // 輪播項目1
    const bearSlideItemData1: TBearSlideItemDataList = images.map(row => {
        return <BearSlideScrollViewCard key={row.id} style={{fontSize: '40px', backgroundColor: row.color}}>
            <h2>{sample.title}</h2>
            {Array.from({length: 80}).map((fill, idx) => {
                return <p key={idx}>{sample.desc}-{idx}</p>;
            })}
        </BearSlideScrollViewCard>;
    });

    return <ModalRoot>
        {/*測試依照比例設定容器高度*/}
        <BearCarousel
            // style={{width: '400px'}}
            // setController={setController}
            data={enable ? bearSlideItemData1: undefined}
            onSlideChange={setCarouselState}
            onAnimationEnd={handleOnAnimationEnd}
            // onSlideChange={setCarouselState}
            slidesPerView={1}
            // slidesPerGroup={2}
            // isCenteredSlides
            height="500px"

            // height={{widthRatio: 21, heightRatio: 9}}
            isEnableNavButton
            // isEnablePagination
            isEnableLoop
            // isEnableAutoPlay={false}

            movePercentage={.5}
            isDebug
        />

        {/*<CustomButton type="button" onClick={() => setCount(curr => curr += 1)}> count: {count}</CustomButton>*/}
        {/*<CustomButton type="button" onClick={() => setEnable(curr => !curr)}> enable: {String(enable)}</CustomButton>*/}

        {/*{Array.from({length: 5}).map((row, index) => {*/}
        {/*    return <CustomButton key={index} type="button" onClick={() => controller?.slideToPage(index + 1)}> slideToPage {index +1} </CustomButton>;*/}
        {/*})}*/}

        {/*<br/>*/}

        {/*<select onChange={event => setSlidePreview(Number(event.target.value))}>*/}
        {/*    <option value={1}>1</option>*/}
        {/*    <option value={2}>2</option>*/}
        {/*    <option value={3}>3</option>*/}
        {/*</select>*/}

        {/*<Pre>*/}
        {/*    {JSON.stringify(carouselState, null, '\t')}*/}
        {/*</Pre>*/}

        <GlobalRoot/>
    </ModalRoot>;

}

export default Modal;


const BearSlideScrollViewCard = styled(BearSlideCard)`
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;

    *{
        -webkit-overflow-scrolling: touch;
    }

    flex: 1 1 0;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
`;


const GlobalRoot = createGlobalStyle`
  body{
      position: fixed;
      left: 0;
      bottom: 0;
      top: 0;
      right: 0;
  }
`;

const CustomButton = styled.button`
    color: #fff;
`;

const Pre = styled.pre`
    color: #fff;
`;


const ModalRoot = styled.div`
    width: 100%;
    //position: fixed;
    //left: 0;
    //bottom: 0;
    //top: 0;
    //right: 0;
    height: 100vh;


    h2 {
        height: 300px;
        background-color: #00a3e0;
    }

    p {
        height: 300px;
        background-color: #2b657a;
    }
`;
