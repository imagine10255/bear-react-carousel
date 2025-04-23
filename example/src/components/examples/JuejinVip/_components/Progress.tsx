import React from 'react';
import styled from 'styled-components';
import {FCProps} from "@acrool/react-grid";

interface IProps extends FCProps {
    value: number
}

const Progress = ({
    className,
    value,
}: IProps) => {
    return <ProgressRoot className={className}>
        <Value style={{width: `${value}%`}}/>
    </ProgressRoot>;
};

export default Progress;


const Value = styled.div`
  height: 100%;
  width: 100%;
  background-color: #fff;
  border-radius: 20px;
  mask-image: linear-gradient(to right, transparent 0, rgba(255, 255, 255, 0.9) 100%);
`;


const ProgressRoot = styled.div`
  width: 170px;
  background-color: rgba(14, 134, 255, 0.41);
  height: 6px;
  border-radius: 20px;
`;
