let webduino = require('webduino-js');
require('webduino-bit-module-led-matrix')(webduino);

const opts = {
  board: 'Bit',
  device: 'J7ecBjhDEiAecaXUbW',
  transport: 'mqtt'
};

let board = new webduino.board[opts.board](opts);

board.once(webduino.BoardEvent.READY, (board) => {
  board.samplingInterval = 250;
  const matrix = new webduino.module.Matrix(board, 4, 25);
  matrix.setCharacter('1', '#ffff66');
});
