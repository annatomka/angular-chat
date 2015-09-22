(function () {
  'use strict';

  angular
    .module('angularChat')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.html',
        controller: 'LoginController',
        controllerAs: 'loginCtrl'
      }).state('rooms', {
        url: '/rooms',
        data: {authenticated: true}
      });

    $urlRouterProvider.when('/', 'rooms');

    $urlRouterProvider.otherwise('/');
  }

})();
