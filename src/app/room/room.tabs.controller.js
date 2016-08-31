(function () {
  'use strict';

  angular
    .module('angularChat')
    .controller('RoomsController', RoomsController);

  /** @ngInject */
  function RoomsController($scope, $timeout, $mdBottomSheet, toastr, RoomService, $log,$rootScope,$state,openedRoomsFactory) {
    var roomsCtrl = this;

    syncFromOpenedRoomsFactory();

    roomsCtrl.removeRoom = function (index) {
      openedRoomsFactory.removeRoom(index);
      goToRoom(openedRoomsFactory.getRooms().length-1);
    };

    $scope.$watch("roomsCtrl.selectedIndex",function(newIndex){
      openedRoomsFactory.setSelectedIndex(newIndex);
      goToRoom(newIndex);
    });

    $rootScope.$on("room.added", onRoomAdded);

    function onRoomAdded() {
      syncFromOpenedRoomsFactory();
      goToRoom(roomsCtrl.selectedIndex);
    }

    function syncFromOpenedRoomsFactory(){
      roomsCtrl.selectedIndex = openedRoomsFactory.getSelectedIndex();
      roomsCtrl.rooms = openedRoomsFactory.getRooms();
    }

    function goToRoom(newIndex) {
      if(openedRoomsFactory.hasRoom()){
        $state.go("rooms.room",{id: openedRoomsFactory.getRoomByIndex(newIndex)._id});
      }else{
        $state.go("rooms");
      }
    }
  }
})();
