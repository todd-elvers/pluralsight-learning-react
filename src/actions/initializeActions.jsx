"use strict";

var Dispatcher = require('../dispatcher/appDispatcher.jsx');
var ActionTypes = require('../constants/actionTypes.jsx');
var AuthorApi = require('../api/authorApi.jsx');

var InitializeActions = {
    initApp: function () {
        Dispatcher.dispatch({
            actionType: ActionTypes.INITIALIZE,
            initialData: {
                authors: AuthorApi.getAllAuthors()
            }
        });
    }
};

module.exports = InitializeActions;