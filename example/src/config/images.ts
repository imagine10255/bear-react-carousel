
export const catImages = [
    {id: 1, imageUrl: './static/sample/cat/01.jpg'},
    {id: 2, imageUrl: './static/sample/cat/02.jpg'},
    {id: 3, imageUrl: './static/sample/cat/03.jpg'},
    {id: 4, imageUrl: './static/sample/cat/04.jpg'},
    {id: 5, imageUrl: './static/sample/cat/05.jpg'},
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
        imageUrl: '/static/sample/food/01.jpg',
        position: 'right',
    },
    {
        id: 2,
        subTitle: 'WILD SALMON',
        title: 'CUTTING & DELIVERY',
        desc: 'We offer huge variety of execeptionally fresh meat farmed in our personal farm',
        imageUrl: './static/sample/food/02.jpg',
        position: 'right',
    },
    {
        id: 3,
        subTitle: 'CUTTING & DELIVERY',
        title: 'QUALITY MONITORING',
        desc: 'We offer huge variety of execeptionally fresh meat farmed in our personal farm',
        imageUrl: './static/sample/food/03.jpg',
        position: 'left',
    },
];
