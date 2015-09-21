(function () {
  'use strict';

  angular
    .module('angularChat')
    .controller("RoomItemController", RoomItemController);

  /** @ngInject */
  function RoomItemController($scope, $timeout, $mdBottomSheet, toastr, MessageService, RoomService, $log, $rootScope, $state, openedRoomsFactory, apiUrl, socketFactory, AccountService, Message, allUsersFactory) {
    var roomItemCtrl = this;
    roomItemCtrl.newMessage = "";

    roomItemCtrl.messages = MessageService.getRoomMessages($state.params.id);
    roomItemCtrl.users = [];
    roomItemCtrl.allusers = allUsersFactory.users;

    roomItemCtrl.createMessage = function () {
      MessageService.createRoomMessage($state.params.id, roomItemCtrl.newMessage);
      roomItemCtrl.newMessage = "";
    };

    RoomService.getRoom($state.params.id).$promise.then(function (room) {
      _.forEach(room.users, function (userId) {
        if (!isUserAlreadyAdded(userId)) {
          roomItemCtrl.users.push(allUsersFactory.users[userId]);
        }
      });

      roomItemCtrl.room = room;
    });

    socketFactory.emit("subscribe", {room: $state.params.id, user: AccountService.getLoggedInUser()});

    socketFactory.on("user.joined",function (user) {
        if (!isUserAlreadyAdded(user._id)) {
          roomItemCtrl.users.push(user);
        }
    });

    socketFactory.on("user.left",function (user) {
        _.remove(roomItemCtrl.users, {
          _id: user._id
        });
    });

    socketFactory.on("new message",function (message) {
      roomItemCtrl.messages.push(message);
    });

    $scope.$on("$destroy", function () {
      socketFactory.emit("unsubscribe", {room: $state.params.id, user: AccountService.getLoggedInUser()});
    });

    function isUserAlreadyAdded(userId){
      var userfound = _.findWhere(roomItemCtrl.users, {'_id': userId});
      return typeof userfound != "undefined";
    }
  }
})();
