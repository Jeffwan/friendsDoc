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
angular.module('myApp.services', ['facebook'])
    // A RESTful factory for retreiving contacts from 'contacts.json'
    .factory('authentication', ['$rootScope','Facebook', function ($rootScope, Facebook) {
        function login () {
            Facebook.login(function(response) {
                // Do something with response. Don't forget here you are on Facebook scope so use $scope.$apply
                console.log(response);
                $rootScope.FacebookData.token = response.authResponse;

            });
        };

        function logout() {
            console.log("log out called?");
            Facebook.logout(function(response) {
                // Do something with response. Don't forget here you are on Facebook scope so use $scope.$apply
                $rootScope.$apply(function(){
                    $rootScope.FacebookData.token =  null ;
                    console.log($rootScope.FacebookData.token);
                })
            });
        };

        function getLoginStatus() {
            Facebook.getLoginStatus(function(response) {
                if(response.status == 'connected'){
                    $rootScope.$apply(function() {
                    console.log(response.status);
                    });
                } else {
//                    $scope.$apply(function() {
                    console.log(response.status);
//                    });
                }

            })
        };

        function getMe() {
            Facebook.api('/me', function(response) {
                $rootScope.$apply(function() {
                    // Here you could re-check for user status (just in case)
                    $rootScope.FacebookData.myself = response;
                    console.log(response);
                });
            });
        };



        return {
            login: login,
            logout: logout,
            getLoginStatus: getLoginStatus,
            getMe: getMe
        }








    }])