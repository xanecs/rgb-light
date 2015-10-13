'use strict';
(function () {
  var $colorPicker = $('#colorpicker');
  var $preview = $('.preview');
  var $handle = $('.handle');
  var power = true;

  $handle.click(function () {
    $handle.toggleClass('off');
    power = !$handle.hasClass('off');
    $handle.text(power ? 'ON' : 'OFF');
    $.ajax('/power', {
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({power: power}),
      json: true,
      method: 'POST'
    }).success(handleStatus);
  });

  function getColor() {
    var color = $colorPicker.spectrum('get');
    return {red: color._r, green: color._g, blue: color._b};
  }

  function handleStatus(data) {
    if (!data) return;
    if (data.power !== power) {
      $handle.toggleClass('off');
      power = data.power;
      $handle.text(power ? 'ON' : 'OFF');
    }

    if (data.color !== getColor()) {
      $colorPicker.spectrum('set', 'rgb(' + data.color.red + ', ' + data.color.green + ', ' + data.color.blue + ')');
      $preview.css('background-color', $colorPicker.spectrum('get').toHexString());
    }
  }

  function handleMove(color) {
    $preview.css('background-color', color.toHexString());
    $.ajax('/color', {
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({red: color._r, green: color._g, blue: color._b}),
      json: true,
      method: 'POST'
    }).success(handleStatus);
  }

  $colorPicker.spectrum({
    flat: true,
    showInput: true,
    allowEmpty: false,
    showPalette: true,
    showButtons: false,
    palette: [
      ['#ffffff', '#999999', '#444444'],
      ['#ff0000', '#00ff00', '#0000ff'],
      ['#ff4200', '#96ff00', '#00d8ff']
    ],
    showSelectionPalette: false,
    move: handleMove
  });

  function initialize() {
    $.get('/status', handleStatus);
    var evtSrc = new EventSource("/change");
    evtSrc.onmessage = function (e) {
      handleStatus(JSON.parse(e.data));
    }
  }

  initialize();
})();
