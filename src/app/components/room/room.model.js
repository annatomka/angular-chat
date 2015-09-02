(function () {
  'use strict';

  angular
    .module('angularChat')
    .factory('Room', Room);

  /** @ngInject */
  function Room(apiUrl,$resource) {
    return $resource(apiUrl + '/rooms/:id');

  }

})();
