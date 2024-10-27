import type {Meta, StoryObj} from '@storybook/react';
import ServiceCarousel from "./ServiceCarousel";


const meta = {
    title: 'Examples/ServiceCarousel',
    component: ServiceCarousel,
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
} satisfies Meta<typeof ServiceCarousel>;

export default meta;
type Story = StoryObj<typeof meta>;




export const Primary: Story = {
    args: {
    }
};
