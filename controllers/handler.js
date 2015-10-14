//handler for app.js
var fs = require('fs');
var redisFunctions = require('./redis.js');
var index = fs.readFileSync('./views/index.html');
var handlerFunctions = require('./handlerfunctions');

var server = (function() {

  function handler(req, res) {
    // console.log(req);
    var url = req.url;
    var urlArray = url.split('/');
    if (req.method === 'GET') {
        if (url === '/') {
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.end(index);
        }
        else {
          fs.readFile( './public' + req.url, function(err, file) {
              if (err) {
                  res.writeHead(404);
                  res.end('arm broken');
              } else {
                  var ext = req.url.split('.')[1];
                  res.writeHead(200, {
                      'Content-Type': 'text/' + ext
                  });
                  res.end(file);
              }
          });
        }
    }
  }
  return {
    handler: handler
  };

}());



module.exports = server;
