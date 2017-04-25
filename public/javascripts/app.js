'use strict';
google.load('visualization', '1', {
  packages: ['geochart']
});

// Declare app level module which depends on filters, and services
angular.module('myApp', [
    'ngFacebook',
    'ui.router',
    'myApp.routes',
    'myApp.filters',
    'myApp.services',
    'myApp.directives',
    'myApp.controllers'
  ])
  .run(function($rootScope, $state, $stateParams, FacebookFactory, profile) {
    //https://www.npmjs.com/package/angular-facebook-factory
    FacebookFactory.init({
      appId: '229902130507040'
    });

    $rootScope.profile = profile;
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  })
