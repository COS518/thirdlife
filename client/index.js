var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require('path');
var socket = require('socket.io')(http);

app.get('/', function(req, res) {
  res.sendFile('/public/lion.html', {
    root: __dirname
  });
});

app.use(express.static('.'));

socket.on('connection', function(incoming) {
  console.log('user connected!');

  incoming.on('disconnect', function(){
    console.log('user disconnected');
  });

  incoming.on('hello', function(msg) {
  	socket.emit('data', 'got your message!');
  })
});

http.listen(8080, function(){
  console.log('listening on *:8080');
});

var watch = require('gulp-watch');

watch(['./resources/**/*.bin'], function(file) {
  socket.emit('data', file.path);
});