export interface IMenu {
  name: string,
  href?: string,
  children?: IMenu[],
}

export const menu = (): IMenu[] => {
    return [
        {name: 'propsTry', href: '/'},
        {
            name: 'example',
            children: [
                {name: 'textAnimations', href: '/example/text-animations'},
                {name: 'vipLevelList', href: '/example/vip-level-list'},
                {name: 'autoPlayProgress', href: '/example/auto-play-progress'},
            ]
        },
    ];

};
