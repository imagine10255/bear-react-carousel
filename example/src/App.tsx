import styled from 'styled-components';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import './bootstrap-base.min.css';
import 'bear-react-carousel/dist/index.css';


// import Base from './sample/Base';
import SyncControl from './sample/SyncControl';
import {ChangeEvent, EventHandler, ReactEventHandler, useState} from 'react';
import Base from './sample/Base';




enum EExampleCode {
    base = 'base',
    syncController = 'syncController',
}


const examples: Record<EExampleCode, JEX.Element> = {
    [EExampleCode.base]: Base,
    [EExampleCode.syncController]: SyncControl,
};

function App() {
    const [exampleKey, setExampleItem] = useState<EExampleCode>(EExampleCode.base);
    const Comp = examples[exampleKey];
    

    const handleSetItem = (e: ChangeEvent) => {
        setExampleItem(e.target.value);
    };


    return (
        <div className="App">
            <select
                onChange={handleSetItem}
            >
                {Object.keys(examples).map(code => {
                    return <option
                        key={code}
                        value={code}
                    >{code}</option>;
                })}
            </select>


            <Comp/>
        </div>
    );
}

export default App;


