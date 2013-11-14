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

            .state('sex',{
                url: '/sex',
                templateUrl: 'templates/sex.html',
                controller: 'SexCtrl',
                resolve: {
                    friendsList:['facebookAPI',function(facebookAPI) {
                        return facebookAPI.getFriends();
                    }],
                    mutualFriends :['facebookAPI', function(facebookAPI) {
                        return facebookAPI.getAllMutualFriends();
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
                    }],
                    me:['authentication','facebookAPI',function(authentication,facebookAPI){
                        return facebookAPI.getMe();
                    }]
                }
            })
            .state('like-me-most', {
                url: '/like-me-most',
                templateUrl: 'templates/likememost.html',
                controller:'LikeMeMost',
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
            .state('networkmap',{
                url:'/networkmap',
                templateUrl:'templates/networkmap.html',
                controller:'NetworkmapCtrl',
                resolve:{
                    friendsList:['facebookAPI',function(facebookAPI) {
                        return facebookAPI.getFriends();
                    }]
                }
            })

    }])


    .controller('ProfileCtrl', ['$scope','authentication','me', function($scope,authentication,me){
        $scope.pullProfile = authentication.login;
//        console.log(facebookAPI.getMe());
        $scope.profile = me;

    }])

    .controller('SexCtrl', ['$scope', 'friendsList','mutualFriends',  function($scope, friendsList ,mutualFriends){
        $scope.friends = friendsList;
        $scope.male = 0
        $scope.female = 0;
        $scope.total = friendsList.data.length;

        for (var x in friendsList.data) {
            if (friendsList.data[x].gender == 'male') {
                $scope.male++;
            } else {
                $scope.female++;
            }
        }

        console.log(mutualFriends);

    }])

    .controller('CareMeMost', ['$scope', 'feedsList', 'me', 'utils' ,function($scope,feedsList,me,utils){
        $scope.feeds = feedsList.data ;
        $scope.profile = me;
        $scope.count = {}
        console.log(feedsList.data);
        for (var x in feedsList.data) {
            if (feedsList.data[x].comments) {

                for (var i in feedsList.data[x].comments.data) {
//                    console.log(feedsList.data[x].comments.data[i]);
                    if ($scope.count[feedsList.data[x].comments.data[i].from.name]) {
                        $scope.count[feedsList.data[x].comments.data[i].from.name] ++;
                    } else {
                        $scope.count[feedsList.data[x].comments.data[i].from.name] = 1;
                    }
                }
            }
        }

        $scope.result = utils.removeSelf($scope.profile.name, utils.hashSortbyValue($scope.count));
        $scope.pictures = $scope.pictures = utils.searchPicture($scope.result,$scope.friendsPicture.friends.data);


    }])

    .controller('LikeMeMost', ['$scope', 'feedsList', 'utils', function($scope,feedsList,utils){
        $scope.feeds = feedsList.data ;
        $scope.count = {}

        for (var x in feedsList.data) {
            if (feedsList.data[x].likes) {
                for (var i in feedsList.data[x].likes.data) {
  //                  console.log(feedsList.data[x].comments.data[i]);
                    if ($scope.count[feedsList.data[x].likes.data[i].name]) {
                        $scope.count[feedsList.data[x].likes.data[i].name] ++;
                    } else {
                        $scope.count[feedsList.data[x].likes.data[i].name] = 1;
                    }
                }
            }
        }
        console.log($scope.count);
        $scope.result = utils.hashSortbyValue($scope.count);
        $scope.pictures = utils.searchPicture($scope.result,$scope.friendsPicture.friends.data);

    }])

    /**
     * if (friendsAlbums.data[x].albums)  -- this sets for Sheldon, I Can't get his data from API but website works
     * if (friendsAlbums.data[x].albums.data[i]) -- this sets for Flynn? or the following one
     *
     * Algorithm:
     * 1.get pictures account
     *   - if count >=10   chu?
     *   - if count < 10   buchu?
     *   - need to talk with yaxian.
     */

    .controller('NarcissisticCtrl', ['$scope', 'friendsAlbums','utils', function($scope, friendsAlbums, utils) {
        $scope.count = {};

        for (var x in friendsAlbums.data) {
            if (friendsAlbums.data[x].albums) {
                for (var i=0;  i<5 ; i++) {
                    if (friendsAlbums.data[x].albums.data[i]) {
//                        console.log(friendsAlbums.data[x].albums.data[i].name);
                        if (friendsAlbums.data[x].albums.data[i].name == "Profile Pictures") {
                            $scope.count[friendsAlbums.data[x].name] = friendsAlbums.data[x].albums.data[i].count;

                        }
                    }
                }
            }
        }

        // here we should handle the hash, sort it , get the first 5.

        $scope.result = utils.hashSortbyValue($scope.count);

//        console.log($scope.result);


        $scope.pictures = utils.searchPicture($scope.result, $scope.friendsPicture.friends.data);

    }])

    .controller('NetworkmapCtrl', ['$scope','friendsList','utils', function($scope,friendsList,utils){
        $scope.count={};

        for(var x in friendsList.data){
            if(friendsList.data[x].location){
                if($scope.count[friendsList.data[x].location.name]){
                    $scope.count[friendsList.data[x].location.name]++;
                }else {
                    $scope.count[friendsList.data[x].location.name] = 1;
                }
            }else if(friendsList.data[x].hometown){
                if($scope.count[friendsList.data[x].hometown.name]){
                    $scope.count[friendsList.data[x].hometown.name]++;
                }else {
                    $scope.count[friendsList.data[x].hometown.name] = 1;
                }
            }

        }
//        console.log($scope.count);

        $scope.result = utils.hashSortbyValue($scope.count);
    }])