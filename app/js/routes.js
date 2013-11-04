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
                resolve: {
                  me:['authentication','facebookAPI',function(authentication,facebookAPI){
                      authentication.login();
                      return facebookAPI.getMe();
                  }]
                },
                controller:'ProfileCtrl'
            })

            .state('statics',{
                url: '/statics',
                templateUrl: 'templates/statics.html',
                controller: 'StaticsCtrl',
                resolve: {
                    friendsList:['facebookAPI',function(facebookAPI) {
                        return facebookAPI.getFriends();
                    }],
                    statusList:['facebookAPI',function(facebookAPI) {
                        return facebookAPI.getMyFeeds();
                    }]
                }
            })

            .state('about', {
                url: '/about',
                templateUrl: 'templates/about.html'
            })

            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'templates/dashboard.html'
            })

    }])


    .controller('ProfileCtrl',['$scope','authentication','me', function($scope,authentication,me){
        $scope.pullProfile = authentication.login;
//        console.log(facebookAPI.getMe());
        $scope.profile = me;

    }])

    .controller('StaticsCtrl',['$scope', 'friendsList','statusList', function($scope, friendsList, statusList){
        $scope.friends = friendsList;

        $scope.statuses = statusList;
    }])