import {
    BearSlideCard,
    BearSlideImage,
    TBearSlideItemDataList,
    IBearSlideImageProps,
    IBearSlideCardProps
} from "bear-react-carousel";
import {asset} from '../utils';
import {generatorArray} from "@acrool/js-utils/array";


export const baseImage = generatorArray(14, 'cat').map((key, idx) => {
   return {
       id: key,
       imageUrl: asset(`/images/sample/${idx + 1}.jpg`)
   };
});



export interface IFoodImage {
    id: number,
    subTitle: string,
    title: string,
    desc: string,
    imageUrl: string,
    position: 'left'|'right',
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





export const bearSlideItemData1: TBearSlideItemDataList = baseImage.map(row => {
    return <BearSlideCard key={row.id} bgUrl={row.imageUrl}/>;
});


export const generatorBearSlideCardData = (args?: IBearSlideCardProps): TBearSlideItemDataList => {
    return baseImage.map(row => {
        return <BearSlideCard
            {...args}
            key={row.id}
            bgUrl={row.imageUrl}
        />;
    });
}


export const generatorBearSlideImageData = (args?: IBearSlideImageProps): TBearSlideItemDataList => {
    return baseImage.map(row => {
        return <BearSlideImage
            {...args}
            key={row.id}
            imageUrl={row.imageUrl}
        />;
    });
}
