$ = jQuery = require('jquery');
var React = require('react');
var Home = require('./components/homePage.jsx');
var Authors = require('./components/authors/authorPage.jsx');
var About = require('./components/about/aboutPage.jsx');
var Header = require('./components/common/header.jsx');

(function ($, window, document, undefined) {
    "use strict";

    // A super simple solution to the problem React Router solves
    var App = React.createClass({
        render: function () {
            var Child;

            switch (this.props.route) {
                case 'about':
                    Child = About;
                    break;
                case 'authors':
                    Child = Authors;
                    break;
                default:
                    Child = Home;
            }

            return (
                <div>
                    <Header />
                    <Child />
                </div>
            );
        }
    });

    function render() {
        // URL hash = the # in the URL and everything to the right of it. E.g. '#about')
        var urlHash = window.location.hash;
        var route = urlHash.substr(1);
        React.render(<App route={route}/>, document.getElementById('app'));
    }

    // Listen for a hash change in the URL and call render when it does
    window.addEventListener('hashchange', render);

    // Initial call to render when app loads
    render();
})(jQuery, window, document);
