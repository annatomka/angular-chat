(function () {
  'use strict';

  angular
    .module('angularChat')
    .directive('profileButton', profileButton);

  /** @ngInject */
  function profileButton($mdDialog, AccountService,$state) {
    var directive = {
      restrict: 'A',
      controller: ProfileController,
      controllerAs: 'profileCtrl',
      bindToController: true,
      link: link
    };

    return directive;

    function link(scope, element, attrs) {
      element.on("click", function () {
        scope.profileCtrl.showLoginDialog();
      });
    }

    /** @ngInject */
    function ProfileController() {
      var profileCtrl = this;

      profileCtrl.showLoginDialog = function (ev) {
        $mdDialog.show({
          controller: DialogController,
          templateUrl: 'app/account/profile.dialog.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          controllerAs: "profileDialogCtrl",
          clickOutsideToClose: true
        });
      };

      function DialogController($mdDialog, AccountService,UserService, User, $window) {
        var profileDialogCtrl = this;

        profileDialogCtrl.hide = function () {
          $mdDialog.hide();
        };
        profileDialogCtrl.cancel = function () {
          $mdDialog.cancel();
        };
      }
    }
  }


})();
