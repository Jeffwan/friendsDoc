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

        function login () {
            Facebook.login(function(response) {
                if (response.status == 'connected') {
                    $rootScope.logged = true;
                    return getMe();
                }
            });
        };

        function logout() {
            Facebook.logout(function(response) {
                // Do something with response. Don't forget here you are on Facebook scope so use $scope.$apply
                $rootScope.$apply(function(){
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
                    console.log(response);
                    $rootScope.profile = response;
                    deferred.resolve(response);

                })
            });
            return deferred.promise;
        };

        return {
            login: login,
            logout: logout,
            getLoginStatus: getLoginStatus,
            getMe: getMe
        }


    }])

