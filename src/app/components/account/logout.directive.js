(function() {
  'use strict';

  angular
    .module('angularChat')
    .directive('logoutButton', logoutButton);

  /** @ngInject */
  function logoutButton() {
    var directive = {
      restrict: 'A',
      controller: LogoutController,
      controllerAs: 'logoutCtrl',
      bindToController: true,
      link: link
    };

    return directive;

    /** @ngInject */
    function LogoutController(authFactory) {
      var logoutCtrl = this;

    }

    function link(scope, element, attrs) {
      element.on( "click", function() {
        authFactory.logout();
      });
    }
  }


})();
