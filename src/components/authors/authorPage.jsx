"use strict";

var React = require('react');
var AuthorApi = require('../../api/authorApi.jsx');

var Authors = React.createClass({

    // Initialize the component's internal state
    getInitialState: function () {
        return {authors: []};
    },

    // Set the component's internal state
    componentWillMount: function () {
        this.setState({authors: AuthorApi.getAllAuthors()});
    },

    render: function () {
        var createAuthorRow = function (author) {
            return (
                <tr key={author.id}>
                    <td><a href={"/#authors" + author.id}>{author.id}</a></td>
                    <td>{author.firstName} {author.lastName}</td>
                </tr>
            );
        };

        return (
            <div>
                <h1>Authors</h1>

                <table className="table">
                    <thead>
                        <th>ID</th>
                        <th>Name</th>
                    </thead>
                    <tbody>
                        {this.state.authors.map(createAuthorRow, this)}
                    </tbody>
                </table>
            </div>
        );
    }
});

module.exports = Authors;