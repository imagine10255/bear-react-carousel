import {asset} from '../utils';


export const racingImages = [
    {id: 1, name: 'Strawberry', imageUrl: asset('/sample/food/01.jpg')},
    {id: 2, name: 'Honey Cranberry Pie', imageUrl: asset('/sample/food/02.jpg')},
    {id: 3, name: 'Tomato noodles', imageUrl: asset('/sample/food/03.jpg')},
];




export const baseImage = [
    {id: 1, color: 'red', imageUrl: asset('/sample/cat/01.jpg')},
    {id: 2, color: 'green',imageUrl: asset('/sample/cat/02.jpg')},
    {id: 3, color: 'blue',imageUrl: asset('/sample/cat/03.jpg')},
    {id: 4, color: 'gray',imageUrl: asset('/sample/cat/04.jpg')},
    // {id: 5, color: 'white',imageUrl: asset('/sample/cat/05.jpg')},
    // {id: 6, color: 'black',imageUrl: asset('/sample/cat/06.jpg')},
    // {id: 7, color: 'yellow',imageUrl: asset('/sample/cat/07.jpg')},
    // {id: 8, color: 'purple',imageUrl: asset('/sample/cat/08.jpg')},
];


export const catImages = [
    {id: 1, imageUrl: asset('/sample/cat/01.jpg')},
    {id: 2, imageUrl: asset('/sample/cat/02.jpg')},
    {id: 3, imageUrl: asset('/sample/cat/03.jpg')},
    {id: 4, imageUrl: asset('/sample/cat/04.jpg')},
    {id: 5, imageUrl: asset('/sample/cat/05.jpg')},
];


export const preViewImage = [
    {id: 1, name: 'CleanShot 2022-10-20 at 12.02.47@2x.png', size: '256.21KB', createdAt: '2022-10-20 12:00:00', imageUrl: 'https://image.kr8851.com/uploads/product-goods/2022/10/26/3910809/8.jpg?v=1026215633'},
    {id: 2, name: 'CleanShot 2022-10-22 at 12.22.47@2x.png', size: '10.21KB', createdAt: '2022-10-22 23:00:10', imageUrl: asset('/sample/cat/02.jpg')},
    {id: 3, name: 'CleanShot 2022-10-23 at 12.23.47@2x.png', size: '26.01KB', createdAt: '2022-10-23 11:00:30', imageUrl: asset('/sample/cat/03.jpg')},
    {id: 4, name: 'CleanShot 2022-10-24 at 12.11.47@2x.png', size: '226.21KB', createdAt: '2022-10-24 22:33:00', imageUrl: asset('/sample/cat/04.jpg')},
    {id: 5, name: 'CleanShot 2022-10-26 at 12.22.47@2x.png', size: '2MB', createdAt: '2022-10-26 08:12:20', imageUrl: asset('/sample/cat/05.jpg')},
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
    {id: 1, imageUrl: asset('/sample/cat/vertical-01.jpg')},
    {id: 2, imageUrl: asset('/sample/cat/01.jpg')},
    {id: 3, imageUrl: asset('/sample/cat/02.jpg')},
    {id: 4, imageUrl: asset('/sample/cat/vertical-02.jpg')},
    {id: 5, imageUrl: asset('/sample/cat/03.jpg')},
    {id: 6, imageUrl: asset('/sample/cat/vertical-03.jpg')},
    {id: 7, imageUrl: asset('/sample/cat/04.jpg')},
    {id: 8, imageUrl: asset('/sample/cat/vertical-04.jpg')},
    {id: 9, imageUrl: asset('/sample/cat/05.jpg')},
];


