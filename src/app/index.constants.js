/* global malarkey:false, toastr:false, moment:false */
(function() {
  'use strict';

  angular
    .module('angularChat')
    .constant('malarkey', malarkey)
    .constant('toastr', toastr)
    .constant('moment', moment);

})();
