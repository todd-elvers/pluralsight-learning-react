$ = jQuery = require('jquery');
var React = require('react');
var Home = require('./components/homePage');

// Render the 'Home' component in the 'app' div
React.render(<Home />, document.getElementById('app'));