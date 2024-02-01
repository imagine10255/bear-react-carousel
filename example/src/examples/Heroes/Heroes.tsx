import styled, {createGlobalStyle} from 'styled-components';
import {Col, Container, Grid, Row, auto, Flex} from 'bear-react-grid';
import Base from '@/components/organize/Base';
import AutoPlay from '@/components/organize/AutoPlay';
import AutoImage from '@/components/organize/AutoImage';
import Loop from '@/components/organize/Loop';
import AutoCard from '@/components/organize/AutoCard';
import JuejinVip from '@/components/organize/JuejinVip';
import W99Vip from '@/components/organize/W99Vip';
import LazyImage from '@/components/organize/LazyImage';

interface IProps extends FCProps {

}

const Heroes = ({
    className,
}: IProps) => {



    const renderBase = () => {
        return <Flex col="column" className="px-4 py-5 my-5 gap-2 text-center">
            <img className="d-block mx-auto mb-4" src="https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="72"
                height="57"/>
            <h1>Base</h1>
            <Col col={12} lg={6} className="mx-auto">
                <p className="mb-4">Base carousel</p>

                <Grid col={1} className="g-3 justify-content-center">
                    <Base/>
                </Grid>
            </Col>
        </Flex>;
    };


    const renderAutoPlay = () => {
        return <Flex col="column" className="px-4 py-5 my-5 gap-2 text-center">
            <h1>Auto Play</h1>
            <Col col={12} lg={6} className="mx-auto">
                <p className="mb-4">Auto play after 1.5s</p>

                <Grid col={1} className="g-3 justify-content-center">
                    <AutoPlay/>
                </Grid>
            </Col>
        </Flex>;
    };


    const renderAutoImage = () => {
        return <Flex col="column" className="px-4 py-5 my-5 gap-2 text-center">
            <h1>Auto image size</h1>
            <Col col={12} lg={6} className="mx-auto">
                <p className="mb-4">Auto image size</p>

                <Grid col={1} className="g-3 justify-content-center">
                    <AutoImage/>
                </Grid>
            </Col>
        </Flex>;
    };


    const renderAutoCard = () => {
        return <Flex col="column" className="px-4 py-5 my-5 gap-2 text-center">
            <h1>Auto card size</h1>
            <Col col={12} lg={6} className="mx-auto">
                <p className="mb-4">Auto card size</p>

                <Grid col={1} className="g-3 justify-content-center">
                    <AutoCard/>
                </Grid>
            </Col>
        </Flex>;
    };


    const renderLoop = () => {
        return <Flex col="column" className="px-4 py-5 my-5 gap-2 text-center">
            <h1>Loop</h1>
            <Col col={12} lg={6} className="mx-auto">
                <p className="mb-4">Loop slide card</p>

                <Grid col={1} className="g-3 justify-content-center">
                    <Loop/>
                </Grid>
            </Col>
        </Flex>;
    };



    const renderJuejinVip = () => {
        return <Flex col="column" className="px-4 py-5 my-5 gap-2 text-center">
            <h1>Sync Control</h1>
            <Col col={12} lg={6} className="mx-auto">
                <p className="mb-4">Mock 掘金 Vip member</p>

                <Grid col={1} className="g-3 justify-content-center">
                    <JuejinVip/>
                </Grid>
            </Col>
        </Flex>;
    };


    const renderW99Vip = () => {
        return <Flex col="column" className="px-4 py-5 my-5 gap-2 text-center">
            <h1>Sync Control</h1>
            <Col col={12} lg={6} className="mx-auto">
                <p className="mb-4">Mock W99 Vip member</p>

                <Grid col={1} className="g-3 justify-content-center">
                    <W99Vip/>
                </Grid>
            </Col>
        </Flex>;
    };


    const renderLazyImage = () => {
        return <Flex col="column" className="px-4 py-5 my-5 gap-2 text-center">
            <h1>Sync Control</h1>
            <Col col={12} lg={6} className="mx-auto">
                <p className="mb-4">Mock W99 Vip member</p>

                <Grid col={1} className="g-3 justify-content-center">
                    <LazyImage/>
                </Grid>
            </Col>
        </Flex>;
    };



    return <HeroesRoot className={className}>

        {/*{renderBase()}*/}
        {/*{renderAutoPlay()}*/}
        {/*{renderLoop()}*/}
        {/*{renderAutoImage()}*/}
        {/*{renderAutoCard()}*/}
        {/*{renderJuejinVip()}*/}
        {/*{renderW99Vip()}*/}
        {renderLazyImage()}

        <GlobalCSS/>
    </HeroesRoot>;
};

export default Heroes;





const HeroesRoot = styled.div`

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
