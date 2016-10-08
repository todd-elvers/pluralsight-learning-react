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
            author: {id: '', firstName: '', lastName: ''},
            errors: {}
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

    authorFormIsValid: function () {
        var formIsValid = true;
        
        // Clear any previous errors
        this.state.errors = {};
        
        if(this.state.author.firstName.length < 3) {
            this.state.errors.firstName = 'First name must be a least 3 characters.';
            formIsValid = false;
        }

        if(this.state.author.lastName.length < 3) {
            this.state.errors.lastName = 'Last name must be a least 3 characters.';
            formIsValid = false;
        }

        this.setState({ errors: this.state.errors});
        return formIsValid;
    },

    saveAuthor: function (event) {
        event.preventDefault();


        if (!this.authorFormIsValid()) {
            return;
        }

        // Hit the fake API and pretend we're saving the author
        AuthorApi.saveAuthor(this.state.author);

        // Display a toast message to the user
        toastr.success('Author saved!');

        // Tell React Router to send us back to the 'authors' page
        this.transitionTo('authors');
    },

    render: function () {
        return (
            <AuthorForm
                author={this.state.author}
                onChange={this.setAuthorState}
                onSave={this.saveAuthor}
                errors={this.state.errors}
            />
        );
    }
});

module.exports = ManageAuthorPage;