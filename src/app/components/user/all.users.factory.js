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

    //roomFactoryObj.addRoom = function(room){
    //  var result = _.findWhere(roomFactoryObj.rooms, { '_id': room._id });
    //  console.info("find room in opened rooms result : ", result)
    //  if(typeof result === "undefined"){
    //    room.index = roomFactoryObj.rooms.length;
    //    roomFactoryObj.rooms.push(room);
    //    console.info("room pushed into opened rooms")
    //  }
    //};
    //
    //usersFactoryObj.getRoomByIndex = function(index){
    //  var room = _.findWhere(usersFactoryObj.users, { 'index': index });
    //  return room;
    //};

    return usersFactoryObj;
  }

})();
