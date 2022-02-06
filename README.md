# bear-carousel

> Most modern mobile touch slider with hardware accelerated transitions by react

[![NPM](https://img.shields.io/npm/v/bear-carousel.svg)](https://www.npmjs.com/package/bear-carousel)
[![npm](https://img.shields.io/npm/dm/bear-carousel.svg)](https://www.npmjs.com/package/bear-carousel)

This project [demo](https://bearests.com/bear-carousel)

## Install

```bash
yarn add bear-carousel
```

## Usage

```tsx
import BearCarousel, {TSlideItemDataList, SlideItem} from 'bear-carousel';
import 'bear-carousel/dist/index.css';

const images = [
        {id: 1, image: "https://dummyimage.com/900x400/dee2e6/6c757d.jpg"},
        {id: 2, image: "https://dummyimage.com/900x400/dee2e6/6c757d.jpg"},
        {id: 3, image: "https://dummyimage.com/900x400/dee2e6/6c757d.jpg"},
    ];
    
const slideItemData: TSlideItemDataList  = images.map(row => {
        return {
            key: row.id,
            children: <SlideItem imageUrl={row.image}/>
        };
    });


export const CustomBanner = () => {
    return <BearCarousel 
        data={slideItemData} 
        aspectRatio={{widthRatio: 16, heightRatio: 9}}
    />
}
```

There is also a codesandbox template that you can fork and play with it:

[![Edit react-editext-template](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/bear-carousel-9h6eu)



## if your need control by out component

```tsx
const CustomBanner = ({
    const [carousel, setCarousel] = useState<ICarouselObj>();
  
    const goToPage = (index: number): void => control?.goToPage(index);
    const getPageTotal = (): number => control?.info.pageTotal ?? 0;

    <BearCarousel
        setCarousel={setCarousel}
        data={carouselData}
        staticHeight="250px"/
    />
}
```

## License

MIT © [imagine10255](https://github.com/imagine10255)
