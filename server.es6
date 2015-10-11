'use strict';

let express = require('express');
let http = require('http');
let config = require('./config.json');
let bodyParser = require('body-parser');

let Board = require('./functions/board.es6');

let board = new Board(config.hardware.serial, config.hardware.pins);

var app = express();

app.use(bodyParser.json());

app.get('/status', (req, res) => {
  res.send({
    color: board.color,
    power: board.power
  });
});

app.post('/power', (req, res) => {
  board.power = req.body.power;
});

app.post('/color', (req, res) => {
  board.color = req.body.color;
});

app.listen(config.server.port, config.server.hostname, err => {
  if (err) return console.log(err);
  console.log('HTTP Server started');
});

/*
  var server = http.createServer(app);

  app.use(express.static(__dirname + '/public'));
  var io = socketio(server);
  var color = "#FFFFFF";
  var power = false;

  io.on('connection', function (socket) {
    function sendStatus () {
      socket.broadcast.emit('status', {
        color: color,
        power: power
      });
    }

    socket.on('on', function () {
      led.on();
      power = true;
      sendStatus();
    });
    socket.on('off', function () {
      led.off();
      power = false;
      sendStatus();
    });
    socket.on('colorchange', function (newcolor) {
      led.color(newcolor);
      color = newcolor;
      sendStatus();
    });

    socket.emit('status', {
      color: color,
      power: power
    });

  });
  server.listen(2000);
});
*/
