(function() {
  'use strict';

  angular
    .module('angularChat')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $http, $templateCache,AccountService,$rootScope,$state,$mdToast) {
    $rootScope.embedOptions = {
      'linkTarget': '_blank',
      'basicVideo': false,
      'code'      : {
        'highlight'  : true,
        'lineNumbers': true
      },
      'gdevAuth': 'AIzaSyC8BFwdPMZ3qcUvBswnggzeqnsUbQpAaok',
      'video'     : {
        'embed'    : false,
        'width'    : 800,
        'ytTheme'  : 'light',
        'details'  : true
      },
      'image'     : {
        'embed': true
      },
      tweetEmbed: false
    };

    //prefetch icons
    var urls = [
      'img/icons/sets/core-icons.svg',
      'img/icons/ic_info_outline_24px.svg',
      'img/icons/ic_close_24px.svg',
      'img/icons/ic_person_24px.svg',
      'img/logo.png'
    ];

    angular.forEach(urls, function(url) {
      $http.get(url, {cache: $templateCache});
    });

    $rootScope.loggedIn = AccountService.isLoggedIn();
    AccountService.initAuthorizationHeader();

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

    $rootScope.toast = function(msg){
      $mdToast.show(
        $mdToast.simple()
          .content(msg)
          .position("top right")
          .hideDelay(3000)
      );
    };

    $log.debug('run block end');
  }

})();
