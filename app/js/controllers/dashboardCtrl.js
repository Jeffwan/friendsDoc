/**
 * Created with JetBrains WebStorm.
 * User: jeffwan
 * Date: 12/4/13
 * Time: 11:03 PM
 * To change this template use File | Settings | File Templates.
 */

angular.module('myApp.controllers')
    .controller('DashboardCtrl',['$scope','$state','$modal','$log',function($scope,$state,$modal,$log) {
        $scope.carememost = function() {
           $state.go('care-me-most');
        }

        $scope.likememost = function() {
            $state.go('like-me-most');
        }

        $scope.network = function() {
            $state.go('networkmap');
        }

        $scope.sex = function() {
            $state.go('sex');
        }

        $scope.narcissistic = function() {
            $state.go('narcissistic');
        }

        $scope.mutualfriends = function() {
            $state.go('mutualfriends');
        }

    }])





