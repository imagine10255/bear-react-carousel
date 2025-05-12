import {Container, Grid} from '@acrool/react-grid';
import React from 'react';
import styled from 'styled-components';

import Icons from './Icons';


const NavWrapper = () => {
    return <NavWrapperRoot>
        <Container>
            <Grid col="auto 1fr auto" className="text-center align-items-center py-4">
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
