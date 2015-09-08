(function () {
  'use strict';

  angular
    .module('angularChat')
    .controller("RoomItemController", RoomItemController);

  /** @ngInject */
  function RoomItemController($scope, $timeout, $mdBottomSheet, toastr, MessageService, RoomService, $log,$rootScope,$state,openedRoomsFactory,apiUrl,socketUrl,AccountService) {
    var roomItemCtrl = this;
    var socket = null;
    roomItemCtrl.newMessage = "";
    roomItemCtrl.messages = MessageService.getRoomMessages($state.params.id);
    roomItemCtrl.users = [];

    roomItemCtrl.createMessage = function(){
      MessageService.createRoomMessage($state.params.id,roomItemCtrl.newMessage);
      roomItemCtrl.newMessage = "";
    };


    if(socket) {
      socket.disconnect();
    }

    socket = io.connect(socketUrl);
    socket.emit("subscribe", { room: $state.params.id, user: AccountService.getLoggedInUser() });
    roomItemCtrl.users.push(AccountService.getLoggedInUser());
    socket.on("user.joined",function(user){
      console.log("user.joined")
      $scope.$apply(function() {
        roomItemCtrl.users.unshift(user);
        roomItemCtrl.messages.unshift({text: user.username + "user entered the room.", type: "info"});
      } );
    });

    socket.on("user.left",function(user){
      console.log("user.left")
      $scope.$apply(function() {
      } );
    });

    socket.on('new message', function(message) {

      $scope.$apply(function(){
        message.type = "message";
        roomItemCtrl.messages.unshift(message);
      });

      console.log("new message arrived")
    });

    if(typeof $state.params.id !== "undefined"){
      roomItemCtrl.users = RoomService.getUsers($state.params.id);
    }

    $scope.$on("$destroy",function(){
      socket.emit("unsubscribe", { room: $state.params.id, user: AccountService.getLoggedInUser() });
    });

  }
})();
