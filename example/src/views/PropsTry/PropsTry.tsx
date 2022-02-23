import React, {useState} from 'react';
import styled from 'styled-components/macro';

import Content from 'views/_components/Content';
import PropsTryCarousel from './PropsTryCarousel';


/**
 * Props Try
 */
const PropsTry = () => {
    const [isLoadData, setIsLoadData] = useState<boolean>(true);

    return <Content
        title="PropsTry"
        desc="All available incoming parameters allow you to test and preview the results"
        isLoadData={isLoadData}
        onLoadData={setIsLoadData}
    >

        <PropsTryCarousel isLoadData={isLoadData}/>
    </Content>;

};

export default PropsTry;



const PageControlBox = styled.div`
  padding: 8px;
  border: 1px dotted #00a3e0;
  width: auto;
  display: flex;
  flex-wrap: wrap;
  color: #fff;
  margin-bottom: 20px;
`;

