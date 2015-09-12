(function() {
  'use strict';

  angular
    .module('angularChat')
    .constant('apiUrl', "/api/v1") //https://express-js-chat-demo-complete.herokuapp.com/api/v1
    .constant('socketUrl', window.location.hostname + ":8080")
    .constant('toastr', toastr)
    .constant('moment', moment);

})();
