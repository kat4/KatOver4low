//handler for app.js
var fs = require('fs');
//var redisFunctions = require('./redis.js');
var index = fs.readFileSync('./views/index.html');
var handlerFunctions = require('./handlerfunctions');

var server = (function() {

  function handler(req, res) {
    console.log(req);
    var url = req.url;
    var urlArray = url.split('/');
    if (req.method === 'GET') {
        if (url === '/') {
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.end(index);
        }
        // else if (urlArray[1] === 'meows') {
        //     client.lrange('__test', 0, -1, function(err, reply) {
        //         if (err) {console.log(err);}
        //         else {
        //           res.write(JSON.stringify(reply));
        //           res.end();
        //         }
        //       });
        //}
        else {
            handlerFunctions.generalHandler(req, res);
        }
    }
  }  
  return {
    handler: handler
  };

}());

module.exports = server;
