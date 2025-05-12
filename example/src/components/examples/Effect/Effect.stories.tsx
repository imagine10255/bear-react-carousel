import type {Meta, StoryObj} from '@storybook/react';

import Effect from './Effect';


const meta = {
    title: 'Examples/Effect',
    component: Effect,
    parameters: {
        layout: 'centered',
        actions: {argTypesRegex: '^on.*'},
        docs: {
            description: {
                component: 'Carousel item component'
            },
        },
    },
    // argTypes: {},
    args: {
        slidesPerView: 5,
    },
} satisfies Meta<typeof Effect>;

export default meta;
type Story = StoryObj<typeof meta>;




export const Primary: Story = {
    args: {
    }
};



export const withSlide1d5: Story = {
    args: {
        slidesPerView: 1.5,
    },
};
