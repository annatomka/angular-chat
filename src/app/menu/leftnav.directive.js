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
    function LeftnavController($mdSidenav, $log) {
      var leftnavCtrl = this;

      leftnavCtrl.close = function () {
        $mdSidenav('left').close();
      };
    }
  }

})();
