import styled from 'styled-components';
import {Container, Grid} from 'bear-react-grid';
import Icons from './Icons';
import React from 'react';

interface IProps extends FCProps {

}

const NavWrapper = ({
    className,
}: IProps) => {
    return <NavWrapperRoot className={className}>
        <Container>
            <Grid columns="auto 1fr auto" className="text-center align-items-center py-4">
                <Icons.Arrow/>
                <NavTitle>Tier benefits</NavTitle>
                <div>Rule</div>
            </Grid>
        </Container>
    </NavWrapperRoot>;
};

export default NavWrapper;



const NavTitle = styled.p`
    font-weight: 600;
`;


const NavWrapperRoot = styled.div`
  color: #fff;
  background-color: var(--header-bg-color);
  padding-top: 20px;

`;
