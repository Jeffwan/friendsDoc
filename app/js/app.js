'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
    'ui.router',
    'myApp.routes',
    'myApp.filters',
    'myApp.services',
    'myApp.directives',
    'myApp.controllers'
])
    .run(['$rootScope', '$state', '$stateParams', 'Facebook',
            function ($rootScope,$state, $stateParams, Facebook) {

                // It's very handy to add references to $state and $stateParams to the $rootScope
                // so that you can access them from any scope within your applications.For example,
                // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
                // to active whenever 'contacts.list' or one of its decendents is active.
                $rootScope.Facebook = Facebook;
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }])