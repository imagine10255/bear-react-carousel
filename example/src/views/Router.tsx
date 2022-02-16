import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

// Custom
import PropsTry from './PropsTry';

import AutoPlayProgress from './Example/AutoPlayProgress';
import VipLevelList from './Example/VipLevelList';
import TextAnimations from './Example/TextAnimations';
import BaseUsed from './BaseUsed';


const Router = () => {

    return (
        <Switch>

            {/*<Route path="/feature/static-height" children={<StaticHeight/>} exact/>*/}
            {/*<Route path="/feature/aspect-ratio-height" children={<AspectRatioHeight/>} exact/>*/}
            {/*<Route path="/feature/slide-card" children={<SlideCard/>} exact/>*/}
            {/*<Route path="/feature/centered" children={<Centered/>} exact/>*/}
            {/*<Route path="/feature/auto-width" children={<AutoWidth/>} exact/>*/}
            {/*<Route path="/feature/responsive" children={<Responsive/>} exact/>*/}

            <Route path="/props-try" children={<PropsTry/>} exact/>
            <Route path="/example/vip-level-list" children={<VipLevelList/>} exact/>
            <Route path="/example/auto-play-progress" children={<AutoPlayProgress/>} exact/>
            <Route path="/example/text-animations" children={<TextAnimations/>} exact/>

            <Route path="/" children={<BaseUsed/>} exact/>


        </Switch>
    );
};

export default Router;

