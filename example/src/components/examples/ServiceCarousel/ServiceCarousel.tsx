import BearCarousel, {BearSlideCard, elClassName, ICarouselState, TBearSlideItemDataList} from 'bear-react-carousel';
import {media, defaultGridTheme, FCProps} from '@acrool/react-grid';
import {useState} from 'react';
import styled from 'styled-components';


import ServiceCard from './ServiceCard';
import {data} from "./data";

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
    const bearSlideItemData: TBearSlideItemDataList = data.map((row, index) => {
        const isActive = carouselState?.virtual.activeIndex === index;
        return <BearSlideCard className="d-flex align-items-stretch">
            <MyServiceCard
                title={row.title}
                desc={row.desc}
                isActive={isActive}
            />
        </BearSlideCard>;
    });

    return <ServiceCarouselRoot className={className}>
        <BearCarousel
            data={bearSlideItemData}
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


          .${elClassName.slideItem}[data-active]:not(:hover){
                .text{
                  color: #fff;
                }
                ${MyServiceCard}{
                  :before{
                    opacity: 0;
                  }
                 }
          }
          ${MyServiceCard}:hover{
                 .text{
                  color: transparent;
                }
                  :before{
                    opacity: 1;
                  }
          }


    `}
`;
