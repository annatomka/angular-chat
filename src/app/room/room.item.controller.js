(function () {
  'use strict';

  angular
    .module('angularChat')
    .controller("RoomItemController", RoomItemController);

  /** @ngInject */
  function RoomItemController($scope, $timeout, $mdBottomSheet, toastr, MessageService, RoomService, $log, $rootScope, $state, openedRoomsFactory, apiUrl, socketUrl, AccountService, Message, allUsersFactory) {
    var roomItemCtrl = this;
    var socket = null;

    roomItemCtrl.newMessage = "";

    roomItemCtrl.messages = MessageService.getRoomMessages($state.params.id);
    roomItemCtrl.users = [];
    roomItemCtrl.allusers = allUsersFactory.users;

    roomItemCtrl.createMessage = function () {
      MessageService.createRoomMessage($state.params.id, roomItemCtrl.newMessage);
      roomItemCtrl.newMessage = "";
    };

    RoomService.getRoom($state.params.id).$promise.then(function (room) {
      roomItemCtrl.room = room;
      _.forEach(room.users, function (userId) {
        roomItemCtrl.users.push(allUsersFactory.users[userId]);
      });
    });

    socket = io.connect(socketUrl);

    socket.emit("subscribe", {room: $state.params.id, user: AccountService.getLoggedInUser()});
    socket.on("user.joined", function (user) {

      $timeout(function () {
        var userfound = _.findWhere(roomItemCtrl.users, {'_id': user._id});
        if (typeof userfound == "undefined") {
          roomItemCtrl.users.unshift(user);
        }
      }, 100);
    });

    socket.on("user.left", function (user) {
      $scope.$apply(function () {
        _.remove(roomItemCtrl.users, {
          _id: user._id
        });
      });
    });

    socket.on('new message', function (message) {
      $scope.$apply(function () {
        message.type = "message";
        roomItemCtrl.messages.push(message);
      });
    });

    $scope.$on("$destroy", function () {
      socket.emit("unsubscribe", {room: $state.params.id, user: AccountService.getLoggedInUser()});
    });
  }
})();
