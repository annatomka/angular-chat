(function () {
  'use strict';

  angular
    .module('angularChat')
    .factory('openedRoomsFactory', openedRoomsFactory);

  /** @ngInject */
  function openedRoomsFactory(RoomService,$localStorage) {
    var self = this;

    var roomFactoryObj = {};

    roomFactoryObj.setSelectedIndex = function(newIndex){
      $localStorage.index  = newIndex;
    };

    roomFactoryObj.getSelectedIndex = function(){
      return $localStorage.index;
    };

    roomFactoryObj.getRoomByIndex = function(index){
      var room = _.findWhere($localStorage.rooms, { 'index': index });
      return room;
    };

    roomFactoryObj.getRooms = function(){
      return $localStorage.rooms;
    };

    roomFactoryObj.addRoom = function(room){
      if(typeof $localStorage.rooms == "undefined") {
        $localStorage.rooms = [];
      }

      room.index = $localStorage.rooms.length;
      $localStorage.index = room.index;
      $localStorage.rooms.push(room);
    };

    roomFactoryObj.removeRoom = function(index){
      $localStorage.rooms.splice(index, 1);
    };

    roomFactoryObj.hasRoom = function(){
      return $localStorage.rooms && $localStorage.rooms.length>0;
    };

    roomFactoryObj.containsRoom = function(room){
      var result = _.findWhere($localStorage.rooms, { '_id': room._id });
      return typeof result != "undefined";
    };

    function syncRoomsFromLocalStorage(){
      _.forEach($localStorage.rooms,function(storedRoom){
        $localStorage.rooms[storedRoom._id] = RoomService.getRoom(storedRoom._id)
      });
    }

    syncRoomsFromLocalStorage();

    return roomFactoryObj;
  }

})();
