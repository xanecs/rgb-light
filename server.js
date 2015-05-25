var express = require('express');
var socketio = require('socket.io');
var five = require('johnny-five');
var http = require('http');

var board = new five.Board();

board.on('ready', function () {
  var led = new five.Led.RGB({
    pins: {
      red: 10,
      green: 9,
      blue: 11
    }
  });

  var app = express();
  var server = http.createServer(app);

  app.use(express.static(__dirname + '/public'));
  var io = socketio(server);
  var color = "#FFFFFF";
  var power = false;

  io.on('connection', function (socket) {
    socket.emit('status', {
      color: color,
      power: power
    });
    socket.on('on', function () {
      led.on();
      power = true;
    });
    socket.on('off', function () {
      led.off();
      power = false;
    });
    socket.on('colorchange', function (newcolor) {
      led.color(newcolor);
      color = newcolor;
    });
  });
  server.listen(2000);
});
