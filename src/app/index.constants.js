/* global malarkey:false, toastr:false, moment:false */
(function() {
  'use strict';

  angular
    .module('angularChat')
    .constant('apiUrl', "/api/v1")
    .constant('socketUrl', window.location.hostname + ":8080")
    .constant('malarkey', malarkey)
    .constant('toastr', toastr)
    .constant('moment', moment);

})();
