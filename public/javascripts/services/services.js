'use strict';

/* Services */

angular.module('myApp.services', ['facebook'])
  .factory('utils', ['$rootScope', function($rootScope) {
    function hashSortbyValue(hash) {
      var result = [];

      // change hash to double-dimensional Array
      for (var p in hash) {
        if (hash.hasOwnProperty(p)) result.push([p, hash[p]]);
      }

      // sort Array according to value
      result.sort(function(a, b) {
        return b[1] - a[1];
      });

      // we don't need to convert Array to hash, because hash can not show the sort relation.
      return result;
    }


    function removeSelf(selfId, result) {
      for (var i = 0; i < result.length; i++) {
        if (selfId == result[i][0]) {
          result.splice(i, 1);
        }
      }

      return result;
    }


    function searchPicture(rankResult, data) {
      var result = [];
      for (var i = 0; i < rankResult.length; i++) {
        for (var j = 0; j < data.length; j++) {
          if (rankResult[i][0] == data[j].name) {
            result[i] = data[j].picture.data.url;
          }
        }
      }
      return result;
    }

    function filterCity(cityArray) {

      for (var i = 0; i < cityArray.length; i++) {
        var index = cityArray[i][0].indexOf(",");
        cityArray[i][0] = cityArray[i][0].substr(0, index);
      }

      // use unshift instead of push to push this Arrary to the first index
      cityArray.unshift(["City", "Population"]);

      return cityArray;
    }


    return {
      hashSortbyValue: hashSortbyValue,
      removeSelf: removeSelf,
      searchPicture: searchPicture,
      filterCity: filterCity
    }

  }])

  .factory('AppModel', ['$log', function($log) {
    var appModel = {
      me: null,
      friends: []
    }
    return appModel;
  }])
