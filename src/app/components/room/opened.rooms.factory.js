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
    var roomFactoryObj = {
      rooms: $localStorage.rooms,
      selectedIndex: 0
    };

    roomFactoryObj.addRoom = function(room){
      var result = _.findWhere(roomFactoryObj.rooms, { '_id': room._id });
      console.info("find room in opened rooms result : ", result)
      if(typeof result === "undefined"){
        room.index = roomFactoryObj.rooms.length;
        roomFactoryObj.rooms.push(room);
        console.info("room pushed into opened rooms")
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
