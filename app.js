//start server
var http = require('http');
var port = process.env.PORT || 8000;
var Endpoints = require('./controllers/handler.js');
var Server = http.createServer(Endpoints.handler);
var io = require('socket.io')(Server);
var redisFunctions = require('./controllers/redis.js');
console.log('server is running on PORT:8000');
Server.listen(port);

io.on('connection', manageConnection);

function manageConnection(socket){
  socket.on('disconnect', function(){
  });
  // send new question
  socket.on('send new question', function(questionObject){
    var parsedQuestion = JSON.parse(questionObject);
    redisFunctions.addQuestion(parsedQuestion, emitQlist);

    function emitQlist(data){
      var stringData = JSON.stringify(data);
      io.emit('recieve updated questions', stringData);
    }
  });
  // new comment time
  socket.on('send new comment', function(commentObject){
    var parsedComment = JSON.parse(commentObject);
    redisFunctions.addComment(parsedComment, emitClist);

    function emitClist(data){
      var stringData = JSON.stringify(data);
      io.emit('recieve updated comments', stringData);
    }
  });

 // get question id and send back question
    socket.on('send question id', function(qIdInUrl){
      console.log('im qid', qIdInUrl);
      redisFunctions.getFullQuestion(qIdInUrl, qPageEmit);

      function qPageEmit(data){
        console.log('im the data', data);
        var stringData = JSON.stringify(data);
        io.emit('recieve question from db', stringData);
      }
  });

  //


}
