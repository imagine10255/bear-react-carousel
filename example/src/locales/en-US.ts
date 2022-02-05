/* eslint-disable no-template-curly-in-string */


export default {
    /** -----------------------------------------
     |                    共用                   |
     /** ---------------------------------------*/
    'common.loadData': 'Load Data',
    'common.howToUse': 'How To Use',

    'menu.feature': 'Feature',
    'menu.example': 'Example',

    /** -----------------------------------------
     |                    頁面                    |
     /** ---------------------------------------*/

    // Page About
    'page.about.title': 'About',
    'page.about.desc': `This is a carousel developed directly using React + Flexbox (non-js secondary development package into React),<br/>
    and only include the features you need, not too many cool effects that might complicate your usage or create other weird issues.`,
    'page.about.feature.title': 'Feature',
    'page.about.feature.desc1': 'Use React + Flexbox directly, not javascript in secondary development into React',
    'page.about.feature.desc2': 'Easier to use',
    'page.about.feature.desc3': 'Supports both Web, Mobile',
    'page.about.feature.desc4': 'Responsive setting parameters',
    'page.about.feature.desc5': 'Navigation buttons can be directly moved out of the carousel area without being affected by overflow in simple usage situations',
    'page.about.feature.desc6': 'Use Flexbox instead of adding inlineStyle to carousel items',
    'page.about.feature.desc7': 'Number of times to avoid re-renders by key in carousel items',
    'page.about.feature.desc8': 'When the image data is loaded asynchronously, it will not be displayed because BearCarousel has componentDidMount, and the image has been loaded but not displayed. Additional processing is required.',
    'page.about.feature.desc9': 'There is no need to set the style of the project, Bear Carousel directly provides the components of your project, you only need to set the image URL and form an array, and put it in the data parameter.',
    'page.about.feature.desc10': 'The size of the carousel, the height of the outer container is based, and the item container follows the size of the outer container',
    'page.about.feature.desc11': 'Provide project scale setting or fixed height setting',
    // 'page.about.feature.desc12': 'The lazy loading mode will load before the next page, so as to prevent users from seeing a blank screen before loading, resulting in a bad experience',

    // Page advices
    'page.advices.title': 'Advices',
    'page.advices.desc': 'Please read the recommendations before use, it will help you to use Bear Carousel more easily',
    'page.advices.item.desc1': 'If you want to add a click link on the carousel, it is recommended to use an extra button, because the sliding function will trigger the opening, which will lead to a bad experience',
    'page.advices.item.desc2': 'If you want to use the automatic width mode, you need to set a fixed height. Bear Carousel\'s SlideItem will use the img tag to make the image width automatic. In other cases, you can choose to use equal proportion or fixed height according to your needs.',
    'page.advices.item.desc3': 'Bear Carousel does not provide the content height mode (ex: text announcement light box), because it is not easy to use, you only need to fix the height and scroll, light box lock background',

    // Page Installation
    'page.installation.title': 'Installation',
    'page.installation.desc': 'There are few options on how to include/import BearCarousel into your project:',
    'page.installation.inYourIndex': 'Add the required style files to your project entry point',
    'page.installation.fastUse': 'Fast use',

    // Page lifeCycle
    'page.lifeCycle.title': '生命週期',

    // Page cssClassName
    'page.cssClassName.title': 'CSS Class Name',

    // Page Props Try
    'page.propsTry.title': 'Props Try',
    'page.propsTry.desc': 'All available incoming parameters allow you to test and preview the results', // Page Props Try

    // Page Feature / Static Height
    'page.feature.staticHeight.title': 'Static Height',
    'page.feature.staticHeight.desc': 'Use fixed height mode to fix the height of the carousel block, and the child layer will be the same height as the parent layer',

    // Page Feature / Aspect Ratio Height
    'page.feature.aspectRatioHeight.title': 'Aspect Ratio Height',
    'page.feature.aspectRatioHeight.desc': 'Use the proportional height mode to avoid the carousel content from being clipped, and when the width changes, the height will adapt, and the child layer will be the same height as the parent layer',

    // Page Feature / Centered
    'page.feature.centered.title': 'Centered',
    'page.feature.centered.desc': 'Moved items as to the central position',
    'page.feature.centered.importantNote': 'It should be noted that the number of slidesPerGroup must be singular. If you care about the display effect, you can calculate slideItemData and slice it and then pass it in',

    // Page Feature / Auto Width
    'page.feature.autoWidth.title': 'Auto Width',
    'page.feature.autoWidth.desc': 'Display according to the width of the image itself',
    'page.feature.autoWidth.importantNote': 'Auto width must be used with fixed height',

    // Page Feature / Responsive
    'page.feature.responsive.title': 'Responsive',
    'page.feature.responsive.desc': 'Display settings according to responsive size',
    'page.feature.responsive.importantNote': 'Settings not in breakpoints are default settings, breakpoints are override settings, but large size settings in breakpoints will not include small size settings',

    // Page Example / Vip level list
    'page.example.vipLevelList.title': 'Vip Level Card List',
    'page.example.vipLevelList.desc': 'Multi card and control page',

    // Page Example / Auto Play Progress
    'page.example.autoPlayProgress.title': 'Auto Play Progress',
    'page.example.autoPlayProgress.desc': 'Moved items as to the central position',

    // Page Example / Text Animation
    'page.example.textAnimations.title': 'Text Animations',
    'page.example.textAnimations.desc': 'Text display effect when swipe ends',
};
