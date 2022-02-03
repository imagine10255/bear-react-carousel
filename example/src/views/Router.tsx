import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

// Main
import NotFound from 'views/NotFound';
import About from './About';
import Installation from './Installation';
import PropsTry from './PropsTry';

import Centered from './Feature/Centered';
import Breakpoints from './Feature/Breakpoints';
import AutoWidth from './Feature/AutoWidth';
import AutoHeight from './Feature/AutoHeight';
import UseBackground from './Feature/UseBackground';

import AutoPlayProgress from './Example/AutoPlayProgress';
import VipLevelList from './Example/VipLevelList';


const Router = () => {

    return (
        <Switch>
            <Route path="/installation" children={<Installation/>} />
            <Route path="/about" children={<About/>} />
          <Route path="/props-try" children={<PropsTry/>} />

            <Route path="/feature/centered" children={<Centered/>} />
            <Route path="/feature/auto-width" children={<AutoWidth/>} />
            <Route path="/feature/auto-height" children={<AutoHeight/>} />
            <Route path="/feature/use-background" children={<UseBackground/>} />
            <Route path="/feature/breakpoints" children={<Breakpoints/>} />

            <Route path="/example/vip-level-list" children={<VipLevelList/>} />
            <Route path="/example/auto-play-progress" children={<AutoPlayProgress/>} />

            <Route path="/" children={<Redirect to="/about"/>} />


            <Route path="*" children={<NotFound/>}/>
        </Switch>
    );
};

export default Router;

