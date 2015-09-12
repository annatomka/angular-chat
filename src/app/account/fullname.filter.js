(function() {
  'use strict';
  angular
    .module('angularChat')
    .filter('fullname', fullname);

  /** @ngInject */
  function fullname() {
    return function (user) {
      return user.firstName + " " + user.lastName;
    };
  }
})();
