"use strict";

var React = require('react');
var Input = require('../common/textInput.jsx');

var AuthorForm = React.createClass({

    propTypes: {
        onChange: React.PropTypes.func.isRequired,
        onSave  : React.PropTypes.func.isRequired
    },

    render: function () {
        return (
            <form>
                <h1>Manage Author</h1>
                <Input name="firstName"
                       label="First Name"
                       value={this.props.author.firstName}
                       onChange={this.props.onChange}
                       error={this.props.errors.firstName} />

                <Input name="lastName"
                       label="Last Name"
                       value={this.props.author.lastName}
                       onChange={this.props.onChange}
                       error={this.props.errors.lastName} />

                <button className="btn btn-default"
                        type="submit"
                        onClick={this.props.onSave}>
                    Save
                </button>
            </form>
        );
    }
});

module.exports = AuthorForm;