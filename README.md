<div align="center">
        <a href="https://carousel.bearests.com/" title="Bear Carousel Logo - Most modern mobile touch slider with hardware accelerated transitions for ReactJS">
            <img src="https://raw.githubusercontent.com/imagine10255/bear-carousel/main/example/public/logo.png" alt="Bear Carousel Logo - Most modern mobile touch slider with hardware accelerated transitions for ReactJS" />
        </a>
</div>

<div align="center">

    

[![NPM](https://img.shields.io/npm/v/bear-carousel.svg?style=for-the-badge)](https://www.npmjs.com/package/bear-carousel)
[![npm downloads](https://img.shields.io/npm/dm/bear-carousel.svg?style=for-the-badge)](https://www.npmjs.com/package/bear-carousel)
[![npm](https://img.shields.io/npm/dt/bear-carousel.svg?style=for-the-badge)](https://www.npmjs.com/package/bear-carousel)
[![npm](https://img.shields.io/npm/l/bear-carousel?style=for-the-badge)](https://github.com/bear-carousel/bear-carousel/blob/master/LICENSE)

</div>

<p align="center">
  <a href="https://carousel.bearests.com">Get started</a> | 
  <a href="https://carousel.bearests.com/api">API</a> |
  <a href="https://carousel.bearests.com/example/text-animations">Demo</a> |
  <a href="https://carousel.bearests.com/props-try">Prop Try</a>
</p>

### Features

- Use React + Flexbox directly, not javascript in secondary development into React
- Easier to use
- Supports both Web, Mobile
- Responsive setting parameters
- Navigation buttons can be directly moved out of the carousel area without being affected by overflow in simple usage situations
- Use Flexbox instead of adding inlineStyle to carousel items
- Number of times to avoid re-renders by key in carousel items
- When the image data is loaded asynchronously, it will not be displayed because BearCarousel has componentDidMount, and the image has been loaded but not displayed. Additional processing is required.
- There is no need to set the style of the project, Bear Carousel directly provides the components of your project, you only need to set the image URL and form an array, and put it in the data parameter.
- The size of the carousel, the height of the outer container is based, and the item container follows the size of the outer container
- Provide project scale setting or fixed height setting
- Prevent onClick of carousel item from triggering on swipe


### Install

```bash
yarn add bear-carousel
```

### Usage

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



### if your need control by out component

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

### License

MIT © [imagine10255](https://github.com/imagine10255)
