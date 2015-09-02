(function() {
  'use strict';

  angular
    .module('angularChat')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $http, $templateCache) {
    var urls = [
      'img/icons/sets/core-icons.svg',
      'img/icons/ic_info_outline_24px.svg',
      'img/icons/ic_close_24px.svg',
      'img/icons/img/icons/ic_tab_48px.svg',
      'img/icons/ic_person_24px.svg'
    ];
    // Pre-fetch icons sources by URL and cache in the $templateCache...
    // subsequent $http calls will look there first.
    angular.forEach(urls, function(url) {
      $http.get(url, {cache: $templateCache});
    });

    $log.debug('runBlock end');
  }

})();
