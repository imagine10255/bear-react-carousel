import {useState} from 'react';
import styled, {css} from 'styled-components';

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




enum EExampleCode {
    base = 'base',
    autoPlay = 'autoPlay',
    loop = 'loop',
    breakpoints = 'breakpoints',
    slidePerViews = 'slidePerViews',
    syncController = 'syncController',
    updateSlideItem = 'updateSlideItem',
}


const examples: Record<EExampleCode, () => JSX.Element> = {
    [EExampleCode.base]: Base,
    [EExampleCode.autoPlay]: AutoPlay,
    [EExampleCode.loop]: Loop,
    [EExampleCode.breakpoints]: Breakpoints,
    [EExampleCode.slidePerViews]: SlidePerViews,
    [EExampleCode.syncController]: SyncControl,
    [EExampleCode.updateSlideItem]: UpdateSlideItem,
};

function App() {
    const [exampleKey, setExampleItem] = useState<EExampleCode>(EExampleCode.base);
    const Comp = examples[exampleKey];
    


    return (
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
