import React from 'react';
import {Switch, Route} from 'react-router-dom';

// Main
import NotFound from 'views/NotFound';
import About from './About';
import Installation from './Installation';
import PropsTry from './PropsTry';
import PerViewAuto from './Feature/PerViewAuto';
import Centered from './Feature/Centered';
import Breakpoints from './Feature/Breakpoints';


const Router = () => {

    return (
        <Switch>
            <Route path="/props-try" children={<PropsTry/>} />
            <Route path="/installation" children={<Installation/>} />
            <Route path="/about" children={<About/>} />
            <Route path="/feature/per-view-auto" children={<PerViewAuto/>} />
            <Route path="/feature/centered" children={<Centered/>} />
            <Route path="/feature/breakpoints" children={<Breakpoints/>} />

            <Route path="*" children={<NotFound/>}/>
        </Switch>
    );
};

export default Router;

