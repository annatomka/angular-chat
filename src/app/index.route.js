(function() {
  'use strict';

  angular
    .module('angularChat')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('rooms', {
        url: '/rooms',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'mainCtrl',
        data: {authenticated: true}
      }).state('login', {
        url: '/login',
        templateUrl: 'app/login/login.html',
        controller: 'LoginController',
        controllerAs: 'loginCtrl'
      }).state('registration', {
        url: '/registration',
        templateUrl: 'app/registration/registration.html',
        controller: 'RegistrationController',
        controllerAs: 'registrationCtrl'
      }).state('rooms.room', {
        url: '/:id',
        templateUrl: 'app/rooms/room.item.html',
        controller: 'RoomItemController',
        controllerAs: 'roomItemCtrl',
        data: {authenticated: true}
      });

    $urlRouterProvider.when('/','rooms');
    $urlRouterProvider.otherwise('/');
  }

})();
