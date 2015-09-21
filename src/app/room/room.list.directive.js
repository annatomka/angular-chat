(function() {
  'use strict';

  angular
    .module('angularChat')
    .directive('roomListOpener', RoomListOpener);

  /** @ngInject */
  function RoomListOpener($mdBottomSheet) {
    var directive = {
      restrict: 'A',
      link: link
    };
    return directive;

    /** @ngInject */
    function RoomListController(RoomService,$rootScope,openedRoomsFactory,$state) {
      var roomListCtrl = this;
      roomListCtrl.rooms = RoomService.getRooms();
      roomListCtrl.openRoom = function(index,room){
        openedRoomsFactory.addRoom(room);
        $state.go("rooms.room",{id: room._id});
      }
    }

    function link(scope, element, attrs) {
      element.on( "click", function($event) {
        $mdBottomSheet.show({
          templateUrl: 'app/room/room.list.tmpl.html',
          controller: RoomListController,
          controllerAs: 'roomListCtrl',
          bindToController: true,
          targetEvent: $event
        });
      });
    }
  }

})();
