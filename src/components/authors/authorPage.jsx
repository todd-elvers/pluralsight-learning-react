"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var AuthorActions = require('../../actions/authorActions.jsx');
var AuthorStore = require('../../stores/authorStore.jsx');
var AuthorList = require('./authorList.jsx');

var AuthorPage = React.createClass({

    // Initialize the component's internal state
    getInitialState: function () {
        return {
            authors: AuthorStore.getAllAuthors()
        };
    },

    render: function () {
        return (
            <div>
                <h1>Authors</h1>
                <Link to="addAuthor" className="btn btn-default">Add Author</Link>
                <AuthorList authors={this.state.authors} />
            </div>
        );
    }
});

module.exports = AuthorPage;