import {useLocale} from '../library/intl';
import {i18n} from 'library/intl';

export interface IMenu {
  name: string,
  href?: string,
  children?: IMenu[],
}

export const menu = (): IMenu[] => {
    return [
        {name: i18n({id: 'page.about.title'}), href: '/about'},
        {name: i18n({id: 'page.advices.title'}), href: '/advices'},
        {name: i18n({id: 'page.installation.title'}), href: '/installation'},
        // {name: i18n({id: 'page.lifeCycle.title'}), href: '/life-cycle',},
        // {name: i18n({id: 'page.cssClassName.title'}), href: '/css-class-name'},
        {name: i18n({id: 'page.propsTry.title'}), href: '/props-try'},
        {
            name: i18n({id: 'menu.feature'}),
            children: [
                {name: i18n({id: 'page.feature.staticHeight.title'}), href: '/feature/static-height'},
                {name: i18n({id: 'page.feature.aspectRatioHeight.title'}), href: '/feature/aspect-ratio-height'},
                {name: i18n({id: 'page.feature.centered.title'}), href: '/feature/centered'},
                {name: i18n({id: 'page.feature.autoWidth.title'}), href: '/feature/auto-width'},
                {name: i18n({id: 'page.feature.responsive.title'}), href: '/feature/responsive'},
            ]
        },
        {
            name: i18n({id: 'menu.example'}),
            children: [
                {name: i18n({id: 'page.example.vipLevelList.title'}), href: '/example/vip-level-list'},
                {name: i18n({id: 'page.example.autoPlayProgress.title'}), href: '/example/auto-play-progress'},
                {name: i18n({id: 'page.example.textAnimation.title'}), href: '/example/text-animations'},
            ]
        },
    ];

};
