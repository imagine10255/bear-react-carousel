import cx from 'classnames';
import styled, {css, keyframes} from 'styled-components/macro';


interface IProps extends FCProps{
    type?: 'fontClass' | 'svg';
    onClick?: Function;
    size?: number;
    color?: string|'inherit'|'primary'|'secondaryColor';
    code: string;
    isRotateAnimation?: boolean;
    rotate?: number;
}


const getSVG = (code: string) => {
    return '';
};

/**
 * Icon
 * 依賴阿里巴巴Iconfont服務
 *
 * 若使用SVG, 需要iconfont 裡面有 empty 空白圖像來靠 font-size 撐開寬高一至
 */
const Icon = ({
    style,
    className,
    type = 'fontClass',
    onClick,
    size = 22,
    color = '#bdbdbd',
    code,
    isRotateAnimation = false,
    rotate,
}: IProps) => {
    return (
        <IconRoot
            style={style}
            className={cx(className, 'iconfont',
                {
                    [`icon-${code}`]: type === 'fontClass',
                },{
                    'icon-empty': type === 'svg',
                },
            )}
            isRotateAnimation={isRotateAnimation}
            onClick={onClick}
            code={code}

            type={type}
            size={size}
            rotate={rotate}
            color={color}
        />
    );
};

export default Icon;

const rotateAnimine = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const IconRoot = styled.i<{
    type: 'svg'|'fontClass'
    onClick: any,
    isRotateAnimation?: boolean,
    size?: number,
    rotate?: number,
    code: string,
}>`
        position: relative;
        z-index: 0;
        display: inline-flex;
        align-items: center;
        justify-content: center;

        color: inherit;
        font-size: ${props =>  props.size}px;
        font-weight: 100;
        line-height: normal;

        width: auto;
        height: auto;

        vertical-align: middle;
        fill: currentColor;
        margin: 0;

        ${props => props.color && css`
            color: ${props.color === 'primary' ? props.theme.primaryColor :
        props.color === 'secondary' ? props.theme.secondaryColor :
            props.color
};
    
        `}

        ${props =>  props.isRotateAnimation && css`
            animation: ${rotateAnimine} 1s linear infinite;
        `}

        &:before {
            display: flex;
            align-items: center;
            justify-content: center;

            margin: auto;

            ${props =>  props.rotate && css`
                transform: rotate(${props.rotate}deg);
            `}
        };

        ${props => props.type === 'svg' && css`
              background: transparent url("${getSVG(props.code)}") center center no-repeat;
              background-size: 100%;

              &:before {
                color: transparent;
             };
        `}
        
        &.icon-empty{
            color: transparent;
        }
`;
