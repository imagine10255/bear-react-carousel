import {media} from '@acrool/react-grid';
import CSS from 'csstype';
import {ReactNode} from 'react';
import styled, {css} from 'styled-components';



interface IProps {
    style?: CSS.Properties
    className?: string
    title?: string
    fluid?: boolean
    direction?: 'row'|'column'
    onClick?: () => void
    isGutter?: boolean
    children: ReactNode
}

/**
 * Card
 */
const Card = ({
    style,
    className,
    children,
    title,
    fluid = false,
    direction= 'row',
    onClick,
    isGutter = false,
}: IProps) => {

    return (
        <CardRoot style={style}
            className={className}
            onClick={onClick}
            isGutter={isGutter}
        >
            <CardBody direction={direction} fluid={fluid} className="gap-2">
                {title && <CardTitle>{title}</CardTitle>}
                {children}
            </CardBody>

        </CardRoot>
    );
};

export default Card;



const CardBody = styled.div<{
    fluid?: boolean,
    direction?: 'row'|'column',
}>`
    height: 100%;
    display: flex;
    //overflow: hidden; // 影響正常項目跑版
    flex-direction: ${props => props.direction === 'column' ? 'column': 'row'};
    padding: ${props => props.fluid ? 0: '5px 10px'};

    ${props => media.lg`
      padding: ${props.fluid ? 0: '10px 20px'};
    `}
`;

const CardTitle = styled.h3`
    font-size: 15px;
    color: var(--primary-color2);
    font-weight: 600;
    font-style: italic;
    margin-bottom: 20px;
    text-transform: uppercase;
`;

const CardRoot = styled.div<{
    isGutter: boolean,
}>`

  //margin-bottom: 15px;
  min-width: 0;


  border: 1px solid rgba(0,0,0,.125);
    border-color: #343a40;
    background: #2b3035;
    //padding-top: 12px;
    //padding-bottom: 12px;
  color: #7d8490;
  border-radius: .55rem;
  position: relative;
  width: 100%;


  ${props => props.isGutter && css`
      border-color: transparent;
      background: transparent;
      ${CardBody}{
          padding: 0;
      }
  `}



`;
