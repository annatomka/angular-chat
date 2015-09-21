(function() {
  'use strict';
  angular
    .module('angularChat')
    .filter('username', username);

  /** @ngInject */
  function username() {
    return function (input) {
      return '@'+input;
    };
  }
})();
