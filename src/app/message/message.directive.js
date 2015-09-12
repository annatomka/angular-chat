(function() {
  'use strict';

  angular
    .module('angularChat')
    .directive('message', message);

  /** @ngInject */
  function message() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/message/message.item.tmpl.html',
      controller: MessageController,
      controllerAs: 'messageCtrl',
      bindToController: true,
      scope:{
        message: "=",
        author: "="
      }
    };

    return directive;

    /** @ngInject */
    function MessageController($mdDialog){
      var messageCtrl = this;
    }
  }

})();
