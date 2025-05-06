import type {Meta, StoryObj} from '@storybook/react';
import SportMenus from "./SportMenus";


const meta = {
    title: 'Examples/SportMenus',
    component: SportMenus,
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
} satisfies Meta<typeof SportMenus>;

export default meta;
type Story = StoryObj<typeof meta>;




export const Primary: Story = {
    args: {
    }
};



export const case2: Story = {
    args: {},
    render: function Render(args) {
        return <SportMenus/>;
    },
};
