/**
* Created by huanwang on 11/6/13.
*/


angular.module('myApp.controllers')
  .controller('DropdownCtrl', ['$scope',function ($scope) {
        $scope.items = [
            {   text: 'CareMeMost',
                url: 'care-me-most'},
            {   text: 'Profile',
                url: 'profile'},
            {   text: 'Statics',
                url: 'statics'},
            {   text: 'Narcissistic',
                url: 'narcissistic'},
            {   text: 'LikeMeMost',
                url: 'like-me-most'}
     ]


    }])

