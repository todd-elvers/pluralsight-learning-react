"use strict";

var React = require('react');

var About = React.createClass({
    statics: {
        // willTransitionTo: function (transition, params, query, callback) {
        //     if(!confirm('Are you sure you want to read a page that\'s boring?')) {
        //         // This prevents the transition from occurring, keeping the user on the same page
        //         transition.abort();
        //     } else {
        //         // This triggers the transition to occur
        //         callback();
        //     }
        // },
        //
        // willTransitionFrom: function (transition, component) {
        //     if(!confirm('Are you sure you want to leave a page that\'s this exiting?')) {
        //         // This prevents the transition from occurring, keeping the user on the same page
        //         transition.abort();
        //     }
        // }
    },

    render: function() {
        return (
            <div>
                <h1>About</h1>
                <p>
                    This application uses the following technologies:
                    <ul>
                        <li>React</li>
                        <li>React Router</li>
                        <li>Flux</li>
                        <li>Node</li>
                        <li>Gulp</li>
                        <li>Browserify</li>
                        <li>Bootstrap</li>
                    </ul>
                </p>
            </div>
        );
    }
});

module.exports = About;