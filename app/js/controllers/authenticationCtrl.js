
angular.module('myApp.controllers')

.controller('AuthenticationCtrl',['$scope', 'Facebook', 'authentication', function($scope, Facebook, authentication) {

    // Here, usually you should watch for when Facebook is ready and loaded
//        $watch(function() {
//            return Facebook.isReady(); // This is for convenience, to notify if Facebook is loaded and ready to go.
//        }, function(newVal) {
//            $scope.facebookReady = true; // You might want to use this to disable/show/hide buttons and else
//        });

    // From now and on you can use the Facebook service just as Facebook api says
    // Take into account that you will need $scope.$apply when being inside Facebook functions scope and not angular
    $scope.login = authentication.login;

    $scope.logout = authentication.logout;

    $scope.getLoginStatus = authentication.getLoginStatus;

    $scope.getMe = authentication.getMe;

}])
