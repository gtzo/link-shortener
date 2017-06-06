import React from 'react';
import PropTypes from 'prop-types';
import Clipboard from 'clipboard';

import { Tracker } from 'meteor/tracker';

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
                <button ref={(button) => this.button = button} data-clipboard-text={this.props.shortUrl}>{this.state.justCopied ? 'copied!!!' : 'copy'}</button>
            </div>
        );
    }
}

LinksListItem.propTypes = {
    _id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    shortUrl: PropTypes.string.isRequired
}
