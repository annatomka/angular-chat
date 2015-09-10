(function () {
  'use strict';

  angular
    .module('angularChat')
    .controller('RegistrationController', RegistrationController);

  /** @ngInject */
  function RegistrationController($rootScope, $scope,UserService,User,AccountService) {
    var registrationCtrl = this;
    registrationCtrl.user = new User();
    registrationCtrl.register = function () {
      UserService.create(registrationCtrl.user).then(function(user){
        //successful registration, login user
        $rootScope.toast("Registration successful! You are now logged in :)")
        AccountService.login(user.username, user.password);
      },function(error){

      });
    }
  }
})();
