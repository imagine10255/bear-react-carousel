import React, {memo} from 'react';

import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {a11yDark as style} from 'react-syntax-highlighter/dist/esm/styles/prism';
import styled from 'styled-components/macro';


interface IProps extends FCProps {
  children: string,
  wrapLongLines?: boolean,
  language?: 'typescript'|'javascript'|'bash',
}


/**
 * 程式碼高亮
 * ref: https://react-syntax-highlighter.github.io/react-syntax-highlighter/demo/
 * @param className
 * @param children
 * @param wrapLongLines
 * @param language
 */
const Code = ({
    className,
    children= '',
    wrapLongLines = true,
    language = 'typescript'
}: IProps) => {

    return <CodeRoot className={className}
    >
        <SyntaxHighlighter
            language={language}
            wrapLongLines={wrapLongLines}
            style={style}
        >
            {children.replace(/^\s+|\s+$/g, '')}
        </SyntaxHighlighter>
    </CodeRoot>;

};


export default memo(Code);


const CodeRoot = styled.div`
  margin-bottom: 20px;
  font-size: 14px;
  white-space: pre-wrap;
`;
