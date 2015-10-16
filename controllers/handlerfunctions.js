var fs = require('fs');
var http = require('http');
var https = require('https');
var querystring = require('querystring');
var redisFunctions = require('./redis.js');

var handlerFunctions = (function() {

    function checkCookie(req, res, destination) {
        var authRedirect = 'https://github.com/login/oauth/authorize?client_id=' + process.env.CLIENT_ID + '&scope=user';
        if (req.headers.cookie) {

            console.log('whole cookie ======', req.headers.cookie);
            console.log('accessCookie ======', accessCookie);

            var accessCookie = req.headers.cookie.split('access=')[1];

            if (accessCookie) {

                var access = accessCookie.split(';')[0].split('&')[0];
                // accessCookie.split(';')[0].split('&')[1]   ; katkelemen
                var username = accessCookie.split(';')[0].split('&')[1];
                redisFunctions.checkUser(access, username, function(res) {
                    res.writeHead(200, {
                        'Content-Type': 'text/html'
                    });
                    res.end(destination);
                });

            } else {
                console.log('no cookie inside');
                res.writeHead(302, {
                    'Content-Type': 'text/html',
                    'Location': authRedirect
                });
                res.end();
            }
        } else {
            console.log('no cookie outside');
            res.writeHead(302, {
                'Content-Type': 'text/html',
                'Location': authRedirect
            });
            res.end();
        }
    }

    function getToken(code, callback) {
        var postData = querystring.stringify({
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            code: code

        });
        console.log(postData);
        var postOptions = {
            hostname: 'github.com',
            path: '/login/oauth/access_token',
            method: 'POST'

        };
        var reqAT = https.request(postOptions, function(res) {

            console.log(res.statusCode);
            var body = '';
            res.setEncoding('utf8');
            res.on('data', function(chunk) {
                body += chunk;
            });
            res.on('end', function() {
                callback(body);
            });

        });
        reqAT.write(postData);
        reqAT.end();
    }



    function authWithAT(res, data, index) {

        var accessToken = data.toString().split('access_token=')[1].split('&')[0];
        console.log('acces token:' + accessToken);

        var getOptions = {
            host: 'api.github.com',
            path: '/user?access_token=' + accessToken,
            headers: {
                'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36'
            }
        };
        var reqUser = https.request(getOptions, function(getRes) {

            console.log(getRes.statusCode);
            var body = '';
            getRes.setEncoding('utf8');
            getRes.on('data', function(chunk) {
                body += chunk;
            });
            getRes.on('end', function() {
                var ghUsername = JSON.parse(body).login;
                console.log(JSON.parse(body).login);
                var cookie = Math.floor(Math.random() * 100000000);
                // here we are setting 'sessions', we want to store in redis
                redisFunctions.addUser(cookie, ghUsername);
                console.log('cookie', cookie, '  getting written');
                res.writeHead(200, {
                    "Set-Cookie": 'access=' + cookie + '&' + ghUsername
                });
                res.end(index);

            });

        });
        reqUser.end();


    }


    function generalHandler(req, res) {
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


    return {
        generalHandler: generalHandler,
        getToken: getToken,
        authWithAT: authWithAT,
        checkCookie: checkCookie

    };

})();


module.exports = handlerFunctions;
