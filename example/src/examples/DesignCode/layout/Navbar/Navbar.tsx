import styled from 'styled-components';
import {Grid, Container, media} from 'bear-react-grid';
import React, {useState} from 'react';
import CourseButton from '../_components/CourseButton';

interface IProps extends FCProps {
   className?: string
}

const Navbar = ({
    className,
}: IProps) => {
    const [isVisible, setVisible] = useState(false);


    const nav = [
        {text: 'Docs', path: '/docs/why'},
        {text: 'Features', path: '/docs/category/feature'},
        {text: 'Examples', path: '/docs/category/examples'},
        {text: 'Props Try', path: '/docs/props-try'},
        {text: 'Blog', path: '/docs/blog'},
    ];

    return <NavbarRoot className={className}>
        <a href="/">
            <Logo src="https://designcode.io/images/logos/logo.svg" alt="logo"/>
        </a>

        <MobileWrapper className="d-md-none">
            <MobileButton type="button" onClick={() => setVisible(curr => !curr)}>
                <img src="https://designcode.io/images/icons/hamburger-menu.svg" alt="menu"/>
            </MobileButton>
            <TooltipWrapper columns={1} gap="10px" data-visible={isVisible ? '': undefined}>
                {nav.map(row => {
                    return <NavigatorButton href={row.path} key={row.path}>
                        <img src="https://designcode.io/images/icons/courses.svg" alt="cc"/>
                        <Caption>{row.text}</Caption>
                    </NavigatorButton>;
                })}
            </TooltipWrapper>
        </MobileWrapper>


        <Grid col={5} className="d-none d-md-grid">
            {nav.map(row => {
                return <NavigatorButton href={row.path} key={row.path}>
                    <img src="https://designcode.io/images/icons/courses.svg" alt="cc"/>
                    <Caption>{row.text}</Caption>
                </NavigatorButton>;
            })}
        </Grid>

    </NavbarRoot>;

};

export default Navbar;


const TooltipWrapper = styled(Grid)`
    position: absolute;
    max-width: 260px;
    margin-top: 10px;
    padding: 20px;
    right: 0;
    background: rgba(15, 14, 71, 0.3);
    box-shadow: rgba(255, 255, 255, 0.2) 0px 0px 0px 0.5px inset;
    backdrop-filter: blur(40px) brightness(80%) saturate(150%);
    border-radius: 20px;
    visibility: hidden;
    opacity: 0;
    transition: all 0.8s cubic-bezier(0.075, 0.82, 0.165, 1) 0s;
    transform-origin: center top;
    transform: skewY(-5deg) rotate(5deg) translateY(-30px);

    &[data-visible]{
        transform: skewY(0deg) rotate(0deg) translateY(0px);
        visibility: visible;
        opacity: 1;
    }
`;


const MobileButton = styled.button`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    width: 44px;
    height: 44px;
    right: 0;
    border-radius: 50%;
    background: rgba(15, 14, 71, 0.3);
    box-shadow: rgba(255, 255, 255, 0.2) 0 0 0 0.5px inset;
    backdrop-filter: blur(40px);
    cursor: pointer;
`;


const MobileWrapper = styled.div`
    perspective: 1000px;
    position: relative;
    z-index: 2;

`;



const Caption = styled.p`
  font-weight: 500;
  font-size: 15px;
  margin-left: 10px;
`;

const NavigatorButton = styled(CourseButton)`
    justify-content: flex-start;
`;


const Logo = styled.img`
  width: 44px;
  height: 44px;
`;


const NavbarRoot = styled(Container)`
  display: flex;
  justify-content: space-between;
`;
