(function () {
  'use strict';

  angular
    .module('angularChat')
    .controller("RoomItemController", RoomItemController);

  /** @ngInject */
  function RoomItemController($scope, $timeout, $mdBottomSheet, toastr, MessageService, RoomService, $log,$rootScope,$state,openedRoomsFactory,apiUrl,socketUrl,AccountService,Message,allUsersFactory) {
    var roomItemCtrl = this;
    var socket = null;
    roomItemCtrl.newMessage = "";

    roomItemCtrl.messages = MessageService.getRoomMessages($state.params.id);
    roomItemCtrl.users = [];
    roomItemCtrl.allusers = allUsersFactory.users;

    roomItemCtrl.createMessage = function(){
      MessageService.createRoomMessage($state.params.id,roomItemCtrl.newMessage);
      roomItemCtrl.newMessage = "";
    };

    RoomService.getRoom($state.params.id).$promise.then(function(room){
      roomItemCtrl.room = room;
      _.forEach(room.users,function(userId){
        roomItemCtrl.users.push(allUsersFactory.users[userId]);
      });
    });
    //
    //if(socket) {
    //  socket.disconnect();
    //}

    socket = io.connect(socketUrl);

    socket.emit("subscribe", { room: $state.params.id, user: AccountService.getLoggedInUser() });
    console.info("subscribe emitted into room "+$state.params.id+" from user " + AccountService.getLoggedInUser().username)
    socket.on("user.joined",function(user){
      console.info("user: "+ user.username +" joined.")

      $timeout(function(){
        var userfound = _.findWhere(roomItemCtrl.users, { '_id': user._id });
        console.info("user data: " + userfound)
        if(typeof userfound == "undefined"){
          roomItemCtrl.users.unshift(user);
        }

        //var message = new Message();
        //message.text = "@"+user.username + " entered the room.";
        //message.type = "info";
        //roomItemCtrl.messages.push(message);
      },100);
      //$scope.$apply(function() {
      //
      //} );
    });

    socket.on("user.left",function(user){
      $scope.$apply(function() {
        _.remove(roomItemCtrl.users, {
          _id: user._id
        });
      });
    });

    socket.on('new message', function(message) {
      $scope.$apply(function(){
        message.type = "message";
        roomItemCtrl.messages.push(message);
      });
    });

    $scope.$on("$destroy",function(){
      console.log("room item controller destroyed")
      socket.emit("unsubscribe", { room: $state.params.id, user: AccountService.getLoggedInUser() });
    });

  }
})();
