export interface IMenu {
  name: string,
  href?: string,
  children?: IMenu[],
}

export const menu = (): IMenu[] => {
    return [
        {name: 'BaseUsed', href: '/'},
        {name: 'Props Try', href: '/props-try'},
        {
            name: 'Try',
            children: [
                {name: 'Loop', href: '/try/loop'},
            ]
        },
        {
            name: 'Example',
            children: [
                {name: 'Text Animations', href: '/example/text-animations'},
                {name: 'Vip Level List', href: '/example/vip-level-list'},
                {name: 'Auto Play Progress', href: '/example/auto-play-progress'},
            ]
        },
    ];

};
