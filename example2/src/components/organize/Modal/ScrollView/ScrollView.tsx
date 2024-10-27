import styled from 'styled-components';


interface IProps extends FCChildrenProps{
}

/**
 * ScrollView
 */
const ScrollView = ({
    className,
    style,
    children,
}: IProps) => {

    return (
        <ScrollViewRoot className={className} style={style}>
            {/* 內容 */}
            {children}
        </ScrollViewRoot>
    );
};

export default ScrollView;

const ScrollViewRoot = styled.div`
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;

    *{
      -webkit-overflow-scrolling: touch;
    }

    flex: 1 1 0;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
`;
