import {useRef, useState} from 'react';
import BearCarousel, {BearSlideCard, TBearSlideItemDataList, ICarouselState, Controller} from 'bear-react-carousel';
import {baseImage as images} from '@/config/images';

import styled, {createGlobalStyle} from 'styled-components';
import {Flex} from 'bear-react-grid';
import sample from '@/config/sample';
import ScrollView from '@/components/organize/Modal/ScrollView';



// 輪播項目1
const bearSlideItemData1: TBearSlideItemDataList = images.map(row => {
    return {
        key: row.id,
        children: <BearSlideCard>
            <div className="h-100 d-flex"
                style={{fontSize: '40px', backgroundColor: row.color}}
            />
        </BearSlideCard>
    };
});




function Modal() {
    const [carouselState, setCarouselState] = useState<ICarouselState>();
    const [enable, setEnable] = useState<boolean>(true);
    const [count, setCount] = useState<number>(0);
    const [controller, setController] = useState<Controller>();
    const [slidePreview, setSlidePreview] = useState(1);


    // 輪播項目1
    const bearSlideItemData1: TBearSlideItemDataList = images.map(row => {
        return {
            key: row.id,
            children: <BearSlideCard>
                <ScrollView className="d-flex flex-column h-100" style={{fontSize: '40px', height: '200px', backgroundColor: row.color}}>
                    <h2>{sample.title}</h2>
                    <p>
                        {sample.desc}
                        {sample.desc}
                        {sample.desc}
                        {sample.desc}
                        {sample.desc}
                        {sample.desc}
                        {sample.desc}
                        {sample.desc}
                        {sample.desc}
                        {sample.desc}
                        {sample.desc}
                        {sample.desc}
                        {sample.desc}


                    </p>
                </ScrollView>

            </BearSlideCard>
        };
    });

    return <ModalRoot>
        {/*測試依照比例設定容器高度*/}
        <BearCarousel
            // style={{width: '400px'}}
            // setController={setController}
            data={enable ? bearSlideItemData1: undefined}
            onSlideChange={setCarouselState}
            // onSlideChange={setCarouselState}
            slidesPerView={1}
            // slidesPerGroup={2}
            // isCenteredSlides
            // height="200px"
            height="100%"
            // height={{widthRatio: 21, heightRatio: 9}}
            isEnableNavButton
            // isEnablePagination
            isEnableLoop
            // isEnableAutoPlay={false}

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
