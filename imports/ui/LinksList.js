import React from 'react/react';
import FlipMove from 'react-flip-move';
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
        if (this.state.links.length === 0) {
            return (
                    <div className="item">
                        <p className="item__status-message">No items.</p>
                    </div>
                   );
        } else {
            return this.state.links.map((link) => {
                const shortUrl = Meteor.absoluteUrl(link._id);
                return <LinksListItem key={link._id} shortUrl={shortUrl} {...link}/>;
            });
        }
    }

    render() {
        return (
            <div>
                <FlipMove maintainContainerHeight={true}>
                    {this.renderLinksListItems()}
                </FlipMove>
            </div>
        )
    }
}
