'use strict';
google.load('visualization', '1', {packages: ['geochart']});

// Declare app level module which depends on filters, and services
angular.module('myApp', [
    'facebook',
    'ui.router',
    'myApp.routes',
    'myApp.filters',
    'myApp.services',
    'myApp.directives',
    'myApp.controllers'
])
    .config(['FacebookProvider',function(FacebookProvider){
        FacebookProvider.init('229902130507040');
    }])


    .run(['$rootScope', '$state', '$stateParams',
            function ($rootScope,$state, $stateParams, profile) {
                $rootScope.profile = profile;
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }])