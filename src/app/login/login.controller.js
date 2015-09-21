(function () {
  'use strict';

  angular
    .module('angularChat')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($scope,AccountService,$state) {
    var loginCtrl = this;
    loginCtrl.user = {};

    loginCtrl.login = function () {
      AccountService.login(loginCtrl.user.username, loginCtrl.user.password).then(function(){
        $state.go("rooms");
      });
    }
  }
})();
