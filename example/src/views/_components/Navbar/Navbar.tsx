import {Container} from 'bear-styled-grid';
import React, {useCallback, useEffect} from 'react';
import styled from 'styled-components/macro';


const Navbar = () => {

    useEffect(() => {
        window.addEventListener('resize', onResize, true);

        onResize();
    }, []);

    const onResize = useCallback(() => {
        const dom = document.getElementById('debug-resize');
        if(dom){
            dom.innerHTML = `${window.innerWidth}px`;
        }
    }, []);

    return <Nav>
        <Container className="d-flex" fluid>
            <NavbarBrand>Bear Carousel</NavbarBrand>

            <NavbarNav className="ml-auto my-0 d-none d-md-flex">
                <NavItem>
                    <NavLink href="#!" isActive>Docs</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#!">GitHub</NavLink>
                </NavItem>

            </NavbarNav>

            <DebugSize id="debug-resize"/>
        </Container>
    </Nav>;
};

export default Navbar;


const DebugSize = styled.div`
  position: absolute;
  bottom: -20px;
  right: 0;
  padding-right: 30px;
  color: ${props => props.theme.primaryColor};
  z-index: 1;
  font-size: 11px;
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
