'use strict';

let config = require('./config.es6');
let Board = require('./functions/board.es6');
let Http = require('./functions/http.es6');
let Mqtt = require('./functions/mqtt.es6');

let board = new Board(config.hardware.serial, config.hardware.pins);
if (config.server.enabled) var http = Http(board);
if (config.mqtt.enabled) var mqtt = new Mqtt(board);
