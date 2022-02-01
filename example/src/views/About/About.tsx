import React from 'react';
import styled from 'styled-components/macro';
import Content, {Desc, SubTitle} from 'views/_components/Content';




/**
 * Props Try
 */
const About = () => {

    return <Content
        title="About"
        desc={`
    This is a carousel developed directly using React + Flexbox,<br/>
    Regarding Bear Carousel, it's a carousel that only contains the features you need,<br/> 
    not too many cool effects, because those may make you useless and add other potential problems <br/> (complex usage, exceptions, file too large)
    `
        }
    >
        <SubTitle>what i want to achieve</SubTitle>
        <Ul>
            <Li>Use React + Flexbox directly, not javascript in secondary development into React</Li>
            <Li>Simple to use</Li>
            <Li>Supports both Web, Mobile</Li>
            <Li>Responsive Control Setting</Li>
            <Li>easier to customize</Li>
            <Li>Using Flexbox, don't write width in inline style</Li>
            <Li>Conditional limit re-rendering</Li>
            <Li>Make sure BearCarousel mounts, but the image data is showing problems due to slow loading of asynchronous data</Li>
        </Ul>
    </Content>;
};

export default About;




const Li = styled.li`
  color: #fff;
`;


const Ul = styled.ul`

`;
