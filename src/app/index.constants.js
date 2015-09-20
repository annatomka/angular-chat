(function() {
  'use strict';

  angular
    .module('angularChat')
    .constant('apiUrl', "https://angular-chat-example-backend.herokuapp.com/api/v1") //https://express-js-chat-demo-complete.herokuapp.com/api/v1
    .constant('socketUrl', "https://angular-chat-example-backend.herokuapp.com")
    .constant('toastr', toastr)
    .constant('moment', moment);

})();
