'use strict';

let mqtt = require('mqtt');
let config = require('../config.es6');

class Mqtt {
  constructor(board) {
    this.board = board;
    this.client = mqtt.connect(config.mqtt.uri);

    this.client.on('connect', () => {
      this.client.subscribe(config.mqtt.topic);
      console.log('MQTT connected');
    });

    this.client.on('message', this.handleMessage.bind(this));
    this.board.on('change', this.pushStatus.bind(this));
  }

  handleMessage(topic, rawMessage) {
    let message = JSON.parse(rawMessage.toString());
    if (topic !== config.mqtt.topic) return;
    if (message.type == 'colordata') this.changeColor(message.payload);
    if (message.type == 'powerdata') this.changePower(message.payload);
  }

  pushStatus(status) {
    this.client.publish(config.mqtt.topic, JSON.stringify({
      type: 'statusdata',
      payload: status
    }));
  }

  changeColor(color) {
    this.board.color = color;
  }

  changePower(power) {
    this.board.power = power.power;
  }
}

module.exports = Mqtt;
