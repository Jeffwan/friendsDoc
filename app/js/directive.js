angular.module('myApp.directives', []).
    directive('appVersion', ['version', function(version) {
        return function(scope, elm, attrs) {
            elm.text(version);
        };
    }])

    .directive('node', ['$log', function($long){
        return {
            replace:true,
            restrict:'E',
            templateUrl:'views/node.html',
            link:function (scope, elem, attr, ctrl) {
                if (scope.$last === true) {
                    scope.renderComplete();
                }
            }
        }
    }])