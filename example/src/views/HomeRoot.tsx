import React from 'react';
import styled from 'styled-components/macro';
import {Col} from 'imagine-react-styled-grid';
import Router from './Router';

import Navbar from './_components/Navbar';
import Sidebar from './_components/Sidebar';
import Footer from './_components/Footer';



const HomeRoot = () => {

    return (
        <>
            <Navbar/>

            <MainWrapper>
                <Sidebar/>

                <Content>
                    <Router/>
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




const StyledCol =styled(Col)`
  border: dotted 1px #bdbdbd;
`;


const CardFooter = styled.div`
    padding: 0.5rem 1rem;
    background-color: rgba(0, 0, 0, 0.03);
    border-top: 1px solid rgba(0, 0, 0, 0.125);
`;

const CardText = styled.p`

`;

const CardTitle = styled.h2`
    margin-top: 0;
    margin-bottom: 0.5rem;
`;

const CardBody = styled.div`
    flex: 1 1 auto;
    padding: 1rem 1rem;
`;

const Card = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 0.25rem;
`;

const NewCard = styled(Card)`
  background-color: rgb(108, 117, 125);
  color: #fff;
`;

const Title = styled.h1`
    font-size: 2.5rem;
`;
