import {useState} from 'react';
import BearCarousel, {BearSlideCard, TBearSlideItemDataList, ICarouselState, Controller, TOnAnimationEnd} from '@acrool/react-carousel';

import styled, {createGlobalStyle} from 'styled-components';
import {baseImage} from "../../data";


const sample = {
     title: 'Bear React Carousel',
    desc: 'Most modern slider for ReactJS',
}



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
    const bearSlideItemData1: TBearSlideItemDataList = baseImage.map(row => {
        return <BearSlideScrollViewCard key={row.id}>
            <img src={row.imageUrl} alt={row.id}/>
            <h2>{sample.title}</h2>
            {Array.from({length: 80}).map((fill, idx) => {
                return <p key={idx}>{sample.desc}-{idx}</p>;
            })}
        </BearSlideScrollViewCard>;
    });




    return <ModalRoot>
        {/*測試依照比例設定容器高度*/}
        <BearCarousel
            data={enable ? bearSlideItemData1: undefined}
            onSlideChange={setCarouselState}
            onAnimationEnd={handleOnAnimationEnd}
            slidesPerView={1}
            height="500px"

            isEnableNavButton
            isEnableLoop
            movePercentage={.5}
            // isDebug
        />

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
