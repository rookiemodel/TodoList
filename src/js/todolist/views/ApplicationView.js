define( function( require, exports, module ) {
    'use strict';

    var $ = require('jquery'),
    _ = require('underscore'),
    Backbone = require('backbone'),
    Collection = require('collections/TodoCollection'),
    View = require('views/TodoView'),
    statsTemplate = require('text!templates/stats.html'),
    ApplicationView = Backbone.View.extend({
        el: '#todoapp',
        template: _.template( statsTemplate ),
        events: {
            'keypress #new-todo': 'keypressInput',
            'click #clear-completed': 'clickClearCompleted',
            'click #toggle-all': 'changeToggleAll'
        },

        initialize: function() {
            this.allCheckbox = this.$('#toggle-all')[0];
            this.$input = this.$('#new-todo');
            this.$footer = this.$('#footer');
            this.$main = this.$('#main');
            this.$todoList = this.$('#todo-list');

            this.listenTo( Collection, 'add', this.addOne );
            this.listenTo( Collection, 'reset', this.addAll );
            this.listenTo( Collection, 'change:completed', this.filterOne );
            this.listenTo( Collection, 'filter', this.filterAll );
            this.listenTo( Collection, 'all', _.debounce(this.render, 0) );

            Collection.fetch( {reset:true} );
        },

        // Append Collection Data
        addAll: function() {
            this.$todoList.empty();
            Collection.each( this.addOne, this );
        },

        addOne: function( $model ) {
            var view = new View( {model:$model} );
            this.$todoList.append( view.render().el );
        },

        // Behavior add Collection data
        render: function() {
            var completed = Collection.completed().length;
            var remaining = Collection.remaining().length;

            if( Collection.length ) {
                this.$main.show();
                this.$footer.show();
                this.$footer.html( this.template( {completed:completed, remaining:remaining} ));
                this.$('#filters li a')
                    .removeClass('selected')
                    .filter('[href="#/' + (App.GlobalVars.filter || '') + '"]')
                    .addClass('selected');

            } else {
                this.$main.hide();
                this.$footer.hide();
            }

            this.allCheckbox.checked = !remaining;
        },

        // Router changed filter, event tigger
        filterAll: function() {
            Collection.each( this.filterOne, this );
        },

        // When you change the Collection completed property, trigger TodoView visible Event
        filterOne: function( $todo ) {
            $todo.trigger('visible');
        },

        // Create on Enter, push Input Value
        keypressInput: function( $evt ) {
            if( $evt.which !== App.GlobalVars.ENTER_KEY || !this.$input.val().trim() ) return;

            Collection.create( this.getInputValue() );
            this.$input.val('');
        },

        // Get inputField value
        getInputValue: function() {
            return {
                title: this.$input.val().trim(),
                order: Collection.nextOrder(),
                completed: false
            };
        },

        // Click Complete Button, Hash change Filter All
        clickClearCompleted: function() {
            _.invoke( Collection.completed(), 'destroy' );
            return false;
        },

        // V checkbox, List All select or unselect
        changeToggleAll: function() {
            var completed = this.allCheckbox.checked;
            Collection.each( function( todo ) {
                todo.save( {completed: completed} );
            });
        }
    });

    module.exports = ApplicationView;
});