(function() {
  'use strict';

  angular
    .module('angularChat')
    .constant('apiUrl', "http://localhost:8080/api/v1")//https://angular-chat-example-backend.herokuapp.com/api/v1")
    .constant('socketUrl', "http://localhost:8080")
    .constant('toastr', toastr)
    .constant('moment', moment);

})();
