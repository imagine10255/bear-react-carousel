import React from 'react';
import styled, {css} from 'styled-components/macro';
import Router from './Router';

import Navbar from './_components/Navbar';
import Sidebar from './_components/Sidebar';
import {Container, media} from 'bear-styled-grid';
import {useSidebar} from '../provider/SidebarProvider';



const HomeRoot = () => {
    const {isExpend, toggleExpend} = useSidebar();

    return (
        <>
            <Navbar/>

            <MainWrapper>
                <Sidebar/>

                <Content isSidebarExpend={isExpend}>
                    <Container fluid>
                        <Router/>
                    </Container>
                </Content>

            </MainWrapper>

        </>
    );
};

export default HomeRoot;

const MainWrapper = styled.div`
  flex: 1;
`;

const Content = styled.div<{
    isSidebarExpend: boolean
}>`
  padding-bottom: 2rem;
  padding-top: 1rem;
  
  ${props => props.isSidebarExpend && css`
    margin-left: 0;
  `}

  ${props => css`
      ${media.lg`
        will-change: margin-left;
        transition: margin-right .2s ease;
        margin-left: ${props.theme.layout.sidebarWidth}px;
      `}
      
  `}
 
`;


