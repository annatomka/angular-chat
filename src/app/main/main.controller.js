(function () {
  'use strict';

  angular
    .module('angularChat')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, $timeout, $mdBottomSheet, toastr, RoomService, $log,$rootScope,$state,openedRoomsFactory) {
    var mainCtrl = this;

    mainCtrl.openedRooms = openedRoomsFactory.rooms;


    var selected = null;
    var previous = null;

    if(typeof $state.params.id !== "undefined" && $state.params.id !== ""){
      //load room by id
      var room = RoomService.getRoom($state.params.id);
      openedRoomsFactory.addRoom(room);
    }
    mainCtrl.selectedIndex = 0;

    $scope.$watch('mainCtrl.selectedIndex', function (current, old) {
      var room = openedRoomsFactory.getRoomByIndex(current);
      if(typeof room !== "undefined" && $state.params.id !== room._id){
        $state.go("rooms.room",{id: room._id});
      }
    });

    mainCtrl.removeRoom = function (index) {
      mainCtrl.openedRooms.splice(index, 1);
    };

    $rootScope.$on("room.open",function(event,room){
      openedRoomsFactory.addRoom(room);
      $state.go("rooms.room",{id: room._id});
    });
  }
})();
