import React from 'react';
import { Meteor } from 'meteor/meteor';

export default class AddLink extends React.Component {
    onSubmit(e) {
        const url = this.refs.url.value.trim(); // input string
        e.preventDefault();
        if (url) {
            Meteor.call('links.insert', url);
            this.refs.url.value = '';
        }
    }

    render() {
        return(
            <form onSubmit={this.onSubmit.bind(this)}>
                <input type="text" ref="url" placeholder="Enter a URL"/>
                <button>Add</button>
            </form>
        );
    }
}
