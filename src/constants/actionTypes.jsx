"use strict";


// A library that reduces boilerplate by converting {ABC: null} to {ABC: ABC} for you
var keyMirror = require('react/lib/keyMirror');


module.exports = keyMirror({
    CREATE_AUTHOR: null
});