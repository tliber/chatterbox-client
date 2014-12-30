var makeMessage = function(username, text, roomname, createdAt){
  var result = {};

  if (username === 'undefined')
    return;

  text = text || "";

  result.username = username;
  result.text = text;
  result.roomname = roomname;
  result.createdAt = createdAt;

  return result;

};

var App = function() {
  this.server = 'https://api.parse.com/1/classes/chatterbox';
};

App.prototype.init = function(){

};


// var App = function(){
//   obj = {};
//   // this = {};
//   obj.init = function(){

//   };


//   return obj;
// };



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
    // // if (message === undefined) {
    //   var message = makeMessage("User", "Message", "Room");
    // };
    // $.get("https://api.parse.com/1/classes/chatterbox",
    //   function(data){
    //       console.log(data);
    // });
    // var data;
    return $.ajax({
  // always use this url
        url: this.server + '?order=-createdAt',
        type: 'GET',
        //data: JSON.stringify(message),
        // dataType : 'object',
        // contentType: 'application/json',
        success: function (data) {
          console.log('chatterbox: Message got');
          // console.log(data);
          for (var i = 0; i < data.results.length; i++) {
            App.prototype.addMessage(makeMessage(data.results[i].username, data.results[i].text, data.results[i].roomname, data.results[i].createdAt));
          }
        }
      //   error: function (data) {
      // // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      //     console.error('data');
      //     console.error('chatterbox: Failed to send message');
      //   },
      //   complete: function(status) {
      //     console.info(status);
      //   }
    })
  };



App.prototype.clearMessages = function() {
  $('#chats').children().remove();
};
App.prototype.addMessage = function(message){
  // $('<div>').text(message.username + ':' + message.text).appendTo('#chats');
  //$('#chats').append('<div>').text(message.username + ':' + message.text);
  var user = $('<span>').addClass('username').text(message.username);
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

var app = new App();
// var app = Object.create(App())
// // App.prototype.init = function(){

// // };
// app.fetch()

