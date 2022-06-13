import React from 'react';
import styled, {css} from 'styled-components/macro';
import {Outlet} from 'react-router-dom';

import Navbar from './_components/Navbar';
import Sidebar from './_components/Sidebar';
import {Container, media} from 'bear-react-grid';
import {useSidebar} from '../provider/SidebarProvider';



const Layout = () => {
    const {isExpend, toggleExpend} = useSidebar();

    return (
        <>
            <Navbar/>

            <MainWrapper>
                <Sidebar/>

                <Content isSidebarExpend={isExpend}>
                    <Container fluid>
                        <Outlet/>
                    </Container>
                </Content>

            </MainWrapper>

        </>
    );
};

export default Layout;

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


