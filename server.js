'use strict';

var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res) {
  if (req.method === 'GET') {
    res.writeHead(200, {'Content-Type': 'application/json'});
    fs.readdir('./data', function(err, files) {
      res.write(JSON.stringify(files));
      res.end();
    });
  } else if (req.method === 'POST') {
    console.log(JSON.stringify(res.body));
    res.on('data', function(chunk) {
      console.log(chunk);
    });
    fs.readdir('./data', function(err, files) {
      var fileNum = files.length + 1;
      fs.writeFile('data/' + fileNum + '.json', req.body, function(err) {
        if (err) throw err;
        console.log('file saved');
      });
    });
  } else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.write('Not Found 404');
    res.end();
  }
});
server.listen(3000, function() {
  console.log('server running...');
});
