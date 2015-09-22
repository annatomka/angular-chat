(function () {
  'use strict';

  angular
    .module('angularChat')
    .service('RoomService', RoomService);

  /** @ngInject */
  function RoomService($resource, apiUrl,Room, RoomUser) {
    this.createRoom = createRoom;

    function createRoom(room){
      //var Room =  $resource(apiUrl + '/rooms/:id');
      var newRoom = new Room({name : room.name});
      return newRoom.$save();
    }
  }

})();
