(function () {
  'use strict';

  angular
    .module('angularChat')
    .directive('loginButton', loginButton);

  /** @ngInject */
  function loginButton() {
    var directive = {
      restrict: 'A',
      controller: LoginController,
      controllerAs: 'loginCtrl',
      bindToController: true,
      link: link
    };

    return directive;

    function link(scope, element, attrs) {
      element.on("click", function () {
        scope.loginCtrl.showLoginDialog();
      });
    }

    /** @ngInject */
    function LoginController($mdDialog) {
      var loginCtrl = this;

      loginCtrl.showLoginDialog = function (ev) {
        $mdDialog.show({
          controller: DialogController,
          templateUrl: 'app/components/account/login.dialog.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          controllerAs: "loginDialogCtrl",
          clickOutsideToClose: true
        })
          .then(function (answer) {
            vm.status = 'You said the information was "' + answer + '".';
          }, function () {
            vm.status = 'You cancelled the dialog.';
          });
      };

      function DialogController($mdDialog, authFactory, RoomService) {
        var loginDialogCtrl = this;
        loginDialogCtrl.user = {};

        loginDialogCtrl.hide = function () {
          $mdDialog.hide();
        };
        loginDialogCtrl.cancel = function () {
          $mdDialog.cancel();
        };

        loginDialogCtrl.login = function () {
          authFactory.login(loginDialogCtrl.user.username, loginDialogCtrl.user.password)
        };
      }
    }
  }


})();
