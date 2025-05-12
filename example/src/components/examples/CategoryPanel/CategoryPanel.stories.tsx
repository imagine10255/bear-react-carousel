import {Container} from '@acrool/react-grid';
import type {Meta, StoryObj} from '@storybook/react';
import styled from 'styled-components';

import Phone, {NavWrapper} from '@/components/atoms/Phone';
import Icon, {EIconCode} from '@/library/acrool-react-icon';

import CategoryPanel from './_components/CategoryPanel';


const meta = {
    title: 'Examples/CategoryPanel',
    component: CategoryPanel,
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
            <Container>

                <SubHeaderWrapper>
                    <SubTitle>
                        <Icon code={EIconCode._crown_2} size={18} color="#13BACC"/>
                        <span>Top Sport</span>
                    </SubTitle>
                </SubHeaderWrapper>


                <CategoryPanel {...args}/>


                <SubHeaderWrapper>
                    <SubTitle>
                        <Icon code={EIconCode._crown_2} size={18} color="#13BACC"/>
                        <span>Other Game</span>
                    </SubTitle>
                </SubHeaderWrapper>
            </Container>




        </Phone>;
    },
    // argTypes: {},
    args: {
    },
} satisfies Meta<typeof CategoryPanel>;

export default meta;
type Story = StoryObj<typeof meta>;




export const Primary: Story = {
    args: {
    }
};




const SubHeaderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`;
const SubTitle = styled.h2`
    font-size: 16px;
    font-weight: 600;
    color: var(--app__text-color, #fff);

    display: flex;
    gap: 10px;
    align-items: center;
`;

