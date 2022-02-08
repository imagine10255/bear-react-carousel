# Bear Carousel

> Is React Carousel Most modern mobile touch slider with hardware accelerated transitions for ReactJS

<div align="center">

[![npm downloads](https://img.shields.io/npm/dm/bear-carousel.svg?style=for-the-badge)](https://www.npmjs.com/package/bear-carousel)
[![npm](https://img.shields.io/npm/dt/bear-carousel.svg?style=for-the-badge)](https://www.npmjs.com/package/bear-carousel)
[![npm](https://img.shields.io/npm/l/bear-carousel?style=for-the-badge)](https://github.com/bear-carousel/bear-carousel/blob/master/LICENSE)

</div>

<p align="center">
  <a href="https://bearests.com/bear-carousel">Get started</a> | 
  <a href="https://bearests.com/bear-carousel/api">API</a> |
  <a href="https://github.com/imagine10255/bear-carousel/tree/main/example/src/views/Example">Examples</a> |
  <a href="https://bearests.com/bear-carousel/example/text-animations">Demo</a> |
  <a href="https://bearests.com/bear-carousel/props-try">Prop Try</a> |
  <a href="https://bearests.com/bear-carousel/advices">Advices</a>
</p>


## Install

```bash
yarn add bear-carousel
```

## Usage

```tsx
import BearCarousel, {TBearSlideItemDataList, BearSlideItem} from 'bear-carousel';
import 'bear-carousel/dist/index.css';

const images = [
        {id: 1, image: "https://dummyimage.com/900x400/dee2e6/6c757d.jpg"},
        {id: 2, image: "https://dummyimage.com/900x400/dee2e6/6c757d.jpg"},
        {id: 3, image: "https://dummyimage.com/900x400/dee2e6/6c757d.jpg"},
    ];
    
const bearSlideItemData: TBearSlideItemDataList  = images.map(row => {
        return {
            key: row.id,
            children: <BearSlideItem imageUrl={row.image}/>
        };
    });


export const CustomBanner = () => {
    return <BearCarousel 
        data={bearSlideItemData} 
        aspectRatio={{widthRatio: 16, heightRatio: 9}}
    />
}
```

There is also a codesandbox template that you can fork and play with it:

[![Edit react-editext-template](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/bear-carousel-9h6eu)



## if your need control by out component

```tsx
const CustomBanner = ({
    const [carousel, setCarousel] = useState<IBearCarouselObj>();
  
    const goToPage = (index: number): void => control?.goToPage(index);
    const getPageTotal = (): number => control?.info.pageTotal ?? 0;

    <BearCarousel
        setCarousel={setCarousel}
        data={bearSlideItemData}
        staticHeight="250px"/
    />
}
```

## License

MIT © [imagine10255](https://github.com/imagine10255)
