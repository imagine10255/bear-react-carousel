import {useState} from 'react';
import styled, {css} from 'styled-components';
import gridConfig from './config/grid';
import './App.css';
import './bootstrap-base.min.css';
import 'bear-react-carousel/dist/index.css';

import {elClassName} from 'bear-react-carousel';

// import Base from './sample/Base';
import SyncControl from './sample/SyncControl';
import Breakpoints from './sample/Breakpoints';
import Base from './sample/Base';
import SlidePerViews from './sample/SlidePerViews';
import AutoPlay from './sample/AutoPlay';
import UpdateSlideItem from './sample/UpdateSlideItem';
import Loop from './sample/Loop';
import Center from './sample/Center';
import SlidePerGroup from './sample/SlidePerGroup';
import RenderPagination from './sample/RenderPagination';
import { GridThemeProvider } from 'bear-react-grid';
import TextAnimationsCarousel from "./sample/TextAnimationsCarousel";
import SlideImage from "./sample/SlideImage";
import AutoCard from "./sample/AutoCard";
import LazyImage from "./sample/LazyImage";
import LazyCard from "./sample/LazyCard";
import AutoImage from "./sample/AutoImage";




enum EExampleCode {
    base = 'base',
    slideImage = 'slideImage',
    lazyImage = 'lazyImage',
    lazyCard = 'lazyCard',
    autoCard = 'autoCard',
    autoImage = 'autoImage',
    autoPlay = 'autoPlay',
    loop = 'loop',
    center = 'center',
    breakpoints = 'breakpoints',
    slidePerViews = 'slidePerViews',
    slidePerGroup = 'slidePerGroup',
    syncController = 'syncController',
    updateSlideItem = 'updateSlideItem',
    renderPagination = 'renderPagination',
    textAnimations = 'textAnimations',
}


const examples: Record<EExampleCode, () => JSX.Element> = {
    [EExampleCode.base]: Base,
    [EExampleCode.slideImage]: SlideImage,
    [EExampleCode.lazyImage]: LazyImage,
    [EExampleCode.lazyCard]: LazyCard,
    [EExampleCode.autoCard]: AutoCard,
    [EExampleCode.autoImage]: AutoImage,
    [EExampleCode.autoPlay]: AutoPlay,
    [EExampleCode.loop]: Loop,
    [EExampleCode.center]: Center,
    [EExampleCode.breakpoints]: Breakpoints,
    [EExampleCode.slidePerViews]: SlidePerViews,
    [EExampleCode.slidePerGroup]: SlidePerGroup,
    [EExampleCode.syncController]: SyncControl,
    [EExampleCode.updateSlideItem]: UpdateSlideItem,
    [EExampleCode.renderPagination]: RenderPagination,
    [EExampleCode.textAnimations]: TextAnimationsCarousel,
};

function App() {
    const [exampleKey, setExampleItem] = useState<EExampleCode>(EExampleCode.base);
    const Comp = examples[exampleKey];



    return (
        <GridThemeProvider gridTheme={gridConfig}>
            <AppRoot className="App">

                <Menu className="d-none d-md-flex">
                    {Object.keys(examples).map(code => {
                        return <Button type="button"
                            key={code}
                            isActive={code === exampleKey}
                            onClick={() => setExampleItem(code as EExampleCode)}
                        >{code}</Button>;
                    })}
                </Menu>


                <Example>
                    <Comp/>
                    <LogArea id={elClassName.console}/>
                </Example>

            </AppRoot>
        </GridThemeProvider>
    );
}

export default App;


const LogArea = styled.textarea`
    height: 200px;
`;


const Button = styled.button<{
    isActive: boolean
}>`
  ${props => props.isActive && css`
    background-color: #00a3e0;
  `}

`;


const Menu = styled.div`
  display: flex;
  flex-direction: column;
  width: 150px;
`;


const Example = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  max-width: 100%;
`;



const AppRoot = styled.div`
  display: flex;
  flex-direction: row;

`;
