import AcroolCarousel, {AcroolSlideCard, ICarouselState, TAcroolSlideItemDataList} from '@acrool/react-carousel';
import {defaultGridTheme, FCProps,media} from '@acrool/react-grid';
import {useState} from 'react';
import styled from 'styled-components';

import {data} from './data';
import ServiceCard from './ServiceCard';

interface IProps extends FCProps {
}

/**
 * 服務項目輪播
 * @param className
 * @param data
 * @constructor
 */
const ServiceCarousel = ({
    className,
}: IProps) => {
    const [carouselState, setCarouselState] = useState<ICarouselState|null>(null);


    // 輪播項目
    const acroolSlideItemData: TAcroolSlideItemDataList = data.map((row, index) => {
        const isActive = carouselState?.virtual.activeIndex === index;
        return <AcroolSlideCard className="d-flex align-items-stretch">
            <MyServiceCard
                title={row.title}
                desc={row.desc}
                isActive={isActive}
            />
        </AcroolSlideCard>;
    });

    return <ServiceCarouselRoot className={className}>
        <AcroolCarousel
            data={acroolSlideItemData}
            slidesPerView={1.2}
            isCenteredSlides
            spaceBetween={20}
            slidesPerGroup={1}
            isEnableNavButton={false}
            isEnableLoop={false}
            isEnableAutoPlay={false}
            height="auto"
            breakpoints={{
                [defaultGridTheme.gridBreakpoints.sm]: {
                    slidesPerView: 1.5,
                },
                [defaultGridTheme.gridBreakpoints.md]: {
                    slidesPerView: 1.8,
                },
                [defaultGridTheme.gridBreakpoints.lg]: {
                    isCenteredSlides: false,
                    slidesPerView: 3,
                },
            }}
            onSlideChange={setCarouselState}
        />
    </ServiceCarouselRoot>;
};

export default ServiceCarousel;


const MyServiceCard = styled(ServiceCard)`

`;


const ServiceCarouselRoot = styled.div`
    margin-bottom: 40px;

    ${media.xl`
          margin-bottom: 60px;


          .acrool-react-carousel__slide-item[data-active]:not(:hover){
                .text{
                  color: #fff;
                }
                ${MyServiceCard}{
                  &:before{
                    opacity: 0;
                  }
                 }
          }
          ${MyServiceCard}:hover{
                 .text{
                  color: transparent;
                }
                  &:before{
                    opacity: 1;
                  }
          }


    `}
`;
