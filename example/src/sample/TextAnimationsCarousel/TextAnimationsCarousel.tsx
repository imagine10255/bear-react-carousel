import React from 'react';
import BearCarousel, {elClassName, TBearSlideItemDataList} from 'bear-react-carousel';
import styled from 'styled-components';
import {baseImage, foodImages} from '../../config/images';
import TextCard, {AnimationsBox} from './_components/TextCard';
import {asset} from "../../utils";

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

interface IProps {
    isLoadData: boolean,
}

/**
 * TextCarousel
 */
const TextAnimationsCarousel = () => {

    // 輪播項目
    const slideItemData = baseImage.map((row, index) => {
        return <SwiperSlide className="slide-item">
            <div style={{backgroundColor: row.color, height: '250px', color: '#fff', fontSize: '38px', fontWeight: '400',
            display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{index}</div>
        </SwiperSlide>;
        // return {
        //     key: row.id,
        //     children: <TextCard {...row}/>
        // };
    });

    return <TextAnimationsRoot>
        <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            slidesPerView={3}
            loop
            navigation
            scrollbar
            speed={500}
            pagination={{ clickable: true }}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
        >
            {slideItemData}
        </Swiper>

        {/*<BearCarousel*/}
        {/*    data={slideItemData}*/}
        {/*    slidesPerView={1}*/}
        {/*    height="400px"*/}
        {/*    // isEnableAutoPlay*/}
        {/*    isEnableLoop*/}
        {/*    isEnableNavButton={false}*/}
        {/*    isEnablePagination*/}
        {/*    autoPlayTime={5000}*/}
        {/*    moveTime={900}*/}
        {/*    breakpoints={{*/}
        {/*        576: {*/}
        {/*            height: '400px',*/}
        {/*            isEnableNavButton: false,*/}
        {/*        },*/}
        {/*        996: {*/}
        {/*            height: '500px',*/}
        {/*            isEnableNavButton: true,*/}
        {/*        },*/}
        {/*        1200: {*/}
        {/*            height: '600px',*/}
        {/*            isEnableNavButton: true,*/}
        {/*        }*/}
        {/*    }}*/}
        {/*/>*/}
    </TextAnimationsRoot>;
};

export default TextAnimationsCarousel;



const TextAnimationsRoot = styled.div`
  --primary-color: #c4a265;

      // .slide-item{
      //     ${AnimationsBox}{
      //       transform: translateY(80px);
      //     }
      //
      //     &.swiper-slide-active{
      //         ${AnimationsBox}{
      //              transform: translateY(0);
      //              opacity: 1;
      //         }
      //     }
      //    
      //    
      //     &:before{
      //       content: "";
      //       background: url('${asset('/sample/food/blackt-will.png')}') center center repeat;
      //       z-index: 0;
      //       position: absolute;
      //       top: 0;
      //       left: 0;
      //       width: 100%;
      //       height: 100%;
      //       opacity: 0.5;
      //     }
      // }
  
`;
