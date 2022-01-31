import { Container } from 'imagine-react-styled-grid'
import React from 'react'
import styled from 'styled-components/macro'


const Navbar = () => {
  return <Nav>
    <Container className="d-flex" fluid>
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

export default Navbar;



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
