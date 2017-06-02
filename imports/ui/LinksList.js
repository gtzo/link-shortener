import React from 'react';
import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker';
import { Links } from '../api/links';

export default class LinksList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            links: []
        };
    }

    componentDidMount() { // called internally in lifecycle
        console.log('mounted');
        this.linksTracker = Tracker.autorun(() => {
            Meteor.subscribe('links');
            const links = Links.find().fetch(); 
            this.setState({links});
        })
    }

    componentWillUnmount() { // called internally in lifecycle
        console.log('unmounted');
        this.linksTracker.stop();
    }

    renderLinksListItems() { // called internally in lifecycle
        return this.state.links.map((link) => {
            return <p key={link._id}>{link.url}</p>
        });
    }

    render() {
        return (
            <div>
                <p>lnkslist</p>
                <div>
                    {this.renderLinksListItems()}
                </div>
            </div>
        )
    }
}
