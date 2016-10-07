"use strict";

var React = require('react');
var AuthorApi = require('../../api/authorApi.jsx');
var AuthorList = require('./authorList.jsx');

var AuthorPage = React.createClass({

    // Initialize the component's internal state
    getInitialState: function () {
        return {authors: []};
    },

    // Set the component's internal state
    componentDidMount: function () {
        // TODO: Find out if it's true that checking if a component is mounted inside of componentDidMount is best practice.
        if(this.isMounted()) {
            this.setState({authors: AuthorApi.getAllAuthors()});
        }
    },

    render: function () {
        return (
            <div>
                <h1>Authors</h1>
                <AuthorList authors={this.state.authors} />
            </div>
        );
    }
});

module.exports = AuthorPage;