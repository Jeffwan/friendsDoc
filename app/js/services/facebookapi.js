
angular.module('myApp.services')
    .factory('facebookAPI',['Facebook', function(Facebook){

        /**
         *  Function List
         *  1. getMe              --- Personal Information
         *  2. getFriends         --- Friends List -> important
         *  3. getMyFeeds         --- All posts on
         */

        function getMe() {
            Facebook.api('/me', function(response) {
                console.log(response);
                return response;
            });
        };

        function getFriends() {
            Facebook.api('/friends', function(response) {
//                $rootScope.$apply(function() {
//                    // Here you could re-check for user status (just in case)
//                    $rootScope.FacebookData.myself = response;
//                });
                return response;
            });
        };

        function getMyFeeds() {
            Facebook.api('/me?fields=feed.limit(25).fields(id,message,comments,likes)',function(response) {
                return response;
            })
        }


        return {
            getMe : getMe,
            getFriends: getFriends,
            getMyFeeds: getMyFeeds
        }


    }])