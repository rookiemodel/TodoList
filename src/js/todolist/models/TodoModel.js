define( function( require, exports, module ) {
    'use strict';

    var Backbone = require('backbone'),
    TodoModel = Backbone.Model.extend({
        defaults: {
            title: '',
            completed: false
        },

        toggle: function() {
            this.save( {completed: !this.get('completed')} );
        }
    });

    module.exports = TodoModel;
});