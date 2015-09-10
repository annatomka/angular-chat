(function() {
  'use strict';

  angular
    .module('angularChat')
    .directive('registrationButton', registrationButton);

  /** @ngInject */
  function registrationButton() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/registration/registration.html',
      controller: RegistrationController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function RegistrationController($mdDialog) {
      var vm = this;

      vm.showRegistrationDialog = function (ev) {
        $mdDialog.show({
          controller: DialogController2,
          templateUrl: 'app/components/registration/registration.dialog.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          controllerAs: "registrationDialogCtrl",
          clickOutsideToClose: true
        });
      };

      function DialogController2($mdDialog) {
        var registrationDialogCtrl = this;

        registrationDialogCtrl.hide = function() {
          $mdDialog.hide();
        };
        registrationDialogCtrl.cancel = function() {
          $mdDialog.cancel();
        };

      }
    }
  }


})();
