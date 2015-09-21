(function () {
  'use strict';

  angular
    .module('angularChat')
    .controller('RoomsController', RoomsController);

  /** @ngInject */
  function RoomsController($scope, $timeout, $mdBottomSheet, toastr, RoomService, $log,$rootScope,$state,openedRoomsFactory) {
    var roomsCtrl = this;

    roomsCtrl.openedRoomsFactory = openedRoomsFactory;

    roomsCtrl.removeRoom = function (index) {
      roomsCtrl.openedRoomsFactory.rooms.splice(index, 1);
    };

    $scope.$watch("roomsCtrl.openedRoomsFactory.selectedIndex",function(newIndex){
      $state.go("rooms.room",{id: openedRoomsFactory.getRoomByIndex(newIndex)._id});
    });
  }
})();
