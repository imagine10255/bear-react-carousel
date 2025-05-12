import {FCChildrenProps} from '@acrool/react-grid';
import {ForwardedRef, forwardRef} from 'react';
import styled from 'styled-components';


interface IProps extends FCChildrenProps {
    disabled?: boolean
    type?: 'button'|'submit'|'reset'
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
    onFocus?: () => void
}


/**
 * 基礎的 Button, Non Padding
 * @param className
 * @param type
 * @param onClick
 * @param onPointerDown
 * @param onFocus
 * @param children
 * @param disabled
 * @param spring
 * @param ref
 */
const BaseButton = ({
    className,
    type = 'button',
    onClick,
    onFocus,
    children,
    disabled = false,
}: IProps, ref?: ForwardedRef<HTMLButtonElement>) => {


    return <BaseButtonRoot
        ref={ref}
        className={className}
        type={type}
        onClick={onClick}
        onFocus={onFocus}
        disabled={disabled}
    >
        {children}
    </BaseButtonRoot>;
};

export default forwardRef(BaseButton);





const BaseButtonRoot = styled.div`
    padding: 0;
    display: block;
    color: inherit;
    user-select: none;
`;
