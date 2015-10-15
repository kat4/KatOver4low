var handler = function(req, res) {
    res.writeHead(302, {
        'Content-Type': 'text/html',
        'Location': 'https://github.com/login/oauth/authorize'
    });
    res.end();
};
