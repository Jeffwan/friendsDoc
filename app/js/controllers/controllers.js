'use strict';

/* Controllers */

angular.module('myApp.controllers', ['ui.bootstrap'])
    .controller('DatepickerDemoCtrl', ['$scope','$timeout',function($scope, $timeout) {
        $scope.today = function() {
            $scope.dt = new Date();
        };
        $scope.today();

        $scope.showWeeks = true;
        $scope.toggleWeeks = function () {
            $scope.showWeeks = ! $scope.showWeeks;
        };

        $scope.clear = function () {
            $scope.dt = null;
        };

        // Disable weekend selection
        $scope.disabled = function(date, mode) {
            return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
        };

        $scope.toggleMin = function() {
            $scope.minDate = ( $scope.minDate ) ? null : new Date();
        };
        $scope.toggleMin();

        $scope.open = function() {
            $timeout(function() {
                $scope.opened = true;
            });
        };

        $scope.dateOptions = {
            'year-format': "'yy'",
            'starting-day': 1
        };


        }])

    .controller('CarouselDemoCtrl',['$scope',function($scope){
        $scope.myInterval = 5000;
        $scope.slides = [
            {
                image: 'http://2.bp.blogspot.com/-vxx3qRD0-3g/Tq81Im7OvqI/AAAAAAAAKPA/CW6_bj4I8GI/s1600/009.JPG',
                text: 'first photo'
            },
            {
                image: 'http://www.google.com/hostednews/afp/media/ALeqM5gqtw_XHhAKVrqWoxOoQYEfcw1UqA?size=s3',
                text: 'second photo'
            },
            {
                image: 'http://2.bp.blogspot.com/-vxx3qRD0-3g/Tq81Im7OvqI/AAAAAAAAKPA/CW6_bj4I8GI/s1600/009.JPG',
                text: 'third photo'
            },
            {
                image: 'http://www.google.com/hostednews/afp/media/ALeqM5gqtw_XHhAKVrqWoxOoQYEfcw1UqA?size=s3',
                text: 'fourth photo'
            }
        ];

    }])



