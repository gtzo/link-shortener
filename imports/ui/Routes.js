import {Redirect, Router, Route, Switch} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import React from 'react';
import ReactDOM from 'react-dom';

import Signup from '../ui/Signup';
import Link from '../ui/Link';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';

const history = createHistory();

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/links'];

const onEnterPrivatePage = () => { 
    return !Meteor.userId() ? <Redirect to='/'/> : <Link/>
}

export const onAuthChange = (isAuthenticated) => {
    const pathname = history.location.pathname;
    const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
    const isAuthenticatedPage = authenticatedPages.includes(pathname);

    if (isAuthenticatedPage && !isAuthenticated) {
        history.push('/');
    } else if (isUnauthenticatedPage && isAuthenticated) {
        history.push('/links');

    } 

    console.log('isAuthenticated', isAuthenticated);
}

export const routes = (
    <Router history={history}>
        <Switch>
            <Route exact path="/" render={() => {return Meteor.userId() ? <Redirect to='/links'/> : <Login/>}}/>
            <Route path="/signup" render={() => {return Meteor.userId() ? <Redirect to='/links'/> : <Signup/>}}/>
            <Route path="/links" render={onEnterPrivatePage}/>
            <Route component={NotFound}/>
        </Switch>
    </Router>
);
