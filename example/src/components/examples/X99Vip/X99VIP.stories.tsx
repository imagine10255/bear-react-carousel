import type {Meta, StoryObj} from '@storybook/react';
import X99Vip from "./X99Vip";


const meta = {
    title: 'Examples/X99VIP',
    component: X99Vip,
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
} satisfies Meta<typeof X99Vip>;

export default meta;
type Story = StoryObj<typeof meta>;




export const Primary: Story = {
    args: {
    }
};
