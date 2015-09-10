(function() {
  'use strict';

  angular
    .module('angularChat')
    .service('AccountService', AccountService);

  /** @ngInject */
  function AccountService($resource,apiUrl,$localStorage,authFactory,$window,$rootScope) {
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
    }

    function login(username,password){
      authFactory.login(username, password);
      Account.get().$promise.then(function(user){
        setLoggedInUser(user);
        $rootScope.$broadcast("login.success");
      },function(error){
        alert("error "+error)
      });

    }

    function logout(){
      delete $localStorage.user;
      authFactory.logout();
      $window.location.reload();
    }

  }

})();
