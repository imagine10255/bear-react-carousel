import styled from 'styled-components/macro';
import React from 'react';
import {Icon} from 'bear-components/atoms';



/**
 * Logo
 */
const Logo = () => {


    return (
        <LogoRoot>
            <Icon code="carousel" size={36} color="primary"/>
        </LogoRoot>
    );
};

export default Logo;

const LogoRoot = styled.div`
  
   
`;
