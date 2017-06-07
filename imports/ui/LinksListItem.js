import React from 'react';
import PropTypes from 'prop-types';
import Clipboard from 'clipboard';

import { Meteor } from 'meteor/meteor';

export default class LinksListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            justCopied: false
        };
    }

    componentDidMount() {
        this.clipboard = new Clipboard(this.button);
        this.clipboard.on('success', () => {
            this.setState({ justCopied: true });
            setTimeout(() => this.setState({ justCopied: false }), 1000);
        }).on('error', () => {
            alert('Copying failed');
        });
    }

    componentWillUnmount() {
        this.clipboard.destroy(); 
    }

    toggleButtonState() {
        this.button.innerText = 'copied';
        setTimeout(() => this.button.innerText = 'copy', 1000);
    }

    render() {
        return (
            <div>
                <p key={this.props._id}>{this.props.url} =/= {this.props.shortUrl}</p>
                <p>{this.props.visible.toString()}</p>
                <button ref={(button) => this.button = button} data-clipboard-text={this.props.shortUrl}>{this.state.justCopied ? 'copied!!!' : 'copy'}</button>
                <button onClick={() => {
                    Meteor.call('links.setVisibility', this.props._id, !this.props.visible);
                }}>{this.props.visible ? 'Hide' : 'Show'}</button>
            </div>
        );
    }
}

LinksListItem.propTypes = {
    _id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    shortUrl: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired
}
