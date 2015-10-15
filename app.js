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
  console.log('log user connected');
  socket.on('disconnect', function(){
    console.log('log user disconnected');
  });
  socket.on('send new question', function(title){
    redisFunctions.redisKato.addQuestion(title);
    io.emit('recieve updated questions', title);
  });
}
