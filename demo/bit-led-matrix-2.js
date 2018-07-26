require('webduino-blockly');
require('webduino-bit-module-led-matrix');

var matrix;

boardReady({ board: 'Bit', device: 'J7ecBjhDEiAecaXUbW', transport: 'mqtt' }, function (board) {
  board.samplingInterval = 250;
  matrix = getMatrix(board, 4, 25);
  matrix.setCharacter('D', '#ff0000');
});