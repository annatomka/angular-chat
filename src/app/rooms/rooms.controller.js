(function () {
  'use strict';

  angular
    .module('angularChat')
    .controller('RoomsController', RoomsController);

  /** @ngInject */
  function RoomsController($scope, $timeout, $mdBottomSheet, toastr, RoomService, $log,$rootScope,$state,openedRoomsFactory) {
    var roomsCtrl = this;
    roomsCtrl.openedRooms = openedRoomsFactory.rooms;


    var selected = null;
    var previous = null;

    if(typeof $state.params.id !== "undefined" && $state.params.id !== ""){
      //load room by id
      var room = RoomService.getRoom($state.params.id);
      openedRoomsFactory.addRoom(room);
    }
    roomsCtrl.selectedIndex = 0;

    $scope.$watch('roomsCtrl.selectedIndex', function (current, old) {
      var room = openedRoomsFactory.getRoomByIndex(current);
      if(typeof room !== "undefined" && $state.params.id !== room._id){
        $state.go("rooms.item",{id: room._id});
      }
    });

    roomsCtrl.removeRoom = function (index) {
      roomsCtrl.openedRooms.splice(index, 1);
    };

    $rootScope.$on("room.open",function(event,room){
      openedRoomsFactory.addRoom(room);
      $state.go("rooms.item",{id: room._id});
    });
  }
})();
