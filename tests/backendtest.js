var test = require('tape');
var server = require('../controllers/handler.js');
var shot = require('shot');


test("check 1 is equal to 1", function (t) {
    t.equal(1, 1, "success!");
    t.end();
});
test("Testing request for frontend.js file", function(t) {
    shot.inject(server.handler, {
        method: "GET",
        url: '/javascript/frontend.js'
    }, function(res) {
        t.equal(res.statusCode, 200, "...");
        t.end();
    });
});
test("Testing request for frontend.js file", function(t) {
    shot.inject(server.handler, {
        method: "GET",
        url: '/'
    }, function(res) {
        t.equal(res.statusCode, 200, "...");
        t.end();
    });
});
