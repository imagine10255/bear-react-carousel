import type {Meta, StoryObj} from '@storybook/react';
import UpdateSlideItem from "./UpdateSlideItem";


const meta = {
    title: 'Examples/UpdateSlideItem',
    component: UpdateSlideItem,
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
} satisfies Meta<typeof UpdateSlideItem>;

export default meta;
type Story = StoryObj<typeof meta>;




export const Primary: Story = {
    args: {
    }
};

