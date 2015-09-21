(function() {
  'use strict';

  angular
    .module('angularChat')
    .directive('logoutButton', logoutButton);

  /** @ngInject */
  function logoutButton(AccountService,$state) {
    var directive = {
      restrict: 'A',
      controller: LogoutController,
      controllerAs: 'logoutCtrl',
      bindToController: true,
      link: link
    };

    return directive;

    /** @ngInject */
    function LogoutController() {
      var logoutCtrl = this;
    }

    function link(scope, element, attrs) {
      element.on( "click", function() {
        AccountService.logout();
        $state.go("login", {}, {reload: true});
      });
    }
  }


})();
