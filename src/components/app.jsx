/*eslint-disable strict*/  //Disable eslint strict mode here since we need to define global vars for bootstrap
$ = jQuery = require('jquery');

var React = require('react');
var Header = require('./common/header.jsx');
var RouteHandler = require('react-router').RouteHandler;

var App = React.createClass({
    render: function () {
        return (
            <div>
                <Header />
                <div className="container-fluid">
                    <RouteHandler/>
                </div>
            </div>
        );
    }
});

module.exports = App;