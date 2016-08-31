(function () {
  'use strict';

  angular
    .module('angularChat')
    .controller('RegistrationController', RegistrationController);

  /** @ngInject */
  function RegistrationController($rootScope, $scope, UserService, User, AccountService, $state) {
    var registrationCtrl = this;
    registrationCtrl.user = new User();

    registrationCtrl.register = function () {
      UserService.create(registrationCtrl.user).then(function (user) {
        $rootScope.toast("Registration successful! You are now logged in :)");
        AccountService.login(user.username, user.password).then(function(){
          $state.go("rooms",{},{reload: true});
        });
      }, function (error) {

      });
    }
  }
})();
