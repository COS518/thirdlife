var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require('path');
var io = require('socket.io')(http);

app.get('/', function(req, res) {
  res.sendFile('/public/lion.html', {
    root: __dirname
  });
});

app.use(express.static('.'));

io.on('connection', function(socket) {
  console.log('user connected!');

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(8080, function(){
  console.log('listening on *:8080');
});

var watch = require('gulp-watch');

watch(['./resources/**/*.bin'], function(file) {
  io.emit('data', file.path);
});