'use strict';

/* Controllers */

angular.module('myApp.routes', ['ui.router'])
    .config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
        $urlRouterProvider

            .otherwise('/');


        $stateProvider
            .state("home", {

                // Use a url of "/" to set a states as the "index".
                url: "/",

                // Example of an inline template string. By default, templates
                // will populate the ui-view within the parent state's template.
                // For top level states, like this one, the parent template is
                // the index.html file. So this template will be inserted into the
                // ui-view within index.html.
                templateUrl: 'templates/home.html'
            })

            .state('contacts',{
                abstract: true,

                // This abstract state will prepend '/contacts' onto the urls of all its children.
                url: '/contacts',

                // Example of loading a template from a file. This is also a top level state,
                // so this template file will be loaded and then inserted into the ui-view
                // within index.html.
                templateUrl: 'contacts.html',

                // Use `resolve` to resolve any asynchronous controller dependencies
                // *before* the controller is instantiated. In this case, since contacts
                // returns a promise, the controller will wait until contacts.all() is
                // resolved before instantiation. Non-promise return values are considered
                // to be resolved immediately.
                resolve: {
                    contacts: ['contacts',
                        function( contacts){
                            return contacts.all();
                        }]
                },
                controller: ['$scope', '$state', 'contacts', 'utils',
                    function (  $scope,   $state,   contacts,   utils) {

                        // Add a 'contacts' field in this abstract parent's scope, so that all
                        // child state views can access it in their scopes. Please note: scope
                        // inheritance is not due to nesting of states, but rather choosing to
                        // nest the templates of those states. It's normal scope inheritance.
                        $scope.contacts = contacts;

                        $scope.goToRandom = function () {
                            var randId = utils.newRandomKey($scope.contacts, "id", $state.params.contactId);

                            // $state.go() can be used as a high level convenience method
                            // for activating a state programmatically.
                            $state.go('contacts.detail', { contactId: randId });
                        };
                    }]


            })


            .state('about', {
                url: '/about',

                // Showing off how you could return a promise from templateProvider
                templateUrl: 'templates/about.html'
            })

    }])