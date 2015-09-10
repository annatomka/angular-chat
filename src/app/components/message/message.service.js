(function() {
  'use strict';

  angular
    .module('angularChat')
    .service('MessageService',MessageService);

  /** @ngInject */
  function MessageService($resource,apiUrl,Message,Room,AccountService) {
    this.getRoomMessages = getRoomMessages;
    this.createRoomMessage = createRoomMessage;

    function getRoomMessages(roomId){
      return Message.query({id: roomId});
    }

    function createRoomMessage(roomId, message){
      //var newMessage = $resource(apiUrl + '/rooms/:id/messages/:messageId',{id: roomId});;

      var newMessage = new Message();
      newMessage.text = message;
      newMessage.user = AccountService.getLoggedInUser();
      newMessage.$save({id: roomId});
    }
  }

})();
