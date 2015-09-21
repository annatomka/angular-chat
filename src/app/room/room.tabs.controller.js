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
    };

    $scope.$watch("roomsCtrl.selectedIndex",function(newIndex){
      openedRoomsFactory.setSelectedIndex(newIndex);
      if(openedRoomsFactory.hasRoom()){
        $state.go("rooms.room",{id: openedRoomsFactory.getRoomByIndex(newIndex)._id});
      }
    });

    $rootScope.$on("room.added",syncFromOpenedRoomsFactory);

    function syncFromOpenedRoomsFactory(){
      roomsCtrl.selectedIndex = openedRoomsFactory.getSelectedIndex();
      roomsCtrl.rooms = openedRoomsFactory.getRooms();
    }
  }
})();
