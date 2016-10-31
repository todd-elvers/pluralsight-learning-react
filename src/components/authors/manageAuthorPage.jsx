"use strict";

var React = require('react');
var Router = require('react-router');
var AuthorForm = require('./authorForm.jsx');
var AuthorActions = require('../../actions/authorActions.jsx');
var AuthorStore = require('../../stores/authorStore.jsx');
var toastr = require('toastr');

// Page responsible for managing an author.  i.e. the CRUD page for authors.
var ManageAuthorPage = React.createClass({
    mixins: [
        // Mixin React Router's Navigation component's functions (e.g. this.transitionTo(...))
        Router.Navigation
    ],


    statics: {
        // Prompt user when leaving page if changes have been made that aren't saved
        willTransitionFrom: function(transition, component) {
            if(component.state.dirty && !confirm('Leave without saving?')) {
                transition.abort();
            }
        }
    },

    getInitialState: function () {
        return {
            author: {id: '', firstName: '', lastName: ''},
            errors: {},
            dirty : false
        };
    },


    // componentWillMount was chosen over componentDidMount
    // b/c calls to .setState() won't cause a re-render
    componentWillMount: function() {
        var authorId = this.props.params.id; //From the path '/author:id'
        if(authorId) {
            this.setState({author: AuthorStore.getAuthorById(authorId)})
        }
    },

    // This function allows the key-presses in the first & last
    // name input fields in the AuthorForm component to modify
    // the author object that exists in this component's state
    setAuthorState: function (event) {
        this.setState({dirty: true});
        var field = event.target.name;
        this.state.author[field] = event.target.value;

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

        AuthorActions.createAuthor(this.state.author);
        this.setState({dirty: false});
        toastr.success('Author saved!');
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