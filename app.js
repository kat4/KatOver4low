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
  socket.on('send new question', function(questionObject){
    var parsedQuestion = JSON.parse(questionObject);
    redisFunctions.addQuestion(parsedQuestion, myEmit);

    function myEmit(data){
      var stringData = JSON.stringify(data);
      io.emit('recieve updated questions', stringData);
    }
  });
  socket.on('send question id', function(qIdInUrl){

  });


}
