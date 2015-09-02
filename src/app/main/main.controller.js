(function () {
  'use strict';

  angular
    .module('angularChat')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, $timeout, $mdBottomSheet, toastr, RoomService, $log,$rootScope,$state,openedRoomsFactory) {
    var mainCtrl = this;
  }
})();
