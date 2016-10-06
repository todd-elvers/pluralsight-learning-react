"use strict";

var React = require('react');

var Home = React.createClass({

    // Required for all React components
    render: function() {
        // Parenthesis around the JSX is only required here b/c there's multiple lines of JSX
        return (
            <div className="jumbotron">
                <h1>Pluralsight Administration</h1>
                <p>React, React Router, and Flux for ultra-responsive web apps!!!</p>
                <p>Yeah you know we got that front-end jargon.</p>
            </div>
        );
    }

});


module.exports = Home;