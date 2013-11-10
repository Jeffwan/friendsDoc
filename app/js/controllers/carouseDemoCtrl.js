
angular.module('myApp.controllers')

.controller('CarouselDemoCtrl',['$scope', function($scope) {
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
