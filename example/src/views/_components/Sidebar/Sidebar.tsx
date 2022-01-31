import {Container} from 'imagine-react-styled-grid';
import React from 'react';
import styled, {css} from 'styled-components/macro';
import {Link} from 'react-router-dom';


const Sidebar = () => {
    return <SidebarContainer>
        <SidebarContent>
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

        </SidebarContent>
    </SidebarContainer>;
};

export default Sidebar;



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


const SidebarContent = styled.div`
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
