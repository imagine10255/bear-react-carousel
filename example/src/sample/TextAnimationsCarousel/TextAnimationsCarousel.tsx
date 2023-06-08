import React from 'react';
import BearCarousel, {elClassName, TBearSlideItemDataList} from 'bear-react-carousel';
import styled from 'styled-components';
import {foodImages} from '../../config/images';
import TextCard, {AnimationsBox} from './_components/TextCard';
import {asset} from "../../utils";

interface IProps {
    isLoadData: boolean,
}

/**
 * TextCarousel
 */
const TextAnimationsCarousel = () => {

    // 輪播項目
    const slideItemData: TBearSlideItemDataList = foodImages.map(row => {
        return {
            key: row.id,
            children: <TextCard {...row}/>
        };
    });

    return <TextAnimationsRoot>
        <BearCarousel
            data={slideItemData}
            slidesPerView={1}
            height="400px"
            // isEnableAutoPlay
            isEnableLoop
            isEnableNavButton={false}
            // isEnablePagination
            autoPlayTime={5000}
            moveTime={900}
            breakpoints={{
                576: {
                    height: '400px',
                    isEnableNavButton: false,
                },
                996: {
                    height: '500px',
                    isEnableNavButton: true,
                },
                1200: {
                    height: '600px',
                    isEnableNavButton: true,
                }
            }}
        />
    </TextAnimationsRoot>;
};

export default TextAnimationsCarousel;



const TextAnimationsRoot = styled.div`
  --primary-color: #c4a265;

  .${elClassName.slideItem}{
      ${AnimationsBox}{
        transform: translateY(80px);
      }

      &[data-active=true]{
          ${AnimationsBox}{
               transform: translateY(0);
               opacity: 1;
          }
      }
      
      
      &:before{
        content: "";
        background: url('${asset('/sample/food/blackt-will.png')}') center center repeat;
        z-index: 0;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0.5;
      }
  }
  
`;
