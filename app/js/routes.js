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
                    sex: ['facebookAPI',function(facebookAPI) {
                        return facebookAPI.getFriendsGender();
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

            .state('care-me-most', {
                url: '/care-me-most',
                templateUrl: 'templates/carememost.html',
                controller:'CareMeMost',
                resolve: {
                    feedsList:['facebookAPI',function(facebookAPI) {
                        return facebookAPI.getMyFeeds();
                    }]
                }
            })

            .state('narcissistic', {
                url: '/narcissistic',
                templateUrl: 'templates/narcissistic.html',
                controller: 'NarcissisticCtrl',
                resolve: {
                    friendsAlbums: ['facebookAPI', function(facebookAPI) {
                        return facebookAPI.getFriendsAlbums();
                    }]
                }
            })

    }])


    .controller('ProfileCtrl', ['$scope','authentication','me', function($scope,authentication,me){
        $scope.pullProfile = authentication.login;
//        console.log(facebookAPI.getMe());
        $scope.profile = me;

    }])

    .controller('StaticsCtrl', ['$scope', 'friendsList','sex', function($scope, friendsList, sex){
        $scope.friends = friendsList;


        $scope.male = 0
        $scope.female = 0;
        $scope.total = sex.data.length;

        for (var x in sex.data) {
            if (sex.data[x].gender == 'male') {
                $scope.male++;
            } else {
                $scope.female++;
            }
        }

    }])

    .controller('CareMeMost', ['$scope', 'feedsList', function($scope,feedsList){
        $scope.feeds = feedsList.data ;
        $scope.count = {}

        for (var x in feedsList.data) {
            if (feedsList.data[x].comments) {
                for (var i in feedsList.data[x].comments.data) {
                    feedsList.data[x].comments.data[i].from.id;
                }

                    feedsList.data[x].comments.data.from.id
            }
        }


    }])


    .controller('NarcissisticCtrl', ['$scope', 'friendsAlbums', function($scope, friendsAlbums) {
        $scope.count = {}

        for (var x in friendsAlbums.data) {
            for (var i in friendsAlbums.data[x]) {
                if (friendsAlbums.data[x].albums.data[i].name == "Profile Pictures") {
                   // friendsAlbums.data[x].id --- friendsAlbums.data[x].albums.data[i].count;
                }
            }

        }




    }])
