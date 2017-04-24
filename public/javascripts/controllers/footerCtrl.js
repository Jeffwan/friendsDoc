angular.module('myApp.controllers')
  .controller('FooterCtrl', ['$scope', '$modal', function($scope, $modal) {

    // function open modal
    $scope.openModal = function() {
      var modalInstance = $modal.open({
        templateUrl: 'views/privacymodal.html',
        controller: ['$scope', '$modalInstance', function($scope, $modalInstance) {
          $scope.ok = function() {
            // $modalInstance.close();
            $modalInstance.dismiss('ok');
          };

        }]
      });
    };
  }])
