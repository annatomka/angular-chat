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
      }).state('registration', {
        url: '/registration',
        templateUrl: 'app/registration/registration.html',
        controller: 'RegistrationController',
        controllerAs: 'registrationCtrl'
      })
      .state('rooms', {
        url: '/rooms',
        templateUrl: 'app/room/room.tabs.tmpl.html',
        controller: 'RoomsController',
        controllerAs: 'roomsCtrl',
        data: {authenticated: true},
        resolve: {
          users : function (allUsersFactory) {
            return allUsersFactory.initUsers();
          }
        }
      }).state('rooms.room', {
        url: '/:id',
        templateUrl: 'app/room/room.item.html',
        controller: 'RoomItemController',
        controllerAs: 'roomItemCtrl',
        data: {authenticated: true},
        resolve: {
          room: function (RoomService, $stateParams) {
            var roomId = $stateParams.id;
            return RoomService.getRoom(roomId);
          },
          messages: function (MessageService, $state, $stateParams) {
            var roomId = $stateParams.id;
            return MessageService.getRoomMessages(roomId);
          }
        }
      });

    $urlRouterProvider.when('/', 'rooms');
    $urlRouterProvider.otherwise('/');
  }

})();
