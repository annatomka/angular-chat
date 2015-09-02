(function () {
  'use strict';

  angular
    .module('angularChat')
    .factory('openedRoomsFactory', openedRoomsFactory);

  /** @ngInject */
  function openedRoomsFactory($http) {
    var roomFactoryObj = {
      rooms: []
    };

    roomFactoryObj.addRoom = function(room){
      var result = _.findWhere(roomFactoryObj.rooms, { '_id': room._id });
      console.info("result : ", result)
      if(typeof result === "undefined"){
        room.index = roomFactoryObj.rooms.length;
        roomFactoryObj.rooms.push(room);
      }
    };

    roomFactoryObj.getRoomByIndex = function(index){
      var room = _.findWhere(roomFactoryObj.rooms, { 'index': index });
      return room;
    };

    return roomFactoryObj;
  }

})();
