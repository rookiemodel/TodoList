require.config({
    urlArgs: 'v=' +  (new Date()).getTime(),
    baseUrl: 'js/todolist/',
    paths: {
        jquery: '../vendor/jquery-1.11.0.min',
        underscore: '../vendor/underscore-1.8.3.min',
        backbone: '../vendor/backbone-1.2.3.min',
        storage: '../vendor/backbone.localStorage-1.1.16.min',
        text: '../vendor/text',
        plugins: '../vendor/plugins'
    },
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        storage: {
            deps: ['backbone'],
            exports: 'Storage'
        },
        plugins: {
            deps: ['jquery']
        }
    }
});

require(['plugins', 'Application'], function( Plugins, Application ) {
    Platform.division();

    window.App = new Application();
    App.start();
});