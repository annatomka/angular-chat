(function() {
  'use strict';

  angular
    .module('angularChat')
    .directive('fab', fab);

  /** @ngInject */
  function fab() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/room/create.room.fab.tmpl.html',
      controller: FabController,
      controllerAs: 'fabCtrl',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function FabController($mdDialog){
      var fabCtrl = this;

      fabCtrl.createRoomDialog = function (ev) {
        $mdDialog.show({
          controller: DialogController2,
          templateUrl: 'app/room/create.room.dialog.tmpl.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: true,
          controllerAs: 'createRoomCtrl',
          bindToController: true
        });
      };

      function DialogController2($rootScope,$mdDialog,RoomService,$mdToast,$state) {
        var createRoomCtrl = this;
        createRoomCtrl.newRoom = {};

        createRoomCtrl.hide = function() {
          $mdDialog.hide();
        };
        createRoomCtrl.cancel = function() {
          $mdDialog.cancel();
        };

        createRoomCtrl.create = function(){
          RoomService.createRoom(createRoomCtrl.newRoom).then(function(result){
            $rootScope.toast("Room "+result._id+" created successfully!");

            $mdDialog.hide();
          },function(result){
            console.error(result);
            $rootScope.toast("We couldn't create your room, sorry :(")
          });

        }
      }
    }
  }

})();
