(function () {
  'use strict';

  angular
    .module('angularChat')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, $timeout, $mdBottomSheet, toastr, RoomService, $log,$rootScope) {
    var mainCtrl = this;
    mainCtrl.openedRooms = [];

    var selected = null;
    var previous = null;

    mainCtrl.selectedIndex = 0;

    $scope.$watch('selectedIndex', function (current, old) {
      if (typeof mainCtrl.rooms !== "undefined") {
        previous = selected;
        selected = mainCtrl.rooms[current];
        if (old + 1 && (old != current)) $log.debug('Goodbye ' + previous.name + '!');
        if (current + 1)                $log.debug('Hello ' + selected.name + '!');
      }
    });

    mainCtrl.addTab = function (room) {
      mainCtrl.openedRooms.push(room);
    };

    mainCtrl.removeRoom = function (index) {
      mainCtrl.openedRooms.splice(index, 1);
    };

    $rootScope.$on("room.open",function(event,room){
      mainCtrl.addTab(room);
    });
  }
})();
