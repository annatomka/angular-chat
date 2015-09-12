(function () {
  'use strict';

  angular
    .module('angularChat')
    .factory('Message', Message);

  /** @ngInject */
  function Message(apiUrl,$resource) {
    return $resource(apiUrl + '/rooms/:id/messages/:messageId', { id: '@_id' });
  }
})();
