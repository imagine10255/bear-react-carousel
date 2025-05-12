import {generatorArray} from '@acrool/js-utils/array';
import {
    AcroolSlideCard,
    AcroolSlideImage,
    IAcroolSlideCardProps,
    IAcroolSlideImageProps,
    TAcroolSlideItemDataList} from '@acrool/react-carousel';

import {asset} from '../utils';


export const baseImage = generatorArray(6, 'cat').map((key, idx) => {
    return {
        id: key,
        imageUrl: asset(`/images/racing/${idx + 1}.jpg`)
    };
});



export interface IFoodImage {
    id: number
    subTitle: string
    title: string
    desc: string
    imageUrl: string
    position: 'left'|'right'
}
export const foodImages: IFoodImage[] = [
    {
        id: 1,
        subTitle: 'MEAT & SEAFOOD',
        title: 'FROM NORWAY',
        desc: 'We offer huge variety of execeptionally fresh meat farmed in our personal farm',
        imageUrl: asset('/sample/food/01.jpg'),
        position: 'right',
    },
    {
        id: 2,
        subTitle: 'WILD SALMON',
        title: 'CUTTING & DELIVERY',
        desc: 'We offer huge variety of execeptionally fresh meat farmed in our personal farm',
        imageUrl: asset('/sample/food/02.jpg'),
        position: 'right',
    },
    {
        id: 3,
        subTitle: 'CUTTING & DELIVERY',
        title: 'QUALITY MONITORING',
        desc: 'We offer huge variety of execeptionally fresh meat farmed in our personal farm',
        imageUrl: asset('/sample/food/03.jpg'),
        position: 'left',
    },
];





export const acroolSlideItemData1: TAcroolSlideItemDataList = baseImage.map(row => {
    return <AcroolSlideCard key={row.id} bgUrl={row.imageUrl}/>;
});


export const generatorAcroolSlideCardData = (args?: IAcroolSlideCardProps): TAcroolSlideItemDataList => {
    return baseImage.map(row => {
        return <AcroolSlideCard
            {...args}
            key={row.id}
            bgUrl={row.imageUrl}
        />;
    });
};


export const generatorAcroolSlideImageData = (args?: IAcroolSlideImageProps): TAcroolSlideItemDataList => {
    return baseImage.map(row => {
        return <AcroolSlideImage
            {...args}
            key={row.id}
            imageUrl={row.imageUrl}
        />;
    });
};
