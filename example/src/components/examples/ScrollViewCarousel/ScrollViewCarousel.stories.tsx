import type {Meta, StoryObj} from '@storybook/react';

import ScrollViewCarousel from './ScrollViewCarousel';


const meta = {
    title: 'Examples/ScrollViewCarousel',
    component: ScrollViewCarousel,
    parameters: {
        layout: 'centered',
        actions: {argTypesRegex: '^on.*'},
        docs: {
            description: {
                component: 'Carousel item component'
            },
        },
    },
    argTypes: {},
    args: {},
} satisfies Meta<typeof ScrollViewCarousel>;

export default meta;
type Story = StoryObj<typeof meta>;




export const Primary: Story = {
    args: {
    }
};

