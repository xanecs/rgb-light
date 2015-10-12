'use strict';

let five = require('johnny-five');

class Board {
  constructor(serial, pins, connectCallback) {
    this.ledpower = false;
    this.ledcolor = {red: 0, green: 0, blue: 0};

    this.board = new five.Board({
      port: serial,
      repl: false
    });
    this.board.on('ready', () => {
      this.led = new five.Led.RGB({
        pins: pins
      });
      if (connectCallback) connectCallback();
    });
  }

  set power(power) {
    this.ledpower = power;
    if (power) {
      this.led.on();
    }
    else {
      this.led.off();
    }
  }

  get power() {
    return this.ledpower;
  }

  set color(color) {
    this.checkColor(color);
    this.ledcolor = color;

    let hexColor = "#";
    for (let sub of ['red', 'green', 'blue']) {
      let str = color[sub].toString(16);
      if (str.length === 1) {
        str = "0" + str;
      }
      hexColor += str;
    }

    this.led.color(hexColor);
    if (color.red + color.green + color.blue !== 0) {
      this.power = true;
    }
  }

  get color() {
    return this.ledcolor;
  }

  checkColor(color) {
    if (!(color.red !== undefined && color.green !== undefined && color.blue !== undefined)) {
      throw 'Invalid color object';
    }

    for (let sub of ['red', 'green', 'blue']) {
      if (!(typeof color[sub] === 'number' && color[sub] >= 0 && color[sub] <= 255)) {
        throw 'Incorrect color value for ' + sub;
      }
    }
  }
}

module.exports = Board;
