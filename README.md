<div align="center">
        <a href="https://bear-react-carousel.github.io" title="Bear Carousel Logo - Most modern mobile touch slider with hardware accelerated transitions for ReactJS">
            <img src="https://github.com/imagine10255/bear-react-carousel/blob/main/logo.png" alt="Bear Carousel Logo - Most modern mobile touch slider with hardware accelerated transitions for ReactJS" />
        </a>
</div>

<div align="center">



[![NPM](https://img.shields.io/npm/v/bear-react-carousel.svg?style=for-the-badge)](https://www.npmjs.com/package/bear-react-carousel)
[![npm downloads](https://img.shields.io/npm/dm/bear-react-carousel.svg?style=for-the-badge)](https://www.npmjs.com/package/bear-react-carousel)
[![npm](https://img.shields.io/npm/dt/bear-react-carousel.svg?style=for-the-badge)](https://www.npmjs.com/package/bear-react-carousel)
[![npm](https://img.shields.io/npm/l/bear-react-carousel?style=for-the-badge)](https://github.com/imagine10255/bear-react-carousel/blob/main/LICENSE)

</div>

<p align="center">
  <a href="https://bear-react-carousel.github.io/docs/getting-started">Get started</a> | 
  <a href="https://bear-react-carousel.github.io/docs/category/components">Component</a> |
  <a href="https://bear-react-carousel.github.io/docs/category/examples">Examples</a> |
  <a href="https://bear-react-carousel.github.io/docs/props-try">Prop Try</a>
</p>

## Features

- Use React + Flexbox directly, not javascript in secondary development into React
- Easier to use
- Use Flexbox instead of adding inline Style to carousel items
- Number of times to avoid re-renders by key in carousel items or switch memo cache
- There is no need to set the style of the project, Bear React Carousel directly provides the components of your project, you only need to set the image URL and form an array, and put it in the data parameter.
- The size of the carousel, the height of the outer container is based, and the item container follows the size of the outer container
- The loop mode uses the cloning method to fill in the blanks at the beginning and end during cycling (If you try to change the order in the loop mode, you will encounter many [issues](https://bear-react-grid.github.io/blog/Swiper%20carousel%20loop))
- The onClick event inside the SlideItem will not be triggered during sliding, thereby avoiding potential user experience issues

## Supports

- Supports both Web, Mobile
- Responsive setting parameters
- Navigation buttons can be directly moved out of the carousel area without being affected by overflow in simple usage situations
- Prevent onClick of carousel item from triggering on swipe
- Provide project scale setting + additional fixed size or fixed height setting
- Support two-way synchronous control of the second Carousel
- Support center mode
- Support auto play and init start play time
- Support keyboard control slide index
- Support lazy load image



### Install

```bash
yarn add bear-react-carousel
```

### Usage

```tsx
import BearCarousel, {TBearSlideItemDataList, BearSlideImage} from 'bear-react-carousel';
import 'bear-react-carousel/dist/index.css';

const images = [
    {id: 1, imageUrl: "https://dummyimage.com/900x400/dee2e6/6c757d.jpg"},
    {id: 2, imageUrl: "https://dummyimage.com/900x400/dee2e6/6c757d.jpg"},
    {id: 3, imageUrl: "https://dummyimage.com/900x400/dee2e6/6c757d.jpg"},
];
    
const data: TBearSlideItemDataList = images.map(row => {
    return {
        key: row.id,
        // BearSlideImage or BearSlideCard
        children: <BearSlideImage imageUrl={row.imageUrl}/>
    };
});

export const CustomBanner = () => {
    return <BearCarousel 
        data={data}
        height="200px"
    />
}
```

There is also a codesandbox template that you can fork and play with it:

[![Edit react-editext-template](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/bear-react-carousel-9h6eu)

Use Nextjs example

[![Edit react-editext-template](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/sandbox/bear-react-carousel-nextjs-6jqj2o?welcome=true)



### License

MIT © [imagine10255](https://github.com/imagine10255)
