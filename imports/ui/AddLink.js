import React from 'react';
import Modal from 'react-modal';
import { Meteor } from 'meteor/meteor';

export default class AddLink extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            url: '' ,
            isOpen: false,
            error: ''
        };
    }

    onSubmit(e) {
        const { url } = this.state;

        e.preventDefault();

        Meteor.call('links.insert', url, (err, res) => {
            if (!err) {
                this.handleModalClose();
            } else {
                this.setState({error: err.reason})
            }
        });
    }

    handleChange(e) {
        this.setState({ url: e.target.value.trim() });
    }

    handleModalClose() {
        this.setState({isOpen: false, 
                       url: '', 
                       error: ''});
    }

    render() {
        return(
            <div>
                <button onClick={() => this.setState({isOpen: true})}>add link</button>
                <Modal 
                    isOpen={this.state.isOpen}
                    onAfterOpen={() => this.refs.url.focus()}
                    onRequestClose={this.handleModalClose.bind(this)}
                    contentLabel="add link">
                    <h1>Add link</h1>
                    {this.state.error ? <p>{this.state.error}</p> : undefined}
                    <form onSubmit={this.onSubmit.bind(this)}>
                        <input 
                            type="text" 
                            ref="url"
                            placeholder="Enter a URL" 
                            value={this.state.url}
                            onChange={this.handleChange.bind(this)}/>
                        <button>Add</button>
                    </form>
                    <button onClick={this.handleModalClose.bind(this)}>cancel</button>
                </Modal>
            </div>
        );
    }
}
