import ImportantNote from 'components/atoms/ImportantNote ';
import React from 'react';
import styled from 'styled-components/macro';
import {useLocale} from 'library/intl';
import Content, {Desc, SubTitle} from 'views/_components/Content';




/**
 * About
 */
const About = () => {
    const {i18n} = useLocale();

    const featureDescList = new Array(11).fill('');

    return <Content
        title={i18n('page.about.title')}
    >
        <ImportantNote text={i18n('page.about.desc')}/>

        <SubTitle>{i18n('page.about.feature.title')}</SubTitle>
        <Ul>
            {featureDescList.map((row, index) => {
                return <Li>{i18n(`page.about.feature.desc${index+1}`)}</Li>;
            })}
        </Ul>
    </Content>;
};

export default About;



const Li = styled.li`
  color: #fff;
  margin-bottom: 10px;
`;


const Ul = styled.ul`
  list-style: disc;
  padding-left: 20px;
`;
