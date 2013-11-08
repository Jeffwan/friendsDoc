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
//                    console.log(feedsList.data[x].comments.data[i]);
                    if ($scope.count[feedsList.data[x].comments.data[i].from.id]) {
                        $scope.count[feedsList.data[x].comments.data[i].from.id] ++;
                    } else {
                        $scope.count[feedsList.data[x].comments.data[i].from.id] = 1;
                    }
                }
            }
        }

        console.log($scope.count);
    }])


    /**
     * if (friendsAlbums.data[x].albums)  -- this sets for Sheldon, I Can't get his data from API but website works
     * if (friendsAlbums.data[x].albums.data[i]) -- this sets for Flynn? or the following one
     */

    .controller('NarcissisticCtrl', ['$scope', 'friendsAlbums', function($scope, friendsAlbums) {
        $scope.count = {};

        for (var x in friendsAlbums.data) {
            if (friendsAlbums.data[x].albums) {
                for (var i=0;  i<5 ; i++) {
                    if (friendsAlbums.data[x].albums.data[i]) {
//                        console.log(friendsAlbums.data[x].albums.data[i].name);
                        if (friendsAlbums.data[x].albums.data[i].name == "Profile Pictures") {
                            $scope.count[friendsAlbums.data[x].id] = friendsAlbums.data[x].albums.data[i].count;
                        }
                    }
                }
            }
        }

        // here we should handle the hash, sort it , get the first 5.

        console.log($scope.count);

    }])
