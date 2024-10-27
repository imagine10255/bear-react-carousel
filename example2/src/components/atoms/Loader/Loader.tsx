import {memo} from 'react';
import styled, {keyframes} from 'styled-components';

import {asset} from '@/utils';


interface IProps extends FCProps{
    size?: number
}

/**
 * Loader
 */
const Loader = ({
    style,
    className,
    size = 30,
}: IProps) => {
    return (
        <LoaderRoot
            style={style}
            className={className}
        >
            <LoaderImage
                src={asset('/images/loading.svg')}
                size={size}
            />
        </LoaderRoot>
    );
};

export default Loader;

const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const LoaderImage = styled.img<{
    size?: number,
}>`
    width: ${props => props.size}px;
    height: ${props => props.size}px;
    opacity: 0.5;
    animation: ${rotateAnimation} .5s linear infinite;
  color: var(--primary-color);
`;

const LoaderRoot = styled.div``;
