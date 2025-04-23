import {media, FCProps} from '@acrool/react-grid';
import styled, {css} from 'styled-components';

import {asset} from '../../../utils';

interface IProps extends FCProps {
    title: string
    desc: string
    isActive: boolean
}


/**
 * 服務項目卡片
 * @param className
 * @param iconCode
 * @param title
 * @param desc
 * @param isActive
 * @constructor
 */
const ServiceCard = ({
    className,
    title,
    desc,
    isActive,
}: IProps) => {
    return <ServiceCardRoot className={className} isActive={isActive}>
        <ServiceIcon>
            <img src={asset("/images/service_carousel/union.svg")} width="50" height="50"/>
        </ServiceIcon>
        <ServiceTitle className="text">{title}</ServiceTitle>
        <ServiceDesc>{desc}</ServiceDesc>
    </ServiceCardRoot>;
};

export default ServiceCard;


const ServiceDesc = styled.div`
    font-size: 14px;
    font-weight: 400;
    color: #FFFFFF;
    text-align: center;

    ${media.xl`
        font-size: 16px;
    `}
`;

const ServiceTitle = styled.div`
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 10px;
    text-align: center;

    background: linear-gradient(90deg, #FFAFAF 0%, #2AD5FA 49.5%, #8951FF 100%);
    background-clip: text;
    color: #fff;
    transition: color .5s;
`;

const ServiceIcon = styled.div`
    width: 70px;
    height: 70px;
    border-radius: 14px;
    background: #FFFFFF1A;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    flex: 0 0 auto;
`;

const ServiceCardRoot = styled.div<{
    isActive: boolean,
}>`
    width: 100%;
    padding: 50px 30px;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    overflow: hidden;
    background-color: #18181A;

    border: 1px solid transparent;

    &:before{
      content: '';
      position: absolute;
      background-image: url(${asset("/images/service_carousel/union.svg")});
      background-size: cover;
      background-repeat: no-repeat;
      width: 100%;
      padding-bottom: 100%;
      top: 0;
      left: 0;
      background-position-x: -160px;
      background-position-y: -30px;
      opacity: 0;
      z-index: 0;

      transition: opacity .5s;
    }


  ${props => props.isActive && css`
    .text{
      color: transparent;
    }

    &:before{
      opacity: 1;
    }
  `}

`;
