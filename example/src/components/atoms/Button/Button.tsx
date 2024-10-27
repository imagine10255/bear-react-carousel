import CSS from 'csstype';
import styled, {css} from 'styled-components';

import {getSize, getThemeColor} from './config';
import {TLabelSize, TThemeColor} from './types';
import {ReactNode} from 'react';



interface IProps {
    className?: string
    style?: CSS.Properties
    color?: TThemeColor
    size?: TLabelSize
    shape?: 'default' | 'circle' | 'raised'
    isBlock?: boolean
    isOutline?: boolean
    type?: 'button' | 'submit'|'reset'
    disabled?: boolean
    onClick?: (e?: React.MouseEvent) => void
    onMouseDown?: (e?: React.MouseEvent) => void
    stopPropagation?: boolean
    isLink?: boolean
    tabIndex?: number
    children: ReactNode
}

/**
 * Button
 */
const Button = ({
    className,
    style,
    children,
    color,
    type = 'button',
    size = 'md',
    isBlock = false,
    isOutline = false,
    onClick,
    onMouseDown,
    disabled = false,
    isLink = false,
    stopPropagation = false,
    tabIndex,
}: IProps) => {

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {

        if(stopPropagation){
            e.stopPropagation();
        }

        if(onClick){
            onClick(e);
        }
    };

    return (
        <ButtonRoot
            className={className}
            type={type}
            style={style}
            color={color}
            size={size}
            isBlock={isBlock}
            isOutline={isOutline}
            isLink={isLink}
            onClick={handleClick}
            onMouseDown={onMouseDown}
            disabled={disabled}
            tabIndex={tabIndex}
        >
            {children}
        </ButtonRoot>
    );
};



export default Button;


const ButtonRoot = styled.button<{
    isBlock?: boolean,
    isOutline?: boolean,
    isLink?: boolean,
    color?: TThemeColor,
    size?: TLabelSize,
    onClick?: any,
}>`

    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: relative;
    font-size: var(--button-font-size, 14px);
    font-weight: var(--button-font-weight);
    height: var(--button-height, 1);
    line-height: 1;
    padding: var(--button-padding, 0);
    border-radius: .25rem;
    transition: background .15s ease-in-out, color .15s ease-in-out,background-color .15s ease-in-out,box-shadow .15s ease-in-out, transform .15s;
    border: 0 solid #444;
    width: ${props => props.isBlock ? '100%': 'auto'};
    white-space:nowrap;
    box-shadow: none;


    ${props => getThemeColor(props.color)}
    ${props => getSize(props.size)}



    color: var(--button-text-color);
    background-color: var(--button-bg-color);
    background-image: var(--button-bg-image);
    border-color: var(--button-border-color);

    &:hover{
        color: #fff;
        background-color: var(--button-bg-hover-color);
        background-image: var(--button-bg-hover-image);
    }



    ${props => props.isOutline && css`
        color: var(--button-bg-color);
        border-color: var(--button-bg-color);
        background-color: transparent;
        background-image: radial-gradient(50% 62.62% at 50% 0%, transparent 0%, transparent 100%);
        border-width: 1px;

        &:hover{
          background-image: var(--button-bg-image);
          color: #fff;

        }
    `}




    &:disabled, &[disabled]{
        filter: grayscale(95%);

    };


    &:hover{
      text-decoration: none;
    }

    &:active:not(:disabled){
        transform: scale(.98);
    }


    &[type=button]:not(:disabled),
    &[type=reset]:not(:disabled),
    &[type=submit]:not(:disabled),
    &button:not(:disabled) {
        cursor: pointer;
    }


    @media print{
      display: none;
    }
`;

