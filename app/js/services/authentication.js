/**
 * Created with JetBrains WebStorm.
 * User: jeffwan
 * Date: 10/30/13
 * Time: 10:09 PM
 * To change this template use File | Settings | File Templates.
 */


'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services')
    // A RESTful factory for retreiving contacts from 'contacts.json'
    .factory('authentication', ['$rootScope','$q','Facebook', function ($rootScope, $q, Facebook) {
        $rootScope.profile = {};

        //declare facebook permissions in login process
        var permissions ={
            scope:'user_friends, read_stream, export_stream, friends_photos, friends_hometown, friends_location'
        }

        function login () {
            Facebook.login(function(response) {
                if (response.status == 'connected') {
                    $rootScope.authentication = response.authResponse;
                    $rootScope.logged = true;
                    getMe();
                    getFriendsPictures();
                }
            }, permissions);
        };

        function logout() {
            Facebook.logout(function(response) {
                // Do something with response. Don't forget here you are on Facebook scope so use $scope.$apply
                $rootScope.$apply(function(){
                    $rootScope.authentication = null;
                    $rootScope.logged = false;
                    $rootScope.profile = {};
                })
            });
        };

        function getLoginStatus() {
            var deferred = $q.defer();
            Facebook.getLoginStatus(function(response) {
                deferred.resolve(response);
            // return here or at last step
            })
            return deferred.promise;
        };

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

        function getFriendsPictures() {
            var deferred = $q.defer();
            Facebook.api('/me?fields=friends.fields(picture,name)', function(response) {
                $rootScope.$apply(function(){
                    $rootScope.friendsPicture = response;
                    deferred.resolve(response);

                })
            });
            return deferred.promise;
        };

        return {
            login: login,
            logout: logout,
            getLoginStatus: getLoginStatus,
            getMe: getMe,
            getFriendsPictures:getFriendsPictures
        }


    }])

