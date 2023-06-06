import {useState} from 'react';
import styled, {css} from 'styled-components';
import gridConfig from './config/grid';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import './bootstrap-base.min.css';
import 'bear-react-carousel/dist/index.css';


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




enum EExampleCode {
    base = 'base',
    autoPlay = 'autoPlay',
    loop = 'loop',
    center = 'center',
    breakpoints = 'breakpoints',
    slidePerViews = 'slidePerViews',
    slidePerGroup = 'slidePerGroup',
    syncController = 'syncController',
    updateSlideItem = 'updateSlideItem',
    renderPagination = 'renderPagination',
}


const examples: Record<EExampleCode, () => JSX.Element> = {
    [EExampleCode.base]: Base,
    [EExampleCode.autoPlay]: AutoPlay,
    [EExampleCode.loop]: Loop,
    [EExampleCode.center]: Center,
    [EExampleCode.breakpoints]: Breakpoints,
    [EExampleCode.slidePerViews]: SlidePerViews,
    [EExampleCode.slidePerGroup]: SlidePerGroup,
    [EExampleCode.syncController]: SyncControl,
    [EExampleCode.updateSlideItem]: UpdateSlideItem,
    [EExampleCode.renderPagination]: RenderPagination,
};

function App() {
    const [exampleKey, setExampleItem] = useState<EExampleCode>(EExampleCode.syncController);
    const Comp = examples[exampleKey];



    return (
        <GridThemeProvider gridTheme={gridConfig}>
            <AppRoot className="App">

                <Menu>
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
                </Example>
            </AppRoot>
        </GridThemeProvider>
    );
}

export default App;



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
`;



const AppRoot = styled.div`
  display: flex;
  flex-direction: row;

`;
