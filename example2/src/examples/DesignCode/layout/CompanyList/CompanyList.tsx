import {Container, Grid} from 'bear-react-grid';
import styled from 'styled-components';

interface IProps extends FCProps {

}

const CompanyList = ({
    className,
}: IProps) => {

    const data = [
        {text: 'square', imageUrl: 'https://designcode.io/images/company/square.svg'},
        {text: 'apple', imageUrl: 'https://designcode.io/images/company/apple.svg'},
        {text: 'facebook', imageUrl: 'https://designcode.io/images/company/facebook.svg'},
        {text: 'airbnb', imageUrl: 'https://designcode.io/images/company/airbnb.svg'},
        {text: 'google', imageUrl: 'https://designcode.io/images/company/google.svg'},
        {text: 'amazon', imageUrl: 'https://designcode.io/images/company/amazon.svg'},
    ];

    return <CompanyRoot className={className}>
        <Grid
            col={2}
            md={3}
            lg={6}
            className="justify-content-center place-items-center">
            {data.map(row => {
                return <Logo key={row.text} src={row.imageUrl} alt={row.imageUrl}/>;
            })}
        </Grid>

    </CompanyRoot>;
};

export default CompanyList;



const Logo = styled.img`
    filter: invert(100%);
`;

const CompanyRoot = styled(Container)`
  margin-bottom: 150px;
`;
