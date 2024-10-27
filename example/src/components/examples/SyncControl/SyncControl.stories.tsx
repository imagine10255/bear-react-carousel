import type {Meta, StoryObj} from '@storybook/react';
import SyncControl from "./SyncControl";


const meta = {
    title: 'Examples/SyncControl',
    component: SyncControl,
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
} satisfies Meta<typeof SyncControl>;

export default meta;
type Story = StoryObj<typeof meta>;




export const Primary: Story = {
    args: {
    }
};
