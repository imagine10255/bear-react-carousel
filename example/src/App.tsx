import {useState} from 'react';
import styled, {css} from 'styled-components';
import gridConfig from './config/grid';
import './App.css';
import './bootstrap-base.min.css';
import 'bear-react-carousel/dist/index.css';

import {elClassName} from 'bear-react-carousel';

// import Base from './sample/Base';
import SyncControl from './sample/SyncControl';
import SyncControl2 from './sample/SyncControl2';
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
import CustomNav from './sample/CustomNav';
import Effect from './sample/Effect';
import Effect2 from './sample/Effect2';
import Breakpoints2 from './sample/Breakpoints2';
import EffectSetIndex from './sample/EffectSetIndex';




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
    breakpoints2 = 'breakpoints2',
    slidePerViews = 'slidePerViews',
    slidePerGroup = 'slidePerGroup',
    syncController = 'syncController',
    syncController2 = 'syncController2',
    updateSlideItem = 'updateSlideItem',
    renderPagination = 'renderPagination',
    textAnimations = 'textAnimations',
    customNav = 'customNav',
    moveEffect = 'moveEffect',
    moveEffect2 = 'moveEffect2',
    effectSetIndex = 'effectSetIndex',
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
    [EExampleCode.breakpoints2]: Breakpoints2,
    [EExampleCode.slidePerViews]: SlidePerViews,
    [EExampleCode.slidePerGroup]: SlidePerGroup,
    [EExampleCode.syncController]: SyncControl,
    [EExampleCode.syncController2]: SyncControl2,
    [EExampleCode.updateSlideItem]: UpdateSlideItem,
    [EExampleCode.renderPagination]: RenderPagination,
    [EExampleCode.textAnimations]: TextAnimationsCarousel,
    [EExampleCode.customNav]: CustomNav,
    [EExampleCode.moveEffect]: Effect,
    [EExampleCode.moveEffect2]: Effect2,
    [EExampleCode.effectSetIndex]: EffectSetIndex,
};

function App() {
    const [exampleKey, setExampleItem] = useState<EExampleCode>(EExampleCode.lazyImage);
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


                <Example style={{width: 0}}>
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
