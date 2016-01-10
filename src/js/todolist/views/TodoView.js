define( function( require, exports, module ) {
    'use strict';

    var $ = require('jquery'),
    _ = require('underscore'),
    Backbone = require('backbone'),
    todosTemplate = require('text!templates/todo.html'),
    TodoView = Backbone.View.extend({
        tagName:  'li',
        template: _.template( todosTemplate ),
        events: {
            'click .toggle': 'changeListToggle',
            'dblclick label': 'doubleClickListLabel',
            'click .destroy': 'clickListXBtn',
            'keypress .edit': 'keypressEdit',
            'keydown .edit': 'keydownEdit',
            'blur .edit': 'blurEdit'
        },

        initialize: function() {
            this.listenTo( this.model, 'change', this.render );
            this.listenTo( this.model, 'destroy', this.remove );
            this.listenTo( this.model, 'visible', this.toggleVisible );
        },

        // Observe, change model
        render: function() {
            this.$el.html( this.template(this.model.toJSON()) );
            this.$el.toggleClass('completed', this.model.get('completed'));
            this.toggleVisible();
            this.$input = this.$('.edit');
            return this;
        },

        // Condition is isHidden true, add hidden class
        toggleVisible: function() {
            this.$el.toggleClass( 'hidden',  this.isHidden() );
        },

        // If true even if either one of the case of, return true
        isHidden: function() {
            var isCompleted = this.model.get('completed');
            return (!isCompleted && App.GlobalVars.filter === 'completed') || (isCompleted && App.GlobalVars.filter === 'active');
        },

        // Checked completed toggle, change completed
        changeListToggle: function() {
            this.model.toggle();
        },

        // Doubleclick List label, change edit mode
        doubleClickListLabel: function() {
            this.$el.addClass('editing');
            this.$input.focus();
        },

        // Lose focus via keyboard commands, such as the Tab key
        blurEdit: function() {
            var value = this.$input.val();
            var trimmedValue = value.trim();
            if( trimmedValue ) {
                this.model.save( {title: trimmedValue} );

                if( value !== trimmedValue ) {
                    this.model.trigger('change');
                }

            } else {
                this.clickListXBtn();
            }

            this.$el.removeClass('editing');
        },

        // Update on Enter, save model
        keypressEdit: function( $evt ) {
            if( $evt.keyCode === App.GlobalVars.ENTER_KEY ) {
                this.blurEdit();
            }
        },

        // Revert on Escape, exit editing
        keydownEdit: function( $evt ) {
            if( $evt.which === App.GlobalVars.ESCAPE_KEY ) {
                this.$el.removeClass('editing');
                this.$input.val( this.model.get('title') );
            }
        },

        // Click List X button, remove hover list
        clickListXBtn: function() {
            this.model.destroy();
        }
    });

    module.exports = TodoView;
});