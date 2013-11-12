'use strict';

/* Services */

angular.module('myApp.services', ['facebook'])
    .factory('utils',['$rootScope',function($rootScope){
        function hashSortbyValue(hash){
            var result = [];

            // change hash to double-dimensional Array
            for(var p in hash){
                if(hash.hasOwnProperty(p)) result.push([p, hash[p]]);
            }

            // sort Array according to value
            result.sort(function(a, b){
                return b[1]-a[1];
            });

            // we don't need to convert Array to hash, because hash can not show the sort relation.
            return result;
        }


        function removeSelf(selfId, result) {
            for (var i=0; i< result.length; i++ ) {
                if(selfId == result[i][0]) {
                    result.splice(i,1);
                }
            }

            return result;
        }

        return {
             hashSortbyValue: hashSortbyValue,
             removeSelf: removeSelf
        }

    }])
