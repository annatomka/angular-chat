(function() {
  'use strict';

  angular
    .module('angularChat')
    .directive('fab', fab);

  /** @ngInject */
  function fab() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/menu/fab.html',
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
          templateUrl: 'app/components/room/room.create.dialog.tmpl.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: true,
          controllerAs: 'createRoomCtrl',
          bindToController: true
        });
      };

      function DialogController2($mdDialog,RoomService,$mdToast,$state) {
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
            console.info(result)
            toast("Room "+result._id+" created successfully!")
            $state.go("rooms.item",{id: result._id},true)
            $mdDialog.hide();
          },function(result){
            console.error(result)
            toast("We couldn't create your room, sorry :(")
          });

          function toast(msg){
            $mdToast.show(
              $mdToast.simple()
                .content(msg)
                .position("top right")
                .hideDelay(3000)
            );
          }

        }
      }
    }
  }

})();
