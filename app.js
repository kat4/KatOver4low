//start server
var http = require('http');
var port = process.env.PORT || 8000;
var Server = require('./controllers/handler.js');
console.log('server is running on PORT:8000');
http.createServer(Server.handler).listen(port);
