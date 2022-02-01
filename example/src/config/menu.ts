
export interface IMenu {
  name: string,
  href?: string,
  children?: IMenu[],
}



export const menu: IMenu[] = [
    {
        name: 'About',
        href: '/about',
    },
    {
        name: 'Installation',
        href: '/installation',
    },
    {
        name: 'Props Try',
        href: '/props-try',
    },
    {
        name: 'Special',
        children: [
            {
                name: 'Slider Per View Auto',
                href: '/special/slider-per-view-auto'
            },
            {
                name: 'Centered',
                href: '/special/centered'
            },
            {
                name: 'Breakpoints',
                href: '/special/breakpoints'
            }
        ]
    },
    {
        name: 'Example',
        children: [
            {
                name: 'Vip List',
                href: '/example/vip-list'
            },
            {
                name: 'Text Animations',
                href: '/example/text-animations'
            },
            {
                name: 'Auto Play Progress',
                href: '/example/auto-play-progress'
            }
        ]
    },
];
