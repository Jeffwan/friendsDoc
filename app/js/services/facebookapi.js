
angular.module('myApp.services')
    .factory('facebookAPI',['$rootScope','$q','Facebook', function($rootScope,$q, Facebook){

        /**
         *  Function List
         *  1. getMe              --- Personal Information
         *  2. getFriends         --- Friends List -> important
         *  3. getMyFeeds         --- All posts on
         */

        function getMe() {
            var deferred = $q.defer();
            Facebook.api('/me', function(response) {
                $rootScope.$apply(function(){
                    $rootScope.profile = response;
                    deferred.resolve(response);

                })
            });
            return deferred.promise;
        };

        /**
         * Permission: user_friends function
         *
         */
        function getFriends() {
            var deferred = $q.defer();
            Facebook.api('/me?fields=friends.fields(id,gender,name)', function(response) {
                if(response.friends) {
                    deferred.resolve(response.friends.data);
                } else {
                    // error handling
                }

            });
            return deferred.promise;
        };


        /**
         * Permission: read_stream function
         * /me/feed?fields=id,message,comments,likes&limit=25
         * /me?fields=feed.limit(25).fields(id,message,likes,comments)
         * /me?fields=posts.limit(25).fields(id,message,likes,comments)
         *  me/feed?fields=comments.fields(from,message),likes,id,message&limit=25&with=comments
         */
        function getMyFeeds() {
            var  deferred = $q.defer();

            Facebook.api('me/feed?fields=comments.fields(from,message),likes,id,message&limit=25&with=comments',function(response) {
                console.log(response);
                if(response) {
                    deferred.resolve(response)
                } else {
                    //error handling
                }
            })
            return deferred.promise;
        }

        /**
         * Permission: user_friends function
         *
         */
        function getFriendsGender() {
            var deferred = $q.defer();
            Facebook.api('/me?fields=friends.fields(id,gender,name)', function(response) {
                if(response.friends) {
//                    result = {'male': male, 'female': female , 'total': response.friends.data.length}
//                    deferred.resolve(result);
                    deferred.resolve(response.friends);

                } else {
                    // error handling
                }

            });
            return deferred.promise;
        };


        function getFriendsAlbums() {
            var deferred = $q.defer();
            Facebook.api('/me/friends?fields=albums.limit(5).fields(count,updated_time,name,type)', function(response) {
                if(response.data) {
                    deferred.resolve(response.friends);
                } else {
                    //error handling
                }
            })
            return deferred.promise;
        }

        return {
            getMe : getMe,
            getFriends: getFriends,
            getMyFeeds: getMyFeeds,
            getFriendsGender : getFriendsGender,
            getFriendsAlbums : getFriendsAlbums
        }

    }])