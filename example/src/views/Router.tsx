import React from 'react';
import {Switch, Route} from 'react-router-dom';

// Main
import NotFound from 'views/NotFound';
import About from './About';
import PropsTry from './PropsTry';


const Router = () => {

    return (
        <Switch>
            <Route path="/props-try" children={<PropsTry/>} />
            <Route path="/about" children={<About/>} />

            <Route path="*" children={<NotFound/>}/>
        </Switch>
    );
};

export default Router;

