import type {Meta, StoryObj} from '@storybook/react';

import JuejinVip from './JuejinVip';


const meta = {
    title: 'Examples/JuejinVip',
    component: JuejinVip,
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
} satisfies Meta<typeof JuejinVip>;

export default meta;
type Story = StoryObj<typeof meta>;




export const Primary: Story = {
    args: {
    }
};
