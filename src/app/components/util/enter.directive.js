(function() {
  'use strict';

  angular
    .module('angularChat')
    .directive('ngEnter', ngEnter);

  /** @ngInject */
  function ngEnter() {
    var directive = {
      restrict: 'A',
      link: link
    };

    return directive;

    function link(scope, element, attrs) {
      element.bind("keydown keypress", function (event) {
        if(event.which === 13) {
          scope.$apply(function (){
            scope.$eval(attrs.ngEnter);
          });

          event.preventDefault();
        }
      });
    }
  }

})();
