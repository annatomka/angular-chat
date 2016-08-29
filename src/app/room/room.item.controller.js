(function () {
  'use strict';

  angular
    .module('angularChat')
    .controller("RoomItemController", RoomItemController);

  /** @ngInject */
  function RoomItemController($scope, users, room, messages, MessageService, RoomService, $log, $rootScope, $state, openedRoomsFactory, apiUrl, socketFactory, AccountService, Message, allUsersFactory) {
    var roomItemCtrl = this;

    debugger;
    roomItemCtrl.newMessage = "";
    var roomId = $state.params.id;
    roomItemCtrl.messages = messages;
    roomItemCtrl.users = [];
    roomItemCtrl.allusers = allUsersFactory.users;

    roomItemCtrl.createMessage = function () {
      MessageService.createRoomMessage(roomId, roomItemCtrl.newMessage);
      roomItemCtrl.newMessage = "";
    };


    _.forEach(room.users, function (userId) {
      if (!isUserAlreadyAdded(userId)) {
        roomItemCtrl.users.push(allUsersFactory.users[userId]);
      }
    });

    roomItemCtrl.room = room;


    socketFactory.emit("subscribe", {room: roomId, user: AccountService.getLoggedInUser()});

    socketFactory.on("user.joined", function (user) {
      if (!isUserAlreadyAdded(user._id)) {
        roomItemCtrl.users.push(user);
      }
    });

    socketFactory.on("user.left", function (user) {
      _.remove(roomItemCtrl.users, {
        _id: user._id
      });
    });

    socketFactory.on("new message", function (message) {
      roomItemCtrl.messages.push(message);
    });

    $scope.$on("$destroy", function () {
      socketFactory.emit("unsubscribe", {room: roomId, user: AccountService.getLoggedInUser()});
    });

    function isUserAlreadyAdded(userId) {
      var userfound = _.findWhere(roomItemCtrl.users, {'_id': userId});
      return typeof userfound != "undefined";
    }
  }
})();
