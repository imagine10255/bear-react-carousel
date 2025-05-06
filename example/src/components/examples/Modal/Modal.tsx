import AcroolCarousel, {AcroolSlideCard, ICarouselState, TAcroolSlideItemDataList, TOnAnimationEnd} from '@acrool/react-carousel';
import {useState} from 'react';
import styled, {createGlobalStyle} from 'styled-components';

import {baseImage} from '../../data';


const sample = {
    title: 'Acrool React Carousel',
    desc: 'Most modern slider for ReactJS',
};



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
    const acroolSlideItemData1: TAcroolSlideItemDataList = baseImage.map(row => {
        return <AcroolSlideScrollViewCard key={row.id}>
            <img src={row.imageUrl} alt={row.id}/>
            <h2>{sample.title}</h2>
            {Array.from({length: 80}).map((fill, idx) => {
                return <p key={idx}>{sample.desc}-{idx}</p>;
            })}
        </AcroolSlideScrollViewCard>;
    });




    return <ModalRoot>
        {/*測試依照比例設定容器高度*/}
        <AcroolCarousel
            data={enable ? acroolSlideItemData1: undefined}
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


const AcroolSlideScrollViewCard = styled(AcroolSlideCard)`
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
