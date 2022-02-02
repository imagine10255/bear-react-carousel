import styled from 'styled-components/macro';


/**
 * 找不到頁面
 */
const NotFound = () => (
    <Container>
        <div>
            <Title>404</Title>
            <Content>
                <H2>This page could not be found.</H2>
            </Content>
        </div>
    </Container>
);

export default NotFound;


// const NotFoundImage = styled.img`
//   width: 400px;
//   height: auto;
// `;


const Title = styled.h1`
    display:inline-block;
    border-right:1px solid rgba(0, 0, 0,.3);
    margin:0;
    margin-right:20px;
    padding:10px 23px 10px 0;
    font-size:24px;
    font-weight:500;
    vertical-align:top;
`;

const H2 = styled.h2`
    font-size:14px;
    font-weight:normal;
    line-height:inherit;
    margin:0;
    padding:0;
`;

const Content = styled.div`
    display:inline-block;
    margin:0;
    margin-right:20px;
    padding:10px 23px 10px 0;
    font-size:24px;
    font-weight:500;
    vertical-align:top;
`;

const Container = styled.div`
    width: 100%;
    color:hsla(0,0%,100%,.9);
    //background:#fff;
    font-family:-apple-system, BlinkMacSystemFont, Roboto, Segoe UI, Fira Sans, Avenir, Helvetica Neue, Lucida Grande, sans-serif;
    height:100vh;
    text-align:center;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
`;
