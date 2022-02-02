import React, {memo, ReactNode} from 'react';

import styled from 'styled-components/macro';


interface IProps extends FCProps {
  children: ReactNode,
}


/**
 * Important Note
 * @param className
 * @param children
 */
const ImportantNote = ({
    className,
    children= '',
}: IProps) => {

    return <ImportantNoteRoot className={className}
    >
        {children}
    </ImportantNoteRoot>;

};


export default memo(ImportantNote);


const ImportantNoteRoot = styled.div`

    border-left: 4px ${props => props.theme.dangerColor} solid;
    padding: 1rem 1.25rem;
    
    margin-bottom: 20px;
    background-color: rgba(185, 28, 28, .4);
    color: #fff;
    
    
    p{
      padding-bottom: 10px;
      line-height: 0;
      
      &:last-child{
        padding-bottom: 0;
      }
    }
`;
