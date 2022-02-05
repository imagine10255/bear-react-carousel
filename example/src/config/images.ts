

export const racingImages = [
    {id: 1, name: '電擊 SCT', imageUrl: './static/sample/racing/01.jpg'},
    {id: 2, name: 'Ferrari 828', imageUrl: './static/sample/racing/02.jpg'},
    {id: 3, name: 'Aston 007', imageUrl: './static/sample/racing/03.jpg'},
    {id: 4, name: 'Givenchy', imageUrl: './static/sample/racing/04.jpg'},
    {id: 5, name: 'GT3 RSR', imageUrl: './static/sample/racing/05.jpg'},
    {id: 6, name: 'BMW M4', imageUrl: './static/sample/racing/06.jpg'},
];


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
        imageUrl: './static/sample/food/01.jpg',
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


export const diffImages = [
    {id: 2, imageUrl: './static/sample/cat/vertical-01.jpg'},
    {id: 1, imageUrl: './static/sample/cat/01.jpg'},
    {id: 4, imageUrl: './static/sample/cat/02.jpg'},
    {id: 3, imageUrl: './static/sample/cat/vertical-02.jpg'},
    {id: 5, imageUrl: './static/sample/cat/03.jpg'},
    {id: 6, imageUrl: './static/sample/cat/vertical-03.jpg'},
    {id: 7, imageUrl: './static/sample/cat/04.jpg'},
    {id: 8, imageUrl: './static/sample/cat/vertical-04.jpg'},
    {id: 9, imageUrl: './static/sample/cat/05.jpg'},
];


