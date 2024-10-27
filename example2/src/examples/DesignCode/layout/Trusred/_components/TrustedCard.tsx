import styled from 'styled-components';

interface IProps extends FCProps {

}

const TrustedCard = ({
    className,
}: IProps) => {
    return <TrustedCardRoot className={className}>
        <Avatar src="https://images.ctfassets.net/ooa29xqb8tix/5Xcv2LZcS4seK4GAISkkY4/2e0906431a29b1db536dd8cc19b2b9d0/jMf9VFkU_400x400.jpeg?w=400&q=50"/>
        <Title>
            Kenny Chen
        </Title>
        <Desc>
            UX DESIGNER AT GOOGLE

            SENIOR UI/UX DESIGNER AT IBM

            As an old developer, I bought the first version of design+code on its release date, and 1 month after... I literally quit my company. It was such an eye-opener and interactive/comprehensive book, I couldn’t continue to work as before and had an urge for disruption and reinvention. Thanks for being a true lever for my personal career.
        </Desc>
    </TrustedCardRoot>;
};

export default TrustedCard;



const Desc = styled.p`
`;
const Title = styled.p`
    font-size: 20px;
`;

const Avatar = styled.img`
    width: 44px;
    height: 44px;
    border-radius: 99em;
`;


const TrustedCardRoot = styled.div`
    min-width: 200px;
    background: rgba(15, 14, 71, 0.5);
    border-radius: 20px;
    padding: 30px;
    box-shadow: rgba(255, 255, 255, 0.2) 0 0 0 0.5px inset;
    display: grid;
    gap: 8px;
    align-content: start;
    backdrop-filter: blur(40px);
`;
