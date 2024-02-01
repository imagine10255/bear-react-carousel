import styled from 'styled-components';
import React from 'react';
import PurchaseButton from '../../_components/PurchaseButton';
import {Flex} from 'bear-react-grid';

interface IProps {
   className?: string
}

const Button = ({
    className,
}: IProps) => {
    return <ButtonRoot className={className}>
        <RingWrapper>
            <IconWrapper>
                <Icon src="https://designcode.io/images/icons/pricing-large.svg"/>
            </IconWrapper>

            <svg width="55" height="55" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="27.5" cy="27.5" r="26.5" stroke="url(#paint0_angular)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 20 8 1 10 8"/>
                <defs>
                    <radialGradient id="paint0_angular" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(27.5 27.5) rotate(107.904) scale(34.1541)">
                        <stop offset="0.0870822" stopColor="#844FFC"/>
                        <stop offset="0.69191" stopColor="#E1467C"/>
                    </radialGradient>
                </defs>
            </svg>
        </RingWrapper>


        <Flex className="flex-column text-left my-auto ml-2">
            <Title className="mb-1">
                    Get Pro Access
            </Title>
            <SubTitle>
                    $19 per month
            </SubTitle>
        </Flex>

    </ButtonRoot>;
};

export default Button;



const SubTitle = styled.p`

  font-weight: normal;
  font-size: 13px;
  margin: 0px;
  color: rgb(89, 92, 123) !important;
`;


const Title = styled.p`

  font-size: 15px;
  margin: 0;
  font-weight: 600;
  color: black !important;
`;



const Icon = styled.img`
  margin: auto;
  width: 29px;
  height: 29px;
`;


const IconWrapper = styled.div`
  position: absolute;
  width: 45px;
  height: 45px;
  background: linear-gradient(200.44deg, rgb(67, 22, 219) 13.57%, rgb(144, 118, 231) 98.38%);
  box-shadow: rgba(182, 153, 255, 0.3) 0px 10px 20px;
  border-radius: 50px;
  padding: 8px;
  margin: auto;
  display: flex;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
`;



const RingWrapper = styled.div`
  position: relative;
  width: 55px;
  height: 55px;

`;


const ButtonRoot = styled(PurchaseButton)`
`;
