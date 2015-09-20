(function () {
  'use strict';

  angular
    .module('angularChat')
    .factory('allUsersFactory', allUsersFactory);

  /** @ngInject */
  function allUsersFactory(UserService) {
    var usersFactoryObj = {
      users: []
    };

    UserService.getAll().$promise.then(function(allUsers){
      _.forEach(allUsers,function(user){
        usersFactoryObj.users[user._id] = user;
      });
    });

    return usersFactoryObj;
  }

})();
