(function () {
  'use strict';

  angular
    .module('angularChat')
    .factory('RoomUser', RoomUser);

  /** @ngInject */
  function RoomUser(apiUrl,$resource) {
    return $resource(apiUrl + '/rooms/:id/users/:userId', { id: '@_id' });
  }
})();
