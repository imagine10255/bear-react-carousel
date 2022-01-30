import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom';

// Main
import NotFound from 'views/NotFound';
import PropsTry from './PropsTry';


const Router = () => {

    return (
        <Switch>
            <Route path="/props-try" children={<PropsTry/>} />

            <Route path="*" children={<NotFound/>}/>
        </Switch>
    );
};

export default Router;

