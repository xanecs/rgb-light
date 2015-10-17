'use strict';

let express = require('express');
let config = require('../config.es6');
let bodyParser = require('body-parser');
let sse = require('server-sent-events');

module.exports = function (board) {
  let app = express();

  app.use(express.static(__dirname + '/../public'))

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

}
