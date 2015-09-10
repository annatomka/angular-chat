(function() {
  'use strict';

  angular
    .module('angularChat')
    .service('UserService', UserService);

  /** @ngInject */
  function UserService($resource,apiUrl,$localStorage,authFactory,$window,$rootScope, User) {
    //var User =  $resource(apiUrl + '/users/:id');

    this.update = update;
    this.getAll = getAll;

    function update(user){
      var result = User.update({ id:user._id }, user);
      return result;
    }

    function getAll(){
      var result = User.query();
      return result;
    }
  }

})();
