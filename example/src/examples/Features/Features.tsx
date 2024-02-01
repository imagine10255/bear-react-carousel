import styled, {createGlobalStyle} from 'styled-components';
import Button from '@/components/Button';
import {Col, Container, Grid, Row, auto, Flex} from 'bear-react-grid';

interface IProps extends FCProps {

}

const Features = ({
    className,
}: IProps) => {


    const renderColumnIcons = () => {
        return <Container className="px-4 py-5" id="featured-3">
            <h2 className="pb-2 border-bottom">Columns with icons (Row)</h2>
            <Grid col={1} lg={3} className="g-4 py-5">
                {Array.from({length: 3}).map((row, idx) => {
                    return <div className="feature" key={`feature_${idx}`}>
                        <div
                            className="d-inline-flex align-items-center justify-content-center fs-2 mb-3">
                            <img src="/vite.svg" style={{width: '1em', height: '1em'}}/>
                        </div>
                        <h3 className="fs-2">Featured title</h3>
                        <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another
                            sentence and probably just keep going until we run out of words.</p>
                        <a href="#" className="icon-link">
                            Call to action
                            <img src="/vite.svg" style={{width: '1em', height: '1em'}}/>

                        </a>
                    </div>;
                })}
            </Grid>
        </Container>;
    };

    const renderColumnIcons2 = () => {
        return <Container className="px-4 py-5" id="featured-3">
            <h2 className="pb-2 border-bottom">Columns with icons (GridRow)</h2>
            <Grid col={1} lg={3} className="g-4 py-5">
                {Array.from({length: 3}).map((row, idx) => {
                    return <div className="feature" key={`feature_${idx}`}>
                        <div
                            className="d-inline-flex align-items-center justify-content-center fs-2 mb-3">
                            <img src="/vite.svg" style={{width: '1em', height: '1em'}}/>
                        </div>
                        <h3 className="fs-2">Featured title</h3>
                        <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another
                            sentence and probably just keep going until we run out of words.</p>
                        <a href="#" className="icon-link">
                            Call to action
                            <img src="/vite.svg" style={{width: '1em', height: '1em'}}/>

                        </a>
                    </div>;
                })}
            </Grid>
        </Container>;
    };


    const renderHanding = () => {
        return <Container className="px-4 py-5" id="hanging-icons">
            <h2 className="pb-2 border-bottom">Hanging icons (GridRow)</h2>
            <Grid col={1} lg={3} className="g-4 py-5">
                {Array.from({length: 3}).map((row, idx) => {
                    return <Flex className="align-items-start" key={`handing_${idx}`}>
                        <div
                            className="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
                            <img src="/vite.svg" style={{width: '1em', height: '1em'}}/>
                        </div>
                        <div>
                            <h3 className="fs-2 text-body-emphasis">Featured title</h3>
                            <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another
                                sentence and probably just keep going until we run out of words.</p>
                            <a href="#" className="btn btn-primary">
                                Primary button
                            </a>
                        </div>
                    </Flex>;
                })}

            </Grid>
        </Container>;
    };


    const renderCustomCards = () => {
        return <Container className="px-4 py-5" id="custom-cards">
            <h2 className="pb-2 border-bottom">Custom cards</h2>

            <Grid col={1} lg={3} className="align-items-stretch g-4 py-5">
                {Array.from({length: 3}).map((row, idx) => {
                    return  <div key={`cards_${idx}`}>
                        <div className="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg"
                            style={{backgroundImage: 'url(https://getbootstrap.com/docs/5.3/examples/features/unsplash-photo-2.jpg)'}}
                        >
                            <Flex col="column" className="h-100 p-5 pb-3 text-white text-shadow-1">

                                <h3 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">Another longer title belongs here</h3>

                                <ul className="d-flex list-unstyled mt-auto">
                                    <li className="mr-auto">
                                        <img src="https://github.com/twbs.png" alt="Bootstrap" width="32" height="32"
                                            className="rounded-circle border border-white"/>
                                    </li>
                                    <li className="d-flex align-items-center mr-3">
                                        <img src="/vite.svg" style={{width: '1em', height: '1em'}}/>
                                        <small>Earth</small>
                                    </li>
                                    <li className="d-flex align-items-center">
                                        <img src="/vite.svg" style={{width: '1em', height: '1em'}}/>
                                        <small>3d</small>
                                    </li>
                                </ul>

                            </Flex>
                        </div>
                    </div>;
                })}


            </Grid>
        </Container>;
    };


    const renderIconGrid = () => {
        return <Container className="px-4 py-5" id="icon-grid">
            <h2 className="pb-2 border-bottom">Icon grid</h2>

            <Grid col={1} sm={2} md={3} lg={4} className="g-4 py-5">
                {Array.from({length: 8}).map((row, idx) => {

                    return <Flex className="align-items-start" key={`iconGrid_${idx}`}>
                        <img src="/vite.svg" style={{width: '28px'}}/>
                        <div>
                            <h3 className="fw-bold mb-0 fs-4 text-body-emphasis">Featured title</h3>
                            <p>Paragraph of text beneath the heading to explain the heading.</p>
                        </div>
                    </Flex>;
                })}
            </Grid>
        </Container>;
    };


    const renderFeatureWithTitle = () => {
        return <Container className="px-4 py-5">
            <h2 className="pb-2 border-bottom">Features with title</h2>

            <Grid col={1} md={2} className="align-items-md-center g-5 py-5">
                <Flex col="column" className="align-items-start gap-2">
                    <h2 className="fw-bold text-body-emphasis">Left-aligned title explaining these awesome features</h2>
                    <p className="text-body-secondary">Paragraph of text beneath the heading to explain the heading.
                        We'll add onto it with another sentence and probably just keep going until we run out of
                        words.</p>

                    <Button>Primary button</Button>
                </Flex>

                <Grid col={1} sm={2} className="g-4">

                    {Array.from({length: 4}).map((row, idx) => {
                        return <Flex col="column" className="gap-2" key={`feature_${idx}`}>
                            <FeatureIcon className="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3">
                                <img src="/vite.svg" style={{width: '28px'}}/>
                            </FeatureIcon>
                            <h4 className="fw-semibold mb-0 text-body-emphasis">Featured title</h4>
                            <p className="text-body-secondary">Paragraph of text beneath the heading to explain the
                               heading.</p>
                        </Flex>;
                    })}



                </Grid>
            </Grid>
        </Container>;
    };

    return <FeaturesRoot className={className}>

        {renderColumnIcons()}
        {renderColumnIcons2()}
        {renderHanding()}
        {renderCustomCards()}
        {renderIconGrid()}
        {renderFeatureWithTitle()}




        <GlobalCSS/>
    </FeaturesRoot>;
};

export default Features;




const FeatureIcon = styled.div`
    width: 3rem;
    height: 3rem;
    background-color: var(--bs-btn-bg);
`;


const FeaturesRoot = styled.div`

`;



const GlobalCSS = createGlobalStyle`

    :root{
        --bs-btn-color: #fff;
        --bs-btn-bg: #0d6efd;
        --bs-btn-border-color: #0d6efd;
        --bs-btn-hover-color: #fff;
        --bs-btn-hover-bg: #0b5ed7;
        --bs-btn-hover-border-color: #0a58ca;
        --bs-btn-focus-shadow-rgb: 49,132,253;
        --bs-btn-active-color: #fff;
        --bs-btn-active-bg: #0a58ca;
        --bs-btn-active-border-color: #0a53be;
        --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
        --bs-btn-disabled-color: #fff;
        --bs-btn-disabled-bg: #0d6efd;
        --bs-btn-disabled-border-color: #0d6efd;
    }

    body{
        background: #212529;
        color: #fff;
    }
`;
