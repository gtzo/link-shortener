import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Session } from 'meteor/session';
import createHistory from 'history/createBrowserHistory';
import React from 'react';
import ReactDOM from 'react-dom';

import { routes, onAuthChange } from '../imports/ui/Routes';
import '../imports/startup/simple-schema-configuration.js';

Tracker.autorun(() => {
    const isAuthenticated = !!Meteor.userId();
    onAuthChange(isAuthenticated);
});

Meteor.startup(() => {
    Session.set('showVisible', true);
    ReactDOM.render(routes, document.getElementById('app'));
});
