(function () {
  'use strict';

  angular
    .module('angularChat')
    .factory('openedRoomsFactory', openedRoomsFactory);

  /** @ngInject */
  function openedRoomsFactory(RoomService,$localStorage) {
    if(typeof $localStorage.rooms == "undefined"){
      $localStorage.rooms = [];
    }else{
      //update stored rooms
      updateRooms();
    }

    if(typeof $localStorage.index == "undefined"){
      $localStorage.index = { value: 0};
    }

    var roomFactoryObj = {
      rooms: $localStorage.rooms,
      selectedIndex: $localStorage.index.value
    };

    roomFactoryObj.addRoom = function(room){
      var result = _.findWhere(roomFactoryObj.rooms, { '_id': room._id });
      if(typeof result === "undefined"){
        room.index = roomFactoryObj.rooms.length;
        roomFactoryObj.rooms.push(room);
      }
    };

    roomFactoryObj.getRoomByIndex = function(index){
      var room = _.findWhere(roomFactoryObj.rooms, { 'index': index });
      return room;
    };
    function updateRooms(){
      _.forEach($localStorage.rooms,function(storedRoom){
        $localStorage.rooms[storedRoom._id] = RoomService.getRoom(storedRoom._id)
      });
    }
    return roomFactoryObj;
  }

})();
