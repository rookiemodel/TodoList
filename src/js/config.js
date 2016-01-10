require.config({
    baseUrl: "js/todolist/",
    paths: {
        jquery: '../vendor/jquery-1.11.0.min',
        underscore: '../vendor/underscore-1.8.3.min',
        backbone: '../vendor/backbone-1.2.3.min',
        storage: '../vendor/backbone.localStorage-1.1.16.min',
        text: '../vendor/text'
    },
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        backboneLocalstorage: {
            deps: ['backbone'],
            exports: 'Store'
        }
    }
});

require(['Application'], function( Application ) {
    window.App = new Application();
    App.start();
});
