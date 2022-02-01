import {Container} from 'bear-styled-grid';
import React from 'react';
import styled, {css} from 'styled-components/macro';
import {Link, useLocation} from 'react-router-dom';
import {IMenu, menu} from 'config/menu';



const renderMenu: any = (rows: IMenu[], lv = 1, pathname = '') => {
    return rows.map(row => {
        const isActive = row?.href ? pathname.startsWith(row?.href): false;

        return <>
            <MenuItem lv={lv} isActive={isActive}>
                {row.href ?
                    <MenuLink to={row.href}>{row.name}</MenuLink> :
                    <MenuTitle>{row.name}</MenuTitle>
                }
            </MenuItem>
            {row.children && renderMenu(row.children, lv + 1, pathname)}
        </>;
    });
};


/**
 * 左側選單
 * @constructor
 */
const Sidebar = () => {
    const location = useLocation();

    const menuEl = renderMenu(menu, 1, location.pathname);

    return <SidebarContainer>
        <SidebarContent>
            <Menu>
                <MenuList>
                    {menuEl}
                </MenuList>
            </Menu>

        </SidebarContent>
    </SidebarContainer>;
};

export default Sidebar;



const MenuTitle = styled.div`
    color: #a3a4a8;

`;

const MenuLink = styled(Link)`
    color: #dadde1;

    :after{
        content: '';
        background:  50%/2rem 2rem;
        min-width: 1.25rem;
        filter: invert(1) sepia(0.94) saturate(0.17) hue-rotate(223deg) brightness(1.04) contrast(0.98);
        transform: rotate(90deg);
    }

`;

const MenuItem = styled.li<{
    lv?: number
    isActive?: boolean
}>`
  cursor: pointer;

  ${props => props.lv && css`
    padding-left: ${(props.lv - 1) * 2 * .5}rem;
  `}

  :hover{
    background-color: hsl(0deg 0% 100% / 5%);
  }
  
  ${MenuLink}, ${MenuTitle}{
      display:flex;
      flex: 1;
        justify-content: space-between;
        line-height: 1.25;
        border-radius: 0.25rem;
        transition: background .2s 0s;
        padding: 6.375px 17px;
      text-decoration: none;


  }

   ${props => props.isActive && css`
      background-color: hsl(0deg 0% 100% / 5%);
      
      ${MenuLink}{
          color: ${props.theme.primaryColor};
      }
      
  `}

`;


const MenuList = styled.ul`
    list-style: none;
    margin: 0;
    padding-left: 0;

    ul{
      padding-left: 10px;
    }

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
    flex: 0 0 300px;
    will-change: width;
`;
