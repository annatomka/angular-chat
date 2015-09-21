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
    function RoomListController(RoomService,$rootScope,$state) {
      var roomListCtrl = this;
      roomListCtrl.rooms = RoomService.getRooms();
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
