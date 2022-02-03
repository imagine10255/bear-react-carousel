
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
    // {
    //     name: 'Life Cycle',
    //     href: '/life-cycle',
    // },
    // {
    //     name: 'Class Name',
    //     href: '/class-name',
    // },
    {
        name: 'Props Try',
        href: '/props-try',
    },
    {
        name: 'Feature',
        children: [
            {
                name: 'Centered',
                href: '/feature/centered'
            },
            {
                name: 'Auto Width',
                href: '/feature/auto-width'
            },
            {
                name: 'Auto Height',
                href: '/feature/auto-height'
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
                name: 'Vip Level List',
                href: '/example/vip-level-list'
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
