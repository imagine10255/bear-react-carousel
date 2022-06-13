import React, {useState} from 'react';
import styled, {css, keyframes} from 'styled-components/macro';
import BearCarousel, {elClassName, TBearSlideItemDataList, BearSlideItem} from 'bear-react-carousel';
import {Icon} from 'bear-components/atoms';
import {media} from 'bear-react-grid';
import {foodImages as images} from 'config/images';


// 輪播項目
const bearSlideItemData: TBearSlideItemDataList = images.map(row => {
    return {
        key: row.id,
        paginationContent: <>{row.title}</>,
        children: <BearSlideItem imageUrl={row.imageUrl}/>
    };
});
const autoPlayTime = 5000;



interface IProps {
    isLoadData: boolean,
}

/**
 * TextCarousel
 */
const AutoPlayProgressCarousel = ({
    isLoadData = true
}: IProps) => {


    return <CarouselBox className="mb-4 mb-lg-5">
        <BearCarousel
            data={isLoadData ? bearSlideItemData: []}
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
    </CarouselBox>;
};

export default AutoPlayProgressCarousel;


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

