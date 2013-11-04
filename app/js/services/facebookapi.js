
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
         * User_friends function
         * @returns {Function|promise|promise|Function|Function|promise|Function|Function}
         */
        function getFriends() {
            var deferred = $q.defer();
            Facebook.api('.me?fields=friends.fields(gender,id,name)', function(response) {
                if(response.friends) {
                    deferred.resolve(response.friends.data);
                } else {
                    // error handling
                }

            });
            return deferred.promise;
        };



        function getMyFeeds() {
            var  deferred = $q.defer();

            Facebook.api('/me?fields=feed.limit(25).fields(id,message,comments,likes)',function(response) {
                console.log(response);
                if(response.feed) {
                    deferred.resolve(response.feed.data)
                } else {
                    //error handling
                }
            })
            return deferred.promise;
        }


        return {
            getMe : getMe,
            getFriends: getFriends,
            getMyFeeds: getMyFeeds
        }


    }])