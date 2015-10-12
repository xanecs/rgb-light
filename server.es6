'use strict';

let express = require('express');
let http = require('http');
let config = require('./config.json');
let bodyParser = require('body-parser');
let sse = require('server-sent-events');

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
  res.send({
    color: board.color,
    power: board.power
  });
});

app.post('/color', (req, res) => {
  board.color = req.body;
  res.send({
    color: board.color,
    power: board.power
  });
});

app.get('/change', sse, (req, res) => {
  let listener = (status) => {
    res.sse('data: ' + JSON.stringify(status) + '\n\n');
  };

  board.on('change', listener);

  res.on('close', () => {
    board.removeListener('change', listener);
  });
});

app.listen(config.server.port, config.server.hostname, err => {
  if (err) return console.log(err);
  console.log('HTTP Server started');
});
