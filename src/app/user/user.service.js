(function() {
  'use strict';

  angular
    .module('angularChat')
    .service('UserService', UserService);

  /** @ngInject */
  function UserService($resource, User) {
    this.update = update;
    this.create = create;
    this.getAll = getAll;

    function update(user){
      var result = User.update({ id:user._id }, user);
      return result;
    }

    function create(user){
      var result = user.$save();
      return result;
    }

    function getAll(){
      var result = User.query();
      return result;
    }
  }

})();
