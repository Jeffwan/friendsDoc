'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', [])
    // A RESTful factory for retreiving contacts from 'contacts.json'
    .factory('contacts', ['$http', function ($http, utils) {
        var path = 'lib/contacts.json';
        var contacts = $http.get(path).then(function (resp) {
            return resp.data.contacts;
        });

        var factory = {};
        factory.all = function () {
            return contacts;
        };
        factory.get = function (id) {
            return contacts.then(function(){
                return utils.findById(contacts, id);
            })
        };
        return factory;
    }])

    .factory('utils', function () {

        return {

            // Util for finding an object by its 'id' property among an array
            findById: function findById(a, id) {
                for (var i = 0; i < a.length; i++) {
                    if (a[i].id == id) return a[i];
                }
                return null;
            },

            // Util for returning a randomKey from a collection that also isn't the current key
            newRandomKey: function newRandomKey(coll, key, currentKey){
                var randKey;
                do {
                    randKey = coll[Math.floor(coll.length * Math.random())][key];
                } while (randKey == currentKey);
                return randKey;
            }

        };

    })

   .factory('Facebook', function($rootScope, $q) {

        function login() {
            var resp = $q.defer();

            FB.login(function(response) {
                setTimeout(function() {
                    $rootScope.$apply(function() {
                        resp.resolve(response.authResponse);
                        $rootScope.Facebook.token = response.authResponse;
                    });
                },1);
            });

//            $rootScope.Facebook.token = resp.promise;

        }

        function logout() {
            var resp = $q.defer();

            FB.logout(function(response) {
                setTimeout(function() {
                    $rootScope.$apply(function() {
                        resp.resolve(response.authResponse);
                        $rootScope.Facebook.token = null;
                    });
                },1);
            });

//            $rootScope.Facebook.token = null;
        }

        return {
            login: login ,
            logout: logout
        }
    })




window.fbAsyncInit = function() {
    FB.init({
        appId: '229902130507040'
    });
};

// Load the SDK Asynchronously
(function(d){
    var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement('script'); js.id = id; js.async = true;
    js.src = "//connect.facebook.net/en_US/all.js";
    ref.parentNode.insertBefore(js, ref);
}(document));
