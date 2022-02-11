import React, {ReactNodeArray, Fragment, useMemo} from 'react';
import {media} from 'bear-styled-grid';
import styled, {css} from 'styled-components/macro';
import {Link, useLocation} from 'react-router-dom';
import {IMenu, menu} from 'config/menu';
import {useSidebar} from 'provider/SidebarProvider';
import {Icon} from 'bear-components/atoms';



const renderMenu = (rows: IMenu[], lv = 1, pathname = ''): ReactNodeArray => {
    return rows.map((row, index) => {
        const isActive = row?.href === '/' ? pathname === '/' : row?.href ? pathname.startsWith(row?.href): false;

        return <Fragment key={`sidebar__menu-${index}`}>
            <MenuItem lv={lv} isActive={isActive}>
                {row.href ?
                    <MenuLink to={row.href}>{row.name}</MenuLink> :
                    <MenuTitle>{row.name}</MenuTitle>
                }
            </MenuItem>
            {row.children && renderMenu(row.children, lv + 1, pathname)}
        </Fragment>;
    });
};


/**
 * 左側選單
 * @constructor
 */
const Sidebar = () => {
    const {isExpend, toggleExpend} = useSidebar();


    const location = useLocation();

    const sidebarMenu = menu();

    const menuEl = renderMenu(sidebarMenu, 1, location.pathname);


    return <>
        <SidebarContainer isExpend={isExpend}>
            <SidebarContent>
                <Menu>
                    <MenuList>
                        {menuEl}
                    </MenuList>



                </Menu>



            </SidebarContent>
        </SidebarContainer>
        <SidebarMask onClick={() => toggleExpend()}/>
    </>;
};

export default Sidebar;

const OutLink = styled.div`
    margin-bottom: 1.2em;
    color: #00a3e0;
`;

const LocaleList = styled.div`
  padding: 20px;

`;


const SidebarMask = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0, .4);
  opacity: 1;
  pointer-events: auto;
  transition: opacity .4s;
  z-index: ${props => props.theme.layout.sidebarZIndex - 1};
`;

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
`;

const SidebarContainer = styled.aside<{
  isExpend: boolean,
}>`
    position: fixed;
    z-index: ${props => props.theme.layout.sidebarZIndex};
    background-color: #18191a;
    display: block;
    clip-path: inset(0);
    padding-top: 60px;
    top: 0;
    left: 0;
    bottom: 0;
    border: 0;
    will-change: transform, margin-right;
    transition: transform .2s ease, margin-right .2s ease;
    width: ${props => props.theme.layout.sidebarWidth}px;
    flex: 0 0 ${props => props.theme.layout.sidebarWidth}px;
    transform: translateX(0px) translateZ(0px);
      
    ${props => !props.isExpend && css`
      transform: translateX(-${props.theme.layout.sidebarWidth}px) translateZ(0px);
      
      
      + ${SidebarMask}{
          opacity: 0;
          pointer-events: none;
      }
    `}
    
    
    ${media.lg`
      transform: translateX(0) translateZ(0);
    `}
    
    
`;
