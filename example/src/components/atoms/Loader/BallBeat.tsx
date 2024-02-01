import styled, {css} from 'styled-components';


interface IProps extends FCProps{
    size?: 'small' | 'normal'
}

/**
 * BallBeat
 */
const BallBeat = ({
    style,
    className,
    size = 'small',
}: IProps) => (
    <BallBeatRoot style={style} className={className} size={size}>
        <div/>
        <div/>
        <div/>
    </BallBeatRoot>
);

export default BallBeat;

const BallBeatRoot = styled.div<{
    size: 'small' | 'normal',
}>`
    /*
     * Animation
     */
    @-webkit-keyframes ball-beat {
        50% {
            opacity: .2;
            -webkit-transform: scale(.75);
            transform: scale(.75);
        }
        100% {
            opacity: 1;
            -webkit-transform: scale(1);
            transform: scale(1);
        }
    }
    @-moz-keyframes ball-beat {
        50% {
            opacity: .2;
            -moz-transform: scale(.75);
            transform: scale(.75);
        }
        100% {
            opacity: 1;
            -moz-transform: scale(1);
            transform: scale(1);
        }
    }
    @-o-keyframes ball-beat {
        50% {
            opacity: .2;
            -o-transform: scale(.75);
            transform: scale(.75);
        }
        100% {
            opacity: 1;
            -o-transform: scale(1);
            transform: scale(1);
        }
    }
    @keyframes ball-beat {
        50% {
            opacity: .2;
            -webkit-transform: scale(.75);
            -moz-transform: scale(.75);
            -o-transform: scale(.75);
            transform: scale(.75);
        }
        100% {
            opacity: 1;
            -webkit-transform: scale(1);
            -moz-transform: scale(1);
            -o-transform: scale(1);
            transform: scale(1);
        }
    }

    display: block;
    font-size: 0;
    color: var(--primary-color);

    > div {
        display: inline-block;
        float: none;
        background-color: currentColor;
        border: 0 solid currentColor;
        position: relative;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        width: 5px;
        height: 5px;
        margin: 4px;
        border-radius: 50%;
        -webkit-animation: ball-beat .7s -.15s infinite linear;
        -moz-animation: ball-beat .7s -.15s infinite linear;
        -o-animation: ball-beat .7s -.15s infinite linear;
        animation: ball-beat .7s -.15s infinite linear;

        ${props => props.size === 'normal' && css`
            width: 10px;
            height: 10px;
        `}
    }

    > div:nth-child(2n-1) {
        -webkit-animation-delay: -.5s;
        -moz-animation-delay: -.5s;
        -o-animation-delay: -.5s;
        animation-delay: -.5s;
    }
`;
