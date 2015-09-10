'use strict';

var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res) {
  var data = '';
  if (req.method === 'GET') {
    res.writeHead(200, {'Content-Type': 'application/json'});
      var match = req.url.match(/\/name\/(\d+)/);
      if(match){
        var num = match[1];
        fs.readFile('./data/' + num + '.json', function(err, data){
          res.write(data);
          res.end();
        })
      } else {
        fs.readdir('./data', function(err, files) {
          files = files.map(function(data){
            return data.match(/^(\d+)\./)[1];
          })
          .sort(function(b, a){
            return b - a;
          });
        res.write(JSON.stringify(files));
        res.end();
        });
      }
  } else if (req.method === 'POST') {
    req.on('data', function(chunk) {
      data += chunk;
    });
    req.on('end', function(){
      fs.readdir('./data', function(err, files) {
        var fileNum = files.length + 1;
        fs.writeFile('data/' + fileNum + '.json', data, function(err) {
          if (err) throw err;
          console.log('file saved');
        });
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
