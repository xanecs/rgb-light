'use strict';

let fs = require('fs');

module.exports = (function () {
  if (fs.existsSync('./config.json')) {
    return require('./config.json');
  } else {
    return require('./config.example.json');
  }
})();
