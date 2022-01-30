import styled from 'styled-components/macro';



interface IProps extends FCChildrenProps{
    label?: string;
}

const FormVerticalGroup = ({
    style,
    className,
    children,
    label = '',
}: IProps) => {
    return (<FormGroup className={className} style={style}>
        <FormLabel>{label}</FormLabel>
        {children}
    </FormGroup>);
};


export default FormVerticalGroup;


export const FormGroup = styled.div`
    margin-bottom: 16px;
`;


export const FormLabel = styled.label`
    color: #7d8490;
    font-size: 14px;
    margin-bottom: 10px;
`;
