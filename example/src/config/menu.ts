
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
        name: 'Feature',
        children: [
            {
                name: 'Per View Auto',
                href: '/feature/per-view-auto'
            },
            {
                name: 'Centered',
                href: '/feature/centered'
            },
            {
                name: 'Breakpoints',
                href: '/feature/breakpoints'
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
