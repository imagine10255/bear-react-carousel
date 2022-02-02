import React from 'react';
import styled from 'styled-components/macro';
import Router from './Router';

import Navbar from './_components/Navbar';
import Sidebar from './_components/Sidebar';
import Footer from './_components/Footer';
import {Container} from 'bear-styled-grid';



const HomeRoot = () => {

    return (
        <>
            <Navbar/>

            <MainWrapper>
                <Sidebar/>

                <Content>
                    <Container>
                        <Router/>
                    </Container>
                </Content>

            </MainWrapper>

            <Footer/>
        </>
    );
};

export default HomeRoot;

const MainWrapper = styled.div`
    flex: 1 0 auto;
    display: flex;
    box-sizing: border-box;
`;

const Content = styled.div`
  flex: 1;
  padding-bottom: 2rem;
  padding-top: 1rem;
`;


