(function() {
  'use strict';

  angular
    .module('angularChat')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $http, $templateCache,AccountService,$rootScope,$state) {
    var urls = [
      'img/icons/sets/core-icons.svg',
      'img/icons/ic_info_outline_24px.svg',
      'img/icons/ic_close_24px.svg',
      'img/icons/ic_person_24px.svg',
      'img/logo.png'
    ];
    // Pre-fetch icons sources by URL and cache in the $templateCache...
    // subsequent $http calls will look there first.
    angular.forEach(urls, function(url) {
      $http.get(url, {cache: $templateCache});
    });

    $rootScope.loggedIn = AccountService.isLoggedIn();

    $rootScope.$on('$stateChangeStart', function(event, next) {
      if (next.data && next.data.authenticated) {
        var authenticated = next.data.authenticated;
        if (AccountService.isLoggedIn() != authenticated) {
          event.preventDefault();
          $state.go("login");
          return;
        }
      }
    });
    $log.debug('runBlock end');
  }

})();
