(function() {
  'use strict';

  angular
    .module('angularChat')
    .directive('mainMenu', menu);

  /** @ngInject */
  function menu() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/menu/menu.html',
      controller: MenuController,
      controllerAs: 'menuCtrl',
      bindToController: true,
      replace: true
    };

    return directive;

    /** @ngInject */
    function MenuController($timeout, $mdSidenav, $mdUtil, $log,AccountService) {
      var menuCtrl = this;
      menuCtrl.user = AccountService.getLoggedInUser();

      menuCtrl.toggleLeft = buildToggler('left');

      function buildToggler(navID) {
        var debounceFn =  $mdUtil.debounce(function(){
          $mdSidenav(navID)
            .toggle();
        },200);
        return debounceFn;
      }
    }
  }

})();
