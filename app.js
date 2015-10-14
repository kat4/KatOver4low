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
    var keyPair = {'title': title};
    redisFunctions.addQuestion(keyPair);
    //FCScripters are doing these two
    //one after the other and they come out in order
    //see if you can work out why the callbacks are
    //working at first (see the console.log outputs)
    //but then suddenly they become undefined after the multi
    // #callbackhell
    redisFunctions.getLatestQuestions(myEmit);
    console.log('socketon',myEmit);
  });

  function myEmit(data){
    io.emit('recieve updated questions', data);
    console.log('MYEMIT-dataaaa', data);
  }
}
