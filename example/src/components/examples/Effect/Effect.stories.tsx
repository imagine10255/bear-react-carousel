import type {Meta, StoryObj} from '@storybook/react';

import Effect from './Effect';
import Effect2 from './Effect2';


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
    argTypes: {},
    args: {},
} satisfies Meta<typeof Effect>;

export default meta;
type Story = StoryObj<typeof meta>;




export const Primary: Story = {
    args: {
    }
};



export const case2: Story = {
    args: {},
    render: function Render(args) {
        return <Effect2/>;
    },
};
