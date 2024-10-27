import BearCarousel, {BearSlideCard, elClassName, ICarouselState, TBearSlideItemDataList} from 'bear-react-carousel';
import {media} from 'bear-react-grid';
import {useState} from 'react';
import styled from 'styled-components';


import ServiceCard from './ServiceCard';
import gridTheme from '@/config/gridTheme';

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

    const data = [
        {title: 'Festive layout design', desc: 'Carefully crafted festive-themed layouts to make your brand stand out during holidays.'},
        {title: 'Brand event design', desc: 'Unique and appealing brand event designs showcasing brand values and charm.'},
        {title: 'Event module design', desc: 'Customized event modules to help you organize and manage various events more effectively.'},
    ];

    // 輪播項目
    const bearSlideItemData: TBearSlideItemDataList|undefined = data?.map((row, index) => {
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
            height="270px"
            breakpoints={{
                [gridTheme.gridBreakpoints.sm]: {
                    slidesPerView: 1.5,
                },
                [gridTheme.gridBreakpoints.md]: {
                    slidesPerView: 1.8,
                },
                [gridTheme.gridBreakpoints.lg]: {
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

    // .${elClassName.slideItem}[data-active]{
    //     .text{
    //       color: transparent;
    //     }
    //
    //     ${MyServiceCard}{
    //       :before{
    //         opacity: 1;
    //       }
    //     }
    // }


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
