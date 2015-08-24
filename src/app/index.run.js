(function() {
  'use strict';

  angular
    .module('angularChat')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
