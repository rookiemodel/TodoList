define( function( require, exports, module ) {
    'use strict';

    var Backbone = require('backbone'),
    Storage = require('storage'),
    Model = require('models/TodoModel'),
    TodosCollection = Backbone.Collection.extend({
        comparator: 'order',
        model: Model,
        localStorage: new Storage('todo-mvc'),

        // _.where( list, properties )
        completed: function() {
            return this.where( {completed: true} );
        },

        remaining: function() {
            return this.where( {completed: false} );
        },

        nextOrder: function() {
            return this.length ? this.last().get('order')+1 : 1;
        }
    });

    module.exports = new TodosCollection();
});