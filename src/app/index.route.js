(function() {
  'use strict';

  angular
    .module('angularChat')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'mainCtrl'
      }).state('rooms', {
        url: '/rooms',
        templateUrl: 'app/rooms/rooms.html',
        controller: 'RoomsController',
        controllerAs: 'roomsCtrl'
      }).state('rooms.item', {
        url: '/:id',
        templateUrl: 'app/rooms/room.item.html',
        controller: 'RoomItemController',
        controllerAs: 'roomItemCtrl'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
