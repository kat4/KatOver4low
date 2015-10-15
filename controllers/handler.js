//handler for app.js
var fs = require('fs');
var redisFunctions = require('./redis.js');
var index = fs.readFileSync('./views/index.html');
// var questionHTML = fs.readFileSync('./views/questions.html');
var handlerFunctions = require('./handlerfunctions');
var env = require('env2')('./config.env');
var Http = require('http');

var server = (function() {

    function handler(req, res) {
        var url = req.url;
        var urlArray = url.split('/');
        if (req.method === 'GET') {
            if (url === '/') {
                  res.writeHead(200, {
                      'Content-Type': 'text/html'
                  });
                  res.end(index);
            }
            else if (urlArray[1] === "question"){
                res.writeHead(200, {
                  'Content-Type': 'text/html'
                });
                res.end(questionHTML);
            }
            else if (urlArray[1] === 'auth') {
                var userAuthCode = urlArray[2].slice(6);
                getToken(userAuthCode,function(data){
                    res.end(data);
                });


            }

            else {
                fs.readFile('./public' + req.url, function(err, file) {
                    if (err) {
                        res.writeHead(404);
                        console.log(req.url);
                        console.log(err);
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

function getToken(code, callback) {
    var postData ='code='+ code + '&client_id='+process.env.CLIENT_ID+'&client_secret='+process.env.CLIENT_SECRET;
    var postOptions = {
        hostname: 'github.com',
        port: '80',
        path: '/login/oauth/access_token',
        method: 'POST',

    };
    var postRequest = http.request(postOptions, function(res) {
        var body ='';
        res.setEncoding('utf8');
        res.on('data', function(chunk) {
            body += + chunk;
        });
        res.on('end', function(){
            callback(body);
        });
    });
    req.write(postData);
    req.end();
}

module.exports = server;
