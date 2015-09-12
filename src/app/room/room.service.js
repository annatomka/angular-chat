(function () {
  'use strict';

  angular
    .module('angularChat')
    .service('RoomService', RoomService);

  /** @ngInject */
  function RoomService($resource, apiUrl,Room, RoomUser) {
    //var Room =  $resource(apiUrl + '/rooms/:id');
    this.getRooms = getRooms;
    this.getRoom = getRoom;
    this.createRoom = createRoom;
    this.getUsers = getUsers;

    function getRooms() {

      var rooms = Room.query(function (data) {
        console.log(rooms);
        console.log(data)
      });
      return rooms;
    }

    function getRoom(roomId) {
      var room = Room.get({id: roomId});
      return room;
    }

    function createRoom(room){
      //var Room =  $resource(apiUrl + '/rooms/:id');
      var newRoom = new Room({name : room.name});
      return newRoom.$save();
    }

    function getUsers(roomId) {
      return RoomUser.query({id: roomId});
    }
  }

})();
