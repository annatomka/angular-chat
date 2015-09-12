(function() {
  'use strict';

  angular
    .module('angularChat')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastr, $mdIconProvider,$mdThemingProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastr.options.timeOut = 3000;
    toastr.options.positionClass = 'toast-top-right';
    toastr.options.preventDuplicates = true;
    toastr.options.progressBar = true;

    // Register icon IDs with sources. Future $mdIcon( <id> ) lookups
    // will load by url and retrieve the data via the $http and $templateCache
    $mdIconProvider
      .defaultIconSet("img/avatars.svg", 128)
      .iconSet('core', 'img/icons/sets/core-icons.svg',24)
      .icon('action:info', 'img/icons/ic_info_outline_24px.svg',24)
      .icon('navigation:close', 'img/icons/ic_close_24px.svg',24)
      .icon('social:person', 'img/icons/ic_person_24px.svg',24);

    $mdThemingProvider.theme('default')
      .primaryPalette('indigo')
      .accentPalette('blue');
  }

})();
