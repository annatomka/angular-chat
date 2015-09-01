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
          clickOutsideToClose: true
        })
          .then(function (answer) {
            vm.status = 'You said the information was "' + answer + '".';
          }, function () {
            vm.status = 'You cancelled the dialog.';
          });
      };

      function DialogController2($scope, $mdDialog) {
        $scope.hide = function() {
          $mdDialog.hide();
        };
        $scope.cancel = function() {
          $mdDialog.cancel();
        };
        $scope.answer = function(answer) {
          $mdDialog.hide(answer);
        };
      }
    }
  }


})();
