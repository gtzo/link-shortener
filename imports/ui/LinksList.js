import React from 'react/react';
import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker';

import { Links } from '../api/links';
import { Session } from 'meteor/session';
import LinksListItem from './LinksListItem';
import LinksListFilters from './LinksListFilters';

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
            const links = Links.find({
                visible: Session.get('showVisible')
            }).fetch(); 
            this.setState({links});
        })
    }

    componentWillUnmount() { // called internally in lifecycle
        console.log('unmounted');
        this.linksTracker.stop();
    }

    renderLinksListItems() { 
        return this.state.links.map((link) => {
            const shortUrl = Meteor.absoluteUrl(link._id);
            return <LinksListItem key={link._id} shortUrl={shortUrl} {...link}/>;
        });
    }

    render() {
        return (
            <div>
                <p>Links list</p>
                <div>
                    {this.renderLinksListItems()}
                </div>
            </div>
        )
    }
}
