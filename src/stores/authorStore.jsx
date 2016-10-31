"use strict";

var Dispatcher = require('../dispatcher/appDispatcher.jsx');
var ActionTypes = require('../constants/actionTypes.jsx');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var CHANGE_EVENT = 'change';
var _ = require('lodash');


var _authors = [];


/*
 * Every store has 3 core functions:
 *      - addChangeListener
 *      - removeChangeListener
 *      - emitChange
 */
var AuthorStore = assign({}, EventEmitter.prototype, {
    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    getAllAuthors: function() {
        return _authors;
    },

    getAuthorById: function (id) {
        return _.find(_authors, {id: id});
    }
});


/*
 * Every store also registers with the dispatcher, so that it's notified when a change occurs
 */
Dispatcher.register(function (action) {
    // Since the dispatcher is updated on *every* action, we must check the actionType to see
    // if we want to do anything with it.
    switch (action.actionType) {
        // If we receive a 'create author' event, update our private list of authors
        // and tell the AuthorStore so it can notify all components that have registered
        // with it
        case ActionTypes.CREATE_AUTHOR:
            _authors.push(action.data);
            AuthorStore.emitChange();
            break;

    }
});


module.exports = AuthorStore;