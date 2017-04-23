/**
 * Created by huanwang on 11/6/13.
 */


angular.module('myApp.controllers')
  .controller('DropdownCtrl', ['$scope', function($scope) {
    $scope.items = [{
        text: 'CareMeMost',
        url: 'care-me-most'
      },
      {
        text: 'LikeMeMost',
        url: 'like-me-most'
      },
      {
        text: 'MyNetwork',
        url: 'networkmap'
      },
      {
        text: 'Sex',
        url: 'sex'
      },
      {
        text: 'Narcissistic',
        url: 'narcissistic'
      },
      {
        text: 'MutualFriends',
        url: 'mutualfriends'
      }
    ]


  }])
