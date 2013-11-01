'use strict';

/* Controllers */

angular.module('myApp.routes', ['ui.router'])
    .config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
        $urlRouterProvider

            .otherwise('/');


        $stateProvider
            .state("home", {
                url: '/',
                templateUrl: 'templates/home.html'
            })
            .state("profile", {
                url:'/profile',
                templateUrl:'templates/profile.html',
//                resolve: {
//                  me:['facebookAPI',function(facebook){
//                      facebook.login();
//                      return facebook.getMe();
//                  }]
//                },
                controller:'ProfileCtrl'
            })

            .state('statics',{
                abstract: true,
                url: '/statics',
                templateUrl: 'templates/statics.html',
                controller: 'StaticsCtrl'
            })

            .state('about', {
                url: '/about',
                templateUrl: 'templates/about.html'
            })

    }])


    .controller('ProfileCtrl',['$scope','authentication','facebookAPI', function($scope,authentication,facebookAPI){
        $scope.pullProfile = authentication.login;
        console.log(facebookAPI.getMe());

    }])

    .controller('StaticsCtrl',['$scope', 'facebookAPI',function($scope,facebookAPI){

    }])