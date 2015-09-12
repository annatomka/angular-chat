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

      menuCtrl.toggleLeft = buildToggler('left');

      menuCtrl.user = AccountService.getLoggedInUser();
      /**
       * Build handler to open/close a SideNav; when animation finishes
       * report completion in console
       */
      function buildToggler(navID) {
        var debounceFn =  $mdUtil.debounce(function(){
          $mdSidenav(navID)
            .toggle()
            .then(function () {
              $log.debug("toggle " + navID + " is done");
            });
        },200);
        return debounceFn;
      }
    }
  }

})();
