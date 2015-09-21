(function() {
  'use strict';

  angular
    .module('angularChat')
    .directive('leftNav', leftNav);

  /** @ngInject */
  function leftNav() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/menu/leftnav.html',
      controller: LeftnavController,
      controllerAs: 'leftnavCtrl',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function LeftnavController($mdSidenav, $log,AccountService) {
      var leftnavCtrl = this;
      leftnavCtrl.user = AccountService.getLoggedInUser();

      leftnavCtrl.close = function () {
        $mdSidenav('left').close();
      };
    }
  }

})();
