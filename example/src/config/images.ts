import {asset} from './utils';


export const racingImages = [
    {id: 1, name: 'Strawberry', imageUrl: asset('/sample/food/01.jpg')},
    {id: 2, name: 'Honey Cranberry Pie', imageUrl: asset('/sample/food/02.jpg')},
    {id: 3, name: 'Tomato noodles', imageUrl: asset('/sample/food/03.jpg')},
];




export const productImages = [
    {id: 1, name: 'product1', imageUrl: asset('/sample/product/01.jpg')},
    {id: 2, name: 'product2', imageUrl: asset('/sample/product/02.jpg')},
    {id: 3, name: 'product3', imageUrl: asset('/sample/product/01.jpg')},
    {id: 4, name: 'product4', imageUrl: asset('/sample/product/02.jpg')},
    {id: 5, name: 'product5', imageUrl: asset('/sample/product/01.jpg')},
    {id: 6, name: 'product6', imageUrl: asset('/sample/product/02.jpg')},
    {id: 7, name: 'product7', imageUrl: asset('/sample/product/01.jpg')},
    {id: 8, name: 'product8', imageUrl: asset('/sample/product/02.jpg')},
    {id: 9, name: 'product9', imageUrl: asset('/sample/product/01.jpg')},
    {id: 10, name: 'product10', imageUrl: asset('/sample/product/02.jpg')},
];



export const catImages = [
    {id: 1, name: 'cat1', imageUrl: asset('/sample/cat/01.jpg')},
    {id: 2, name: 'cat2', imageUrl: asset('/sample/cat/02.jpg')},
    {id: 3, name: 'cat3', imageUrl: asset('/sample/cat/03.jpg')},
    {id: 4, name: 'cat4', imageUrl: asset('/sample/cat/04.jpg')},
    {id: 5, name: 'cat5', imageUrl: asset('/sample/cat/05.jpg')},
];


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


export const diffImages = [
    {id: 1, name: 'cat1', imageUrl: asset('/sample/cat/vertical-01.jpg')},
    {id: 2, name: 'cat2', imageUrl: asset('/sample/cat/01.jpg')},
    {id: 3, name: 'cat3', imageUrl: asset('/sample/cat/02.jpg')},
    {id: 4, name: 'cat4', imageUrl: asset('/sample/cat/vertical-02.jpg')},
    {id: 5, name: 'cat5', imageUrl: asset('/sample/cat/03.jpg')},
    {id: 6, name: 'cat6', imageUrl: asset('/sample/cat/vertical-03.jpg')},
    {id: 7, name: 'cat7', imageUrl: asset('/sample/cat/04.jpg')},
    {id: 8, name: 'cat8', imageUrl: asset('/sample/cat/vertical-04.jpg')},
    {id: 9, name: 'cat9', imageUrl: asset('/sample/cat/05.jpg')},
];


