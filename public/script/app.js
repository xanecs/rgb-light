function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
var socket = io();

var colorhex = "#FFFFFF";

socket.on('status', function (data) {
    colorhex = data.color;
    console.log(data);
    if (data.power) {
      $('.control').css({
        'box-shadow': '0 0 2px 5px ' + colorhex
      });
    }
    else {
      $('.control').css({
        'box-shadow': 'none'
      });
    }
});

$(".colorpicker").spectrum({
  color: colorhex,
  flat: true,
  showButtons: false,
  move: function(color) {
    colorhex = rgbToHex(Math.floor(color._r), Math.floor(color._g), Math.floor(color._b));
    socket.emit('colorchange', colorhex);
    $('.control').css({
      'box-shadow': '0 0 2px 5px ' + colorhex
    });
  }
});
$('.on').click(function () {
  socket.emit('on');
  $('.control').css({
    'box-shadow': '0 0 2px 5px ' + colorhex
  });
});
$('.off').click(function () {
  socket.emit('off');
  $('.control').css({
    'box-shadow': 'none'
  });
});
$(window).keydown(function () {
  socket.emit('on');
  $('.control').css({
    'box-shadow': '0 0 2px 5px ' + colorhex
  });
});

$(window).keyup(function () {
  socket.emit('off');
  $('.control').css({
    'box-shadow': 'none'
  });
});
