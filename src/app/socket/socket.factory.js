(function () {
  'use strict';

  angular
    .module('angularChat')
    .factory('socketFactory', socketFactory);

  /** @ngInject */
  function socketFactory(socketUrl,$rootScope) {
    var self = this;
    var socket = io.connect(socketUrl);

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
