import styled from 'styled-components';
import {Grid, Container, Flex} from 'bear-react-grid';

interface IProps extends FCProps {
}

const Info = ({
    className,
}: IProps) => {

    return <InfoRoot className={className} col={6}>
        <Flex className="flex-column justify-items-center text-center gap-2">
            <SubTitle>WHO’S BEHIND</SubTitle>
            <Title>Meet the instructors</Title>
            <Desc>We all try to be consistent with our way of teaching step-by-step, providing source files and prioritizing design in our courses.</Desc>
        </Flex>
    </InfoRoot>;
};

export default Info;


const Desc = styled.p`
    font-size: 17px;
`;

const Title = styled.h2`
    font-weight: bold;
    font-size: 40px;
`;
const SubTitle = styled.p`
    font-weight: 600;
    font-size: 15px;
`;

const InfoRoot = styled(Container)`
    margin-bottom: 40px;
`;
