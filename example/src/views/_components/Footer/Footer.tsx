import {Container} from 'imagine-react-styled-grid';
import React from 'react';
import styled from 'styled-components/macro';


const Footer = () => {
    return <FooterRoot className="py-3">
        <Container className="px-4 px-lg-5"><p className="m-0 text-center">Copyright © 2022 imagine, Inc</p></Container>
    </FooterRoot>;
};

export default Footer;



const FooterRoot = styled.footer`
  background-color: #303846;
  color: #fff;
`;
