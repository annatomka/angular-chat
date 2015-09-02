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
    function RoomListController(RoomService,$rootScope) {
      var roomListCtrl = this;
      roomListCtrl.rooms = RoomService.getRooms();
      roomListCtrl.openRoom = function(index,room){
        $rootScope.$broadcast("room.open",room);
      }
    }

    function link(scope, element, attrs) {
      element.on( "click", function($event) {
        $mdBottomSheet.show({
          templateUrl: 'app/components/room/room.list.tmpl.html',
          controller: RoomListController,
          controllerAs: 'roomListCtrl',
          bindToController: true,
          targetEvent: $event
        });
      });
    }
  }

})();
