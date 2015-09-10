(function () {
  'use strict';

  angular
    .module('angularChat')
    .factory('User', User);

  /** @ngInject */
  function User(apiUrl,$resource) {
    return $resource(apiUrl + '/users/:id', { id: '@_id' },{
      'update': { method:'PUT' }
    });
  }
})();
