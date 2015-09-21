(function () {
  'use strict';

  angular
    .module('angularChat')
    .service('AccountService', AccountService);

  /** @ngInject */
  function AccountService($resource, apiUrl, $localStorage, $rootScope, $http, openedRoomsFactory, socketFactory) {
    var Account = $resource(apiUrl + '/account/me');

    this.setLoggedInUser = setLoggedInUser;
    this.getLoggedInUser = getLoggedInUser;
    this.isLoggedIn = isLoggedIn;
    this.login = login;
    this.logout = logout;
    this.initAuthorizationHeader = initAuthorizationHeader;

    function getLoggedInUser() {
      return $localStorage.user;
    }

    function isLoggedIn() {
      return typeof $localStorage.user !== "undefined";
    }

    function setLoggedInUser(user) {
      $localStorage.user = user;
      $rootScope.loggedIn = true;
    }

    function login(username, password) {
      var header = "Basic " + btoa(username + ":" + password);
      $http.defaults.headers.common.Authorization = header;
      $localStorage.authorization = header;

      return Account.get().$promise.then(function (user) {
        setLoggedInUser(user);
      }, function (error) {
        alert("error " + error)
      });

    }

    function initAuthorizationHeader() {
      if (isLoggedIn() && typeof $localStorage.authorization != "undefined") {
        $http.defaults.headers.common.Authorization = $localStorage.authorization;
      }
    }

    function logout() {

      var openedRooms = openedRoomsFactory.getRooms();
      //logout from rooms
      _.forEach(openedRooms, function (room) {
        socketFactory.emit("unsubscribe", {room: room._id, user: getLoggedInUser()});
      });

      delete $http.defaults.headers.common['Authorization'];
      delete $localStorage.header;
      delete $localStorage.user;
      delete $localStorage.rooms;
      delete $localStorage.index;
      $rootScope.loggedIn = false;
    }
  }

})();
