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

  incoming.on('data', function(msg) {
  	
  	console.log(msg);
  	socket.emit('data', 'got your message!');
  })
});

http.listen(8080, function(){
  console.log('listening on *:8080');
});

var watch = require('gulp-watch');

watch(['./resources/pointclouds/thirdlife/_converted/data/r/*.hrc'], function(file) {
  socket.emit('data', file.path);
});