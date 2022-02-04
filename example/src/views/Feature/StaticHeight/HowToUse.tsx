import React from 'react';
import Code from 'components/atoms/Code';
import {SubTitle} from '../../_components/Content';


/**
 * How To Use
 */
const HowToUse = () => {

    return <>
        <SubTitle>How to use</SubTitle>
        <Code language="typescript">
            {`
<Carousel 
    data={slideItemData} 
    staticHeight="250px"
/>

        `}
        </Code>
    </>;
};

export default HowToUse;






