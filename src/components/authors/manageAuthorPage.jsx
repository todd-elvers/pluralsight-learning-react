"use strict";

var React = require('react');
var Router = require('react-router');
var AuthorForm = require('./authorForm.jsx');
var AuthorApi = require('../../api/authorApi.jsx');
var toastr = require('toastr');

// Page responsible for managing an author.  i.e. the CRUD page for authors.
var ManageAuthorPage = React.createClass({
    mixins: [
        // Mixin React Router's Navigation component's functions (e.g. this.transitionTo(...))
        Router.Navigation
    ],


    getInitialState: function () {
        return {
            author: {id: '', firstName: '', lastName: ''}
        };
    },

    // This function allows the key-presses in the first & last
    // name input fields in the AuthorForm component to modify
    // the author object that exists in this component's state
    setAuthorState: function (event) {
        var field = event.target.name;
        var value = event.target.value;
        this.state.author[field] = value;

        return this.setState({
            author: this.state.author
        });
    },

    saveAuthor: function(event) {
        event.preventDefault();                       // Prevent the form submission
        AuthorApi.saveAuthor(this.state.author);     // Hit the fake API and pretend we're saving the author
        toastr.success('Author saved!');             // Display a toast message to the user
        this.transitionTo('authors');               // Tell React Router to send us back to the 'authors' page
    },

    render: function () {
        return (
            <AuthorForm
                author={this.state.author}
                onChange={this.setAuthorState}
                onSave={this.saveAuthor}
            />
        );
    }
});

module.exports = ManageAuthorPage;