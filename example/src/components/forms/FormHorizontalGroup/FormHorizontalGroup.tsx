import styled, {css} from 'styled-components/macro';
import {Col, Row} from 'imagine-react-styled-grid';



interface IProps extends FCChildrenProps {
    dataDirection?: 'column'|'row';
    label?: string;
    labelCol?: number,
    formCol?: number,
}

const FormHorizontalGroup = ({
    style,
    className,
    children,
    dataDirection = 'row',
    label = '',
    labelCol = 8,
    formCol = 10,
}: IProps) => {
    return (<FormGroup className={className} style={style}>
        <Col col={labelCol} className="d-flex flex-column justify-content-start">
            <FormLabel>{label}</FormLabel>
        </Col>
        <Col col={formCol}>
            <FormData dataDirection={dataDirection}>
                {children}
            </FormData>
        </Col>
    </FormGroup>);
};


export default FormHorizontalGroup;



const FormGroup = styled(Row)`
    margin-bottom: 16px;
`;

const FormLabel = styled.label`
    color: #7d8490;
    font-size: 14px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    min-height: 35px;
`;


const FormData = styled.div<{
    dataDirection?: 'column'|'row',
}>`
    color: #7d8490;
    font-size: 14px;
    display: flex;

    align-items: center;
    min-height: 35px;
    flex-direction: ${props => props.dataDirection};

    ${props => props.dataDirection === 'column' && css`
         align-items: flex-start;
    `}
`;
