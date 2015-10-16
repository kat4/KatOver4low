//handler for app.js
var fs = require('fs');
var redisFunctions = require('./redis.js');
var index = fs.readFileSync('./views/index.html');
var questionHTML = fs.readFileSync('./views/question.html');
var handlerFunctions = require('./handlerfunctions.js');
var env = require('env2')('./config.env');
var Http = require('http');

var server = (function() {

    function handler(req, res) {
        var url = req.url;
        var urlArray = url.split('/');
        if (req.method === 'GET') {
            if (url === '/') {
                  handlerFunctions.checkCookie(req,res,index);
            }
            else if (urlArray[1] === "question"){
                res.writeHead(200, {
                  'Content-Type': 'text/html'
                });
                res.end(questionHTML);
            }
            else if (urlArray[1] === 'auth') {
              var userAuthCode = urlArray[2].split('code=')[1];
              console.log(userAuthCode);
              handlerFunctions.getToken(userAuthCode, function(data) {
                //if (data.toString().split('access_token=')[1].split('&')[0]) {
                  console.log(data);
                  handlerFunctions.authWithAT(res, data, index);
                //}
                // else {
                //   res.writeHead(302, {
                //       'Content-Type': 'text/html',
                //       'Location': '/'
                //   });
                //   res.end();
                // }
              });


            }

            else {
                fs.readFile('./public' + req.url, function(err, file) {
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
