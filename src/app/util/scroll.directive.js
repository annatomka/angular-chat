(function() {
  'use strict';

  angular
    .module('angularChat')
    .directive('scroll', scroll);

  /** @ngInject */
  function scroll($timeout) {
    var directive = {
      restrict: 'A',
      link: link
    };

    return directive;

    function link(scope, element, attrs) {
      scope.$watchCollection(attrs.scroll, function(newVal) {
        $timeout(function() {
          element[0].parentElement.scrollTop = element[0].scrollHeight;
        });
      });
    }
  }

})();
