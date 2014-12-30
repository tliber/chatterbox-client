var makeMessage = function(username, text, roomname){
  var result = {};

  if (username === 'undefined')
    return;

  text = text || "";

  result.username = username;
  result.text = text;
  result.roomname = roomname;
  //result.createdAt = createdAt;

  return result;

};

var App = function() {
  this.server = 'https://api.parse.com/1/classes/chatterbox';
  this.userName = '';
  this.currentRoom = '';
  this.roomList = [];
  this.friendList = [];
};

App.prototype.init = function(){
  var thisApp = this;
  $("#sendMessage").on("click", function(){
      var username = $('#userName').val();
      var message = $('#message').val();
      App.prototype.send.call(thisApp,makeMessage(username, message, thisApp.currentRoom));
  });
};
App.prototype.send = function(message){

    $.ajax({
  // always use this url
        url: this.server,
        type: 'POST',
        data: JSON.stringify(message),
        contentType: 'application/json',
        success: function (data) {
        console.log('chatterbox: Message sent');

        },
        error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message');
        }
    });
  };
  App.prototype.fetch = function(){
    var params = "?order=-createdAt";
    if (this.currentRoom !== "") {
      params += "&where={\"roomname\":\"" + this.currentRoom + "\"}"
    }
    $.ajax({

  // always use this url
        url: this.server + params,
        type: 'GET',
        success: this.showMessages.bind(this)

    })
  };
  App.prototype.showMessages = function(data){
    App.prototype.clearMessages();
    for (var i = 0; i < data.results.length; i++) {
      this.addMessage(makeMessage(data.results[i].username, data.results[i].text, data.results[i].roomname, data.results[i].createdAt));
      //create rooms
      var room = data.results[i].roomname;
      var thisapp = this;
      //console.log(this)
      if (this.roomList.indexOf(room) === -1){
        this.roomList.push(room);
        $room = $('<span>').addClass('room').text(room);
        $('#roomSelect').append($room);
        $room.on('click',function(){
          thisapp.currentRoom = this.innerHTML;

          // alert(this);
          // console.log(this.innerHTML);

        //update html page
        //attach event listeners
      });
    }
  }
}

App.prototype.clearMessages = function() {
  $('#chats').children().remove();
};
App.prototype.addMessage = function(message){
  var thisApp = this;
  var user = $('<span>').addClass('username').text(message.username);
  user.on('click', function(){
    if (thisApp.friendList.indexOf(this.innerHTML) === -1){

      thisApp.friendList.push(this.innerHTML);
      var newFriend = $('<span>').addClass('friend').text(this.innerHTML);
      $("#friends").append(newFriend);
    }
  })
  if (this.friendList.indexOf(message.username) > -1) {
    user.addClass("myFriend");
  }
  var created = $('<span>').addClass('created').text(message.createdAt);
  var message = $('<span>').addClass('message').text(message.text);
  var newNode = $('<div>').addClass('chat');
  newNode.append(user).append(message).append(created);
  $('#chats').append(newNode);

};
App.prototype.addRoom = function(roomName){
  var newRoom = $('<div>').text(roomName);
  $('#roomSelect').append(newRoom);
};

App.prototype.addFriend = function(friend){

};
App.prototype.handleSubmit = function(){

};

///var app = new App();
