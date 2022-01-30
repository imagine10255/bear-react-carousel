import React from 'react';
import styled, {css} from 'styled-components/macro';
import {Col, Container, EDirection, Flex, GridThemeProvider, Row} from 'imagine-react-styled-grid';
import {Link} from 'react-router-dom';
import Router from './Router';

import 'imagine-react-styled-grid/dist/index.css';



const HomeRoot = () => {
    /**
   * Nav
   */
    const renderNav = () => {
        return <Nav>
            <Container className=" d-flex" fluid>
                <NavbarBrand>React Styled Carousel</NavbarBrand>

                <NavbarNav className="ml-auto my-0 d-none d-md-flex">
                    <NavItem>
                        <NavLink href="#!" isActive>Docs</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#!">GitHub</NavLink>
                    </NavItem>

                </NavbarNav>
            </Container>
        </Nav>;
    };


    /**
   * Header
   */
    const renderHeader = () => {
        return <Container>
            <Row>
                <Col lg={14}>
                    <img className="img-fluid mb-4 mb-lg-0 round" src="https://dummyimage.com/900x400/dee2e6/6c757d.jpg" alt="sample-img"/>
                </Col>
                <Col lg={10}>
                    <Title>Business Name or Tagline</Title>
                    <p>This is a template that is great for small businesses. It doesn't have too much fancy flare to it, but it makes a great use of the standard Bootstrap core components. Feel free to use this template for any project you want!</p>
                    <a href="#!">Call to Action!</a>

                    <StyledCol className="mt-3">Test Styled(Col)</StyledCol>
                </Col>
            </Row>

        </Container>;
    };

    /**
   * News
   */
    const renderNews = () => {
        return <Container>

            <NewCard className="my-5 py-4 text-center">
                <CardBody>
                    <p>This call to action card is a great place to showcase some important information or display a clever tagline!
                    </p>
                    <p>https://startbootstrap.github.io/startbootstrap-small-business/
                    </p>

                </CardBody>
            </NewCard>

        </Container>;
    };


    /**
   * Card List
   */
    const renderCardList = () => {
        const texts = [
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem magni quas ex numquam, maxime minus quam molestias corporis quod, ea minima accusamus.',
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod tenetur ex natus at dolorem enim! Nesciunt pariatur voluptatem sunt quam eaque, vel, non in id dolore voluptates quos eligendi labore.,',
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem magni quas ex numquam, maxime minus quam molestias corporis quod, ea minima accusamus.',
        ];

        return (<Container>
            <Row>
                {texts.map((text, index) => {
                    return <Col md={8} key={`card_${index}`} className="mb-5">
                        <Card className="h-100">
                            <CardBody>
                                <CardTitle>Card One</CardTitle>
                                <CardText>{text}</CardText>
                            </CardBody>
                            <CardFooter>
                                <a href="#!">More Info</a>
                            </CardFooter>
                        </Card>
                    </Col>;
                })}

            </Row>
        </Container>);

    };

    const renderSidebar = () => {
        return <SidebarContainer>
            <Sidebar>
                <Menu>
                    <MenuList>
                        <MenuItem>
                            <MenuLink to="/">Welcome</MenuLink>
                        </MenuItem>
                        <MenuItem>
                            <MenuLink to="/props-try" isActive>Props Try</MenuLink>
                        </MenuItem>
                        <MenuItem>
                            <MenuLink to="#">Example</MenuLink>
                        </MenuItem>
                    </MenuList>
                </Menu>

            </Sidebar>
        </SidebarContainer>;
    };


    /**
   * Footer
   */
    const renderFooter = () => {
        return <Footer className="py-3">
            <Container className="px-4 px-lg-5"><p className="m-0 text-center">Copyright © 2022 imagine, Inc</p></Container>
        </Footer>;
    };


    return (
        <GridThemeProvider gridTheme={{}}>
            {renderNav()}

            <MainWrapper>


                {renderSidebar()}
                <Content>
                    <Router/>
                </Content>

            </MainWrapper>

            {/*{renderNews()}*/}
            {/*{renderHeader()}*/}
            {/*{renderCardList()}*/}
            {renderFooter()}
        </GridThemeProvider>
    );
};

export default HomeRoot;

const MainWrapper = styled.div`
    flex: 1 0 auto;
    display: flex;
    box-sizing: border-box;
`;

const MenuLink = styled(Link)<{
  isActive?: boolean;
}>`
  color: #dadde1;
  display:flex;
      flex: 1;
    justify-content: space-between;
    line-height: 1.25;
    border-radius: 0.25rem;
    transition: background .2s 0s;
    padding: 6.375px 17px;
    
    
    :after{
        content: '';
        background:  50%/2rem 2rem;
        min-width: 1.25rem;
        filter: invert(1) sepia(0.94) saturate(0.17) hue-rotate(223deg) brightness(1.04) contrast(0.98);
        transform: rotate(90deg);
    }
  
  ${props => props.isActive && css`
      color: #09d3ac;
  `}
`;

const MenuItem = styled.li`
  cursor: pointer;
  :hover{
    background-color: hsl(0deg 0% 100% / 5%);
  }

`;
const MenuList = styled.ul`
    list-style: none;
    margin: 0;
    padding-left: 0;

`;
const Menu = styled.nav`
  font-weight: 500;
      flex-grow: 1;
    padding: 0.5rem;
        overflow-x: hidden;
`;

const Content = styled.div`
  flex: 1;
  padding-bottom: 2rem;
  padding-top: 1rem;
`;


const Sidebar = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    max-height: 100vh;
    padding-top: 60px;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    transition: opacity 50ms;
`;

const SidebarContainer = styled.aside`
      border-right: 1px solid #606770;
    clip-path: inset(0);
    display: block;
    margin-top: -63.75px;
    transition: width 0.2s ease;
    width: 300px;
    will-change: width;
`;


const StyledCol =styled(Col)`
  border: dotted 1px #bdbdbd;
`;


const Footer = styled.footer`
  background-color: #303846;
  color: #fff;
  
  
  

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


const NavLink = styled.a<{
  isActive?: boolean
}>`
  display: block;
  padding: 0.5rem 1rem;
  text-decoration: none;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;
  color: ${props => props.isActive ? '#fff' : 'rgba(255, 255, 255, 0.55)'}; 
  
`;

const NavItem = styled.li`
  list-style: none;
`;

const NavbarNav = styled.ul`
   flex: 1;
   display: flex;
   flex-direction: row;
   justify-content: flex-end;
`;

const NavbarBrand = styled.div`
  padding-top: 0.3125rem;
    padding-bottom: 0.3125rem;
    margin-right: 1rem;
    text-decoration: none;
    white-space: nowrap;
    
    font-weight: 700;
    color: #fff;
`;


const Nav = styled.nav`
   background-color: #242526;
   color: #fff;
   
     flex-wrap: nowrap;
    justify-content: flex-start;
    
    display: flex;
    align-items: center;
    height: 63.75px;
    
    position: sticky;
    top: 0;
    z-index: 14;
`;
