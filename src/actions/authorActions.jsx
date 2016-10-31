"use strict";

var Dispatcher = require('../dispatcher/appDispatcher.jsx');
var AuthorApi = require('../api/authorApi.jsx');
var ActionTypes = require('../constants/actionTypes.jsx');

var AuthorActions = {
    createAuthor: function (author) {
        var newAuthor = AuthorApi.saveAuthor(author);

        // Dispatch a message to all stores indicating that
        // an author has been created.
        Dispatcher.dispatch({
            actionType: ActionTypes.CREATE_AUTHOR,
            data: newAuthor
        });
    }
};

module.exports = AuthorActions;