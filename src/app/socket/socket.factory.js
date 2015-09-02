(function () {
  'use strict';

  angular
    .module('angularChat')
    .factory('socket', socket);

  /** @ngInject */
  function socket($rootScope,apiUrl) {
    var socket = io.connect(apiUrl);
    return {
      on: function (eventName, callback) {
        socket.on(eventName, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            callback.apply(socket, args);
          });
        });
      },
      emit: function (eventName, data, callback) {
        socket.emit(eventName, data, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            if (callback) {
              callback.apply(socket, args);
            }
          });
        })
      }
    };
  }
})();
