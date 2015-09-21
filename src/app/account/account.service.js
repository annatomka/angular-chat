(function() {
  'use strict';

  angular
    .module('angularChat')
    .service('AccountService', AccountService);

  /** @ngInject */
  function AccountService($resource,apiUrl,$localStorage,authFactory,$rootScope) {
    var Account =  $resource(apiUrl + '/account/me');

    this.setLoggedInUser = setLoggedInUser;
    this.getLoggedInUser = getLoggedInUser;
    this.isLoggedIn = isLoggedIn;
    this.login = login;
    this.logout = logout;

    function getLoggedInUser(){
        return $localStorage.user;
    }

    function isLoggedIn(){
      return typeof $localStorage.user !== "undefined";
    }

    function setLoggedInUser(user){
      $localStorage.user = user;
      $rootScope.loggedIn = true;
    }

    function login(username,password){
      authFactory.login(username, password);
      return Account.get().$promise.then(function(user){
        setLoggedInUser(user);
      },function(error){
        alert("error "+error)
      });

    }

    function logout(){
      delete $localStorage.user;
      delete $localStorage.rooms;
      $rootScope.loggedIn = false;
      authFactory.logout();

    }
  }

})();
