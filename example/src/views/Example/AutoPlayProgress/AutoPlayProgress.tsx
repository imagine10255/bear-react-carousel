import React, {useState} from 'react';
import styled, {css, keyframes} from 'styled-components/macro';
import BearCarousel, {elClassName, TSlideItemDataList, SlideItem} from 'bear-carousel';
import {Icon} from 'bear-components/atoms';
import {Col, Container, EColType, media, Row} from 'bear-styled-grid';
import {racingImages as images} from 'config/images';

// Components
import Content from '../../_components/Content';


// 輪播項目
const slideItemData: TSlideItemDataList  = images.map(row => {
    return {
        key: row.id,
        paginationContent: <>{row.name}</>,
        children: <SlideItem imageUrl={row.image} className="filter-blur"/>
    };
});
const autoPlayTime = 5000;



/**
 * AutoPlayProgress
 */
const AutoPlayProgress = () => {

    const [isLoadData, setIsLoadData] = useState<boolean>(true);


    return <Content
        title="Auto Play Progress"
        desc="Moved items as to the central position"
        isLoadData={isLoadData}
        onLoadData={setIsLoadData}
    >
        <CarouselBox className="mb-4 mb-lg-5">
            <BearCarousel
                data={isLoadData ? slideItemData: []}
                slidesPerView={1}
                slidesPerGroup={1}
                isEnablePagination
                isEnableNavButton
                isEnableLoop
                autoPlayTime={autoPlayTime}
                isEnableAutoPlay
                aspectRatio={{widthRatio: 16, heightRatio: 9}}
                renderNavButton={(toPrev, toNext) => {
                    return (
                        <div className={elClassName.navGroup}>
                            <button type="button" className={elClassName.navPrevButton} onClick={() => toPrev()}>
                                <Icon code="arrow-right" color="#fff" size={40}/>
                            </button>
                            <button type="button" className={elClassName.navNextButton} onClick={() => toNext()}>
                                <Icon code="arrow-right" color="#fff" size={40}/>
                            </button>
                        </div>
                    );
                }}
                breakpoints={{
                    1200: {
                        aspectRatio: {widthRatio: 32, heightRatio: 9}
                    }
                }}
            />
        </CarouselBox>


    </Content>;
};

export default AutoPlayProgress;




const progress = keyframes`
    from {
        width: 0;
    }

    to {
        width: 100%;
    }
`;


const CarouselBox = styled.div`
    
    .${elClassName.paginationContent}{
        display: none;
    }

    .${elClassName.paginationGroup}{
        bottom: 0;
    }
    .${elClassName.paginationButton}{
        &:after {
            content: '';
            width: 0;
            height: 4px;
            background-color: ${props => props.theme.primaryColor};
            position: absolute;
            bottom: 0;
            left: 0;
        }

        &[data-active=true]:after {
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


