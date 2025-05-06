# Acrool React Carousel


<a href="https://acrool-react-carousel.pages.dev/" title="Acrool React Carousel - Most modern slider with hardware accelerated transitions for ReactJS">
    <img src="https://raw.githubusercontent.com/acrool/acrool-react-carousel/main/example/public/og.png" alt="Acrool React Carousel Logo"/>
</a>

<p align="center">
    Most modern slider with hardware accelerated transitions for ReactJS
</p>

<div align="center">

[![NPM](https://img.shields.io/npm/v/@acrool/react-carousel.svg?style=for-the-badge)](https://www.npmjs.com/package/@acrool/react-carousel)
[![npm](https://img.shields.io/bundlejs/size/@acrool/react-carousel?style=for-the-badge)](https://github.com/acrool/react-carousel/blob/main/LICENSE)
[![npm](https://img.shields.io/npm/l/@acrool/react-carousel?style=for-the-badge)](https://github.com/acrool/acrool-react-carousel/blob/main/LICENSE)

[![npm downloads](https://img.shields.io/npm/dm/@acrool/react-carousel.svg?style=for-the-badge)](https://www.npmjs.com/package/@acrool/react-carousel)
[![npm](https://img.shields.io/npm/dt/@acrool/react-carousel.svg?style=for-the-badge)](https://www.npmjs.com/package/@acrool/react-carousel)

</div>

`^5.2.0 support react >=18.0.0 <20.0.0`


## Documentation

- [Getting Started](https://acrool-react-carousel.pages.dev/docs/getting-started)
- [Faq](https://acrool-react-carousel.pages.dev/docs/category/faqs)
- [Prop Try](https://acrool-react-carousel.pages.dev/docs/props-try)
- [ClassNames](https://acrool-react-carousel.pages.dev/docs/class-names)
- [Components](https://acrool-react-carousel.pages.dev/docs/category/components)
- [Features](https://acrool-react-carousel.pages.dev/docs/category/feature)
- [Examples](https://acrool-react-carousel.pages.dev/docs/category/examples)
- [Storybook](https://acrool-react-carousel-storybook.pages.dev)


## Features

- Use React + Flexbox directly, not javascript in secondary development into React
- Easier to use
- Use Flexbox instead of adding inline Style to carousel items
- There is no need to set the style of the project, Acrool React Carousel directly provides the components of your project, you only need to set the image URL and form an array, and put it in the data parameter.
- The size of the carousel, the height of the outer container is based, and the item container follows the size of the outer container
- The loop mode uses the cloning method to fill in the blanks at the beginning and end during cycling (If you try to change the order in the loop mode, you will encounter many [issues](https://acrool-react-carousel.pages.dev/blog/Swiper%20carousel%20loop))
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
- Support `NextJS 14` (v14.1.0+)



### Installation

```bash
yarn add acrool-react-carousel
```

### Usage

```tsx
import AcroolCarousel, {TAcroolSlideItemDataList, AcroolSlideImage} from 'acrool-react-carousel';
import 'acrool-react-carousel/dist/index.css';

const images = [
    {id: 1, imageUrl: "https://dummyimage.com/900x400/dee2e6/6c757d.jpg"},
    {id: 2, imageUrl: "https://dummyimage.com/900x400/dee2e6/6c757d.jpg"},
    {id: 3, imageUrl: "https://dummyimage.com/900x400/dee2e6/6c757d.jpg"},
];
    
const data: TAcroolSlideItemDataList|undefined = images.map(row => {
    return <AcroolSlideImage
        key={row.id}
        imageUrl={row.imageUrl}
    />;
});

export const CustomBanner = () => {
    return <AcroolCarousel 
        data={data}
        height="200px"
    />
}
```



There is also a example that you can play with it:

[![Play react-editext-example](https://raw.githubusercontent.com/imagine10255/acrool-react-carousel/main/play-in-example-button.svg)](https://acrool-react-carousel-storybook.pages.dev)



There is also a codesandbox template that you can fork and play with it:

[![Edit react-editext-template](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/acrool-react-carousel-9h6eu)

Use Nextjs example

[![Edit react-editext-template](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/github/acrool-react-carousel/acrool-react-carousel-nextjs/main?layout=%257B%2522sidebarPanel%2522%253A%2522EXPLORER%2522%252C%2522rootPanelGroup%2522%253A%257B%2522direction%2522%253A%2522horizontal%2522%252C%2522contentType%2522%253A%2522UNKNOWN%2522%252C%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522id%2522%253A%2522ROOT_LAYOUT%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522UNKNOWN%2522%252C%2522direction%2522%253A%2522vertical%2522%252C%2522id%2522%253A%2522clmprntpd000i3b6jcs1dg4uq%2522%252C%2522sizes%2522%253A%255B70%252C30%255D%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522EDITOR%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522EDITOR%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522EDITOR%2522%252C%2522id%2522%253A%2522clmprntpd000e3b6jpi2h74sb%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522SHELLS%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522SHELLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522SHELLS%2522%252C%2522id%2522%253A%2522clmprntpd000g3b6jcsg1c72j%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522DEVTOOLS%2522%252C%2522direction%2522%253A%2522vertical%2522%252C%2522id%2522%253A%2522DEVTOOLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522DEVTOOLS%2522%252C%2522id%2522%253A%2522clmprntpd000h3b6jx4d543dc%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%255D%252C%2522sizes%2522%253A%255B50%252C50%255D%257D%252C%2522tabbedPanels%2522%253A%257B%2522clmprntpd000e3b6jpi2h74sb%2522%253A%257B%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522clmprntpd000d3b6j8j0d5tl0%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522FILE%2522%252C%2522filepath%2522%253A%2522%252FREADME.md%2522%257D%255D%252C%2522id%2522%253A%2522clmprntpd000e3b6jpi2h74sb%2522%252C%2522activeTabId%2522%253A%2522clmprntpd000d3b6j8j0d5tl0%2522%257D%252C%2522clmprntpd000h3b6jx4d543dc%2522%253A%257B%2522id%2522%253A%2522clmprntpd000h3b6jx4d543dc%2522%252C%2522activeTabId%2522%253A%2522clmprofyz00js3b6j9k0zshsa%2522%252C%2522tabs%2522%253A%255B%257B%2522type%2522%253A%2522TASK_PORT%2522%252C%2522taskId%2522%253A%2522dev%2522%252C%2522port%2522%253A3000%252C%2522id%2522%253A%2522clmprofyz00js3b6j9k0zshsa%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522path%2522%253A%2522%252F%2522%257D%255D%257D%252C%2522clmprntpd000g3b6jcsg1c72j%2522%253A%257B%2522id%2522%253A%2522clmprntpd000g3b6jcsg1c72j%2522%252C%2522activeTabId%2522%253A%2522clmprntpd000f3b6jhcm0v6wm%2522%252C%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522clmprntpd000f3b6jhcm0v6wm%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522TERMINAL%2522%252C%2522shellId%2522%253A%2522clmprntw6000we3g52vi01zsj%2522%257D%252C%257B%2522type%2522%253A%2522TASK_LOG%2522%252C%2522taskId%2522%253A%2522dev%2522%252C%2522id%2522%253A%2522clmprodty00fx3b6jl6rjkb7i%2522%252C%2522mode%2522%253A%2522permanent%2522%257D%255D%257D%257D%252C%2522showDevtools%2522%253Atrue%252C%2522showShells%2522%253Atrue%252C%2522showSidebar%2522%253Atrue%252C%2522sidebarPanelSize%2522%253A15%257D)


### License

MIT © [imagine10255](https://github.com/acrool)
