import React from 'react';
import {Accounts} from 'meteor/accounts-base';
import {Links} from '../api/links'; 

import LinksList from './LinksList';

export default class Link extends React.Component {
    onLogout() {
        Accounts.logout();
    }

    onSubmit(e) {
        const url = this.refs.url.value.trim(); // input string
        e.preventDefault();

        if (url) {
            Meteor.call('links.insert', url);
            // Links.insert({ url, userId: Meteor.userId() });
            this.refs.url.value = '';
        }

    }

    render() {
        return (
            <div>
                <h1>Welcome to Link Shortener</h1>
                <button onClick={this.onLogout.bind(this)}>Logout</button>
                <LinksList/>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <input type="text" ref="url" placeholder="Enter a URL"/>
                    <button>Add</button>
                </form>
            </div>   
        );
    }
}
