define( function( require, exports, module ) {
    'use strict';

    var Backbone = require('backbone'),
    Collection = require('collections/TodoCollection'),
    View = require('views/ApplicationView'),
    Application = Backbone.Router.extend({
        GlobalVars: {
            ENTER_KEY: 13,
            ESCAPE_KEY: 27,
            filter: ''
        },

        routes: {
            '*filter': 'changeHash'
        },

        changeHash: function( $filter ) {
            App.GlobalVars.filter = $filter || '';

            Collection.trigger('filter');
        },

        start: function() {
            this.view = new View();

            Backbone.history.start();
        }
    });

    module.exports = Application;
});