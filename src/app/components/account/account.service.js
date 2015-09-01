(function() {
  'use strict';

  angular
    .module('angularChat')
    .service('AccountService', AccountService);

  /** @ngInject */
  function AccountService($resource,apiUrl) {
    var Account =  $resource(apiUrl + '/account/me');


    this.me = me;

    function me() {
      Account.get(function(data) {
        console.log(data)
      });
    }
  }

})();
