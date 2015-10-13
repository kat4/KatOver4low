function generalHandler(req, res) {
    fs.readFile(__dirname + '/public' + req.url, function(err, file) {
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

  module.exports = generalHandler;
