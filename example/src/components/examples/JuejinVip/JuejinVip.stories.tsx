import type {Meta, StoryObj} from '@storybook/react';

import JuejinVip from './JuejinVip';
import Phone, {NavWrapper} from '@/components/atoms/Phone';


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
    render: function Render(args) {
        return <Phone>
            <NavWrapper/>
            <JuejinVip/>
        </Phone>;
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
