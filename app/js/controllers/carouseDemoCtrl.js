angular.module('myApp.controllers')

  .controller('CarouselDemoCtrl', ['$scope', function($scope) {
    $scope.myInterval = 5000;
    $scope.slides = [{
        image: 'img/care_me_most.jpg',
        caption: 'Care Me Most',
        text: 'Someone may always pay attention to everything that you posted and leave a comment.'
      },
      {
        image: 'img/gals_before_pals.jpg',
        caption: 'Gals Before Pals?',
        text: 'Are you "Gals before pals" or just too shy to add a heterosexual friend?'
      },
      {
        image: 'img/friendsmap.jpg',
        caption: 'Friends Map',
        text: 'Your friends maybe spread all over the world!'
      },
      {
        image: 'img/network.jpg',
        caption: 'Network Map',
        text: 'Let\'s prove how small this world is!'
      }
    ];

  }])
