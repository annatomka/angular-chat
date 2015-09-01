/* global malarkey:false, toastr:false, moment:false */
(function() {
  'use strict';

  angular
    .module('angularChat')
    .constant('apiUrl', "http://localhost:8080/api/v1")
    .constant('malarkey', malarkey)
    .constant('toastr', toastr)
    .constant('moment', moment);

})();
