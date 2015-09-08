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
      }).state('home.room', {
        url: '/:id',
        templateUrl: 'app/rooms/room.item.html',
        controller: 'RoomItemController',
        controllerAs: 'roomItemCtrl',
        data: {authenticated: true}
      });

    $urlRouterProvider.otherwise('/');
  }

})();
