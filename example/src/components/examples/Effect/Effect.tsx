import AcroolCarousel, {AcroolSlideCard, IAcroolCarouselProps, TAcroolSlideItemDataList, TMoveEffectFn} from '@acrool/react-carousel';

import {baseImage} from '../../data';


/**
 * Effect
 */
function Effect(props: Pick<IAcroolCarouselProps, 'slidesPerView'>) {


    // 輪播項目1
    const data: TAcroolSlideItemDataList = baseImage.map(row => {
        return <AcroolSlideCard key={row.id} bgUrl={row.imageUrl}/>;
    });


    const customMoveEffectFn: TMoveEffectFn = (percentageInfo) => {
        const transformY = 80;
        return {
            transform: `translate(0px, ${-transformY * (percentageInfo.calcPercentage - 1)}px)`,
            opacity: percentageInfo.calcPercentage,
        };
    };

    return <div>
        <AcroolCarousel
            data={data}
            isCenteredSlides
            height="200px"
            isEnableNavButton
            isEnablePagination
            moveEffect={{
                moveFn: customMoveEffectFn,
            }}
            isDebug
            {...props}
        />

    </div>;

}

export default Effect;



