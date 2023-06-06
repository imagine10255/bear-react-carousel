import {useRef, useState} from 'react';
import styled, {keyframes, css} from 'styled-components';
import {media} from 'bear-react-grid';
import BearCarousel, {BearSlideItem, TBearSlideItemDataList, elClassName, IInfo} from 'bear-react-carousel';
import {baseImage as images} from '../config/images';

import {Controller} from 'bear-react-carousel';




// 輪播項目1
const bearSlideItemData1: TBearSlideItemDataList = images.map(row => {
    return {
        key: row.id,
        paginationContent: <>{row.color}</>,
        children: <BearSlideItem as="card">
            <div className="h-100 d-flex"
                style={{fontSize: '40px', backgroundColor: row.color}}
            />
        </BearSlideItem>
    };
});


const autoPlayTime = 4000;


function RenderPagination() {
    const [info, setInfo] = useState<IInfo>();
    const [enable, setEnable] = useState<boolean>(true);
    const [count, setCount] = useState<number>(0);
    const controllerRef = useRef<Controller>(null);
    const [slidePreview, setSlidePreview] = useState(1);

    // console.log('slidePreview', slidePreview);
    return <CarouselBox>
        {/*測試依照比例設定容器高度*/}
        {enable && (
            <BearCarousel
                // controllerRef={controllerRef}
                data={bearSlideItemData1}
                // onChange={setInfo}
                slidesPerView={slidePreview}
                isCenteredSlides={true}
                staticHeight="200px"
                isEnableNavButton
                isEnablePagination
                // isEnableLoop
                isEnableAutoPlay={true}
                moveTime={autoPlayTime}
                renderPagination={(pageTotal: number) => {
                    return images.map(row => {
                        return <>{row.color}</>;
                    });
                }}
                isDebug
            />)}

        <button type="button" onClick={() => setCount(curr => curr += 1)}> count: {count}</button>
        <button type="button" onClick={() => setEnable(curr => !curr)}> enable: {String(enable)}</button>
        <button type="button" onClick={() => {
            if(controllerRef.current){
                controllerRef.current.slideToPage(5);
            }
        }}> slideToPage5 </button>

        <br/>

        <select onChange={event => setSlidePreview(Number(event.target.value))}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
        </select>
        <pre>
            {JSON.stringify(info, null, '\t')}
        </pre>
    </CarouselBox>;

}

export default RenderPagination;




const progress = keyframes`
    from {
        width: 0;
    }

    to {
        width: 100%;
    }
`;

const CarouselBox = styled.div`
    
    // .${elClassName.paginationContent}{
    //    display: none;
    //}

    .${elClassName.paginationGroup}{
        bottom: 0;
    }
    .${elClassName.paginationButton}{
        &:after {
            content: '';
            width: 0;
            height: 4px;
            background-color: greenyellow;
            position: absolute;
            bottom: 0;
            left: 0;
        }

        &[data-active="true"]:after {
            animation: ${progress} ${autoPlayTime}ms linear infinite;
            animation-iteration-count: 1;
        }
    }

    
    

    ${props => css`
       ${media.xl`
            .${elClassName.paginationGroup}{
                left: 0;
                right: 0;
                bottom: -35px;
                background-color: #fff;
                height: 70px;
                width: 70%;
                margin: auto;
                display: flex;
                box-shadow: none;
            }
    
             .${elClassName.paginationButton}{
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100%;
                font-size: 12px;
                font-weight: bold;
                color: #000;
                position: relative;
                flex: 1;
                background: transparent;
                border: solid 1px #ededed;
                border-radius: 0;
                margin: 0;
                padding: 0;
                box-shadow: none;
    
            }
    
            .${elClassName.paginationContent}{
                display: flex;
            }
        `}
    `}   
    
`;

