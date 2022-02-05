# bear-carousel

> Most modern mobile touch slider with hardware accelerated transitions by react

[![NPM](https://img.shields.io/npm/v/bear-carousel.svg)](https://www.npmjs.com/package/bear-carousel)
[![npm](https://img.shields.io/npm/dm/bear-carousel.svg)](https://www.npmjs.com/package/bear-carousel)

This project [demo](https://imagine10255.github.io/bear-carousel/)

## Install

```bash
yarn add bear-carousel
```

## Usage

```tsx
import BearCarousel, {TSlideItemDataList, SlideItem} from 'bear-carousel';
import 'bear-carousel/dist/index.css';

export const CustomBanner = () => {
    const images = [
        {id: 1, image: '/static/sample/01.jpg'},
        {id: 2, image: '/static/sample/02.jpg'},
        {id: 3, image: '/static/sample/03.jpg'},
    ];
    
    const slideItemData: TSlideItemDataList  = images.map(row => {
        return {
            key: row.id,
            children: <SlideItem imageUrl={row.image}/>
        };
    });

    return <Carousel 
        data={slideItemData} 
        staticHeight="250px"
    />
}
```

There is also a codesandbox template that you can fork and play with it:

[![Edit react-editext-template](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/bear-carousel-9h6eu)



## if your need control by out component

```tsx
const HomeBanner = ({
    const [carousel, setCarousel] = useState<ICarouselObj>();
  
    const goToPage = (index: number): void => control?.goToPage(index);
    const getPageTotal = (): number => control?.info.pageTotal ?? 0;

    <Carousel
        setCarousel={setCarousel}
        data={carouselData}
        staticHeight="250px"/
    />
}
```

## License

MIT © [imagine10255](https://github.com/imagine10255)
