(function() {
  'use strict';

  angular
    .module('angularChat')
    .service('RoomService',RoomService);

  /** @ngInject */
  function RoomService($resource,apiUrl) {
    var Room =  $resource(apiUrl + '/rooms/:id');

    this.getRooms = getRooms;

    function getRooms() {

      var rooms = Room.query(function(data) {
        console.log(rooms);
        console.log(data)
      });
      return rooms;
    }
  }

})();
