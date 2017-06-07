import React from 'react';
import { Meteor } from 'meteor/meteor';

export default class AddLink extends React.Component {
    constructor(props) {
        super(props);
        this.state = { url: '' };
    }

    onSubmit(e) {
        const { url } = this.state;

        e.preventDefault();

        if (url) {
            Meteor.call('links.insert', url, () => {
                if (!err) {
                    this.setState({ url: '' });
                }
            } );
        }
    }

    handleChange(e) {
        this.setState({ url: e.target.value.trim() });
    }

    render() {
        return(
            <form onSubmit={this.onSubmit.bind(this)}>
                <input 
                    type="text" 
                    placeholder="Enter a URL" 
                    value={this.state.url}
                    onChange={this.handleChange.bind(this)}/>
                <button>Add</button>
            </form>
        );
    }
}
