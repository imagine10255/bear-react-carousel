export interface IMenu {
  name: string,
  href?: string,
  children?: IMenu[],
}

export const menu = (): IMenu[] => {
    const i18n = window.i18n;
    return [
        {name: i18n('page.about.title'), href: '/about'},
        {name: i18n('page.advices.title'), href: '/advices'},
        {name: i18n('page.installation.title'), href: '/installation'},
        // {name: i18n('page.lifeCycle.title'), href: '/life-cycle'},
        // {name: i18n('page.cssClassName.title'), href: '/css-class-name'},
        {name: i18n('page.propsTry.title'), href: '/props-try'},
        {
            name: i18n('menu.feature'),
            children: [
                {name: i18n('page.feature.staticHeight.title'), href: '/feature/static-height'},
                {name: i18n('page.feature.aspectRatioHeight.title'), href: '/feature/aspect-ratio-height'},
                {name: i18n('page.feature.centered.title'), href: '/feature/centered'},
                {name: i18n('page.feature.autoWidth.title'), href: '/feature/auto-width'},
                {name: i18n('page.feature.responsive.title'), href: '/feature/responsive'},
            ]
        },
        {
            name: i18n('menu.example'),
            children: [
                {name: i18n('page.example.vipLevelList.title'), href: '/example/vip-level-list'},
                {name: i18n('page.example.autoPlayProgress.title'), href: '/example/auto-play-progress'},
                // {name: i18n('page.example.textAnimation.title'), href: '/example/text-animations'},
            ]
        },
    ];

};
