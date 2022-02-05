import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

// Main
import NotFound from 'views/NotFound';
import About from './About';
import Installation from './Installation';
import PropsTry from './PropsTry';

import Centered from './Feature/Centered';
import Responsive from './Feature/Responsive';
import AutoWidth from './Feature/AutoWidth';
import StaticHeight from './Feature/StaticHeight';

import AutoPlayProgress from './Example/AutoPlayProgress';
import VipLevelList from './Example/VipLevelList';
import Advices from './Advices';
import AspectRatioHeight from './Feature/AspectRatioHeight';
import TextAnimations from './Example/TextAnimations';


const Router = () => {

    return (
        <Switch>
            <Route path="/installation" children={<Installation/>} exact/>
            <Route path="/about" children={<About/>} exact/>
            <Route path="/Advices" children={<Advices/>} exact/>
            <Route path="/props-try" children={<PropsTry/>} exact/>

            <Route path="/feature/static-height" children={<StaticHeight/>} exact/>
            <Route path="/feature/aspect-ratio-height" children={<AspectRatioHeight/>} exact/>
            <Route path="/feature/centered" children={<Centered/>} exact/>
            <Route path="/feature/auto-width" children={<AutoWidth/>} exact/>
            <Route path="/feature/responsive" children={<Responsive/>} exact/>

            <Route path="/example/vip-level-list" children={<VipLevelList/>} exact/>
            <Route path="/example/auto-play-progress" children={<AutoPlayProgress/>} exact/>
            <Route path="/example/text-animations" children={<TextAnimations/>} exact/>

            <Route path="/" children={<Redirect to="/about"/>} exact/>


            <Route path="*" children={<NotFound/>}/>
        </Switch>
    );
};

export default Router;

