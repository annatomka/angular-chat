(function() {
  'use strict';

  angular
    .module('angularChat')
    .directive('leftNav', leftNav);

  /** @ngInject */
  function leftNav() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/menu/leftnav.html',
      controller: LeftnavController,
      controllerAs: 'leftnavCtrl',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function LeftnavController($mdSidenav, $log,AccountService) {
      var leftnavCtrl = this;
      leftnavCtrl.close = function () {
        $mdSidenav('left').close()
          .then(function () {
            $log.debug("close LEFT is done");
          });
      };

      $mdSidenav("left")
        .then(function(data){
          $log.debug('toggled');
        });

    }
  }

})();
