(function () {
  'use strict';

  angular
    .module('angularChat')
    .directive('basicInfo', basicInfo);

  /** @ngInject */
  function basicInfo() {
    var directive = {
      restrict: 'E',
      scope: {
        user: "="
      },
      templateUrl: 'app/account/basic.info.tmpl.html'
    };
    return directive;
  }
})();
