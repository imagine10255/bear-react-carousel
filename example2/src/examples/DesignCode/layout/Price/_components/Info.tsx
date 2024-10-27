import styled from 'styled-components';
import {Grid, Container, Flex} from 'bear-react-grid';

interface IProps extends FCProps {
}

const Info = ({
    className,
}: IProps) => {

    return <InfoRoot className={className}>
        <Flex col="column" className="justify-items-center text-center gap-3">
            <Title>Ready to start?</Title>
            <Desc>Get access to all our premium courses, tutorials, downloads, certificates and priority support.</Desc>
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

const InfoRoot = styled(Container)`
  max-width: 420px;
    margin-bottom: 40px;
`;
