
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
            Facebook.api('/me?fields=friends.fields(id,gender,name,hometown,location)', function(response) {
                if(response.friends) {
                    deferred.resolve(response.friends);
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

            Facebook.api('me/posts?fields=comments.fields(from,message),likes,id,message&limit=100&with=comments',function(response) {
                console.log(response);
                if(response) {
                    deferred.resolve(response);
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


        /**
         * Permission: friends_photos
         *    https://graph.facebook.com/me/friends?fields=albums.limit(5).fields(count,updated_time,name,type)
         *  bugs: someone like sheldon, i only get his id but not albums,
         *  it seems like limit doesn't matter, there're someone whom I can't get their phones.
         */
        function getFriendsAlbums() {
            var deferred = $q.defer();
            Facebook.api('/me/friends?fields=albums.limit(5).fields(count,updated_time,name,type),name,picture', function(response) {
                if(response.data) {
                    console.log(response);
                    deferred.resolve(response);
                } else {
                    //error handling
                }
            })
            return deferred.promise;
        }

        function getMutualFriends(friend) {
            Facebook.api('/me?fields=mutualfriends.user('+friend.id+')',function(response) {
                if(response.mutualfriends){

                    return response.mutualfriends.data;
                }
            })
        }


        function getAllMutualFriends() {
            var deferred = $q.defer();
            var mutualFriends = {node:[]};

            Facebook.api('/me?fields=friends',function(response) {
                var friends = response.friends.data;
                for (var i=0; i< friends.length; i++) {
                    mutualFriends.node.push({
                        name: friends[i].name,
                        id: friends[i].id,
                        mutualfriends: getMutualFriends(friends[i])})

                }
            })
            deferred.resolve(mutualFriends);

            return deferred.promise;

        }

        return {
            getMe : getMe,
            getFriends: getFriends,
            getMyFeeds: getMyFeeds,
            getFriendsGender : getFriendsGender,
            getFriendsAlbums : getFriendsAlbums,
            getAllMutualFriends: getAllMutualFriends
        }

    }])