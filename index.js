const webduino = require('webduino-js');
require('webduino-bit-module-button')(webduino);
require('webduino-blockly');
const TYPE = 1;

switch (TYPE) {
  case 0:
    demo_js();
    break;

  case 1:
    demo_blockly();
    break;

  default:
    break;
}

/** 
 * 使用 webduino-blockly 的寫法
 */
function demo_blockly() {
  boardReady({ board: 'Bit', device: 'J7ecBjhDEiAecaXUbW', transport: 'mqtt' }, (board) => {
    console.log('開始囉');
    board.samplingInterval = 250;
    const btnA = getPullupButton(board, 35);
    const btnB = getPullupButton(board, 27);
    function button_event_64223143() {
      console.log('一起點擊');
    }
    function button_handle_64221873(btn, type) {
      return () => {
        btn.currentStatus = type;
        btnA.currentStatus === "pressed" && btnB.currentStatus === "pressed" && button_event_64223143();
      };
    }
    btnA.on("pressed", button_handle_64221873(btnA, "pressed"));
    btnA.on("released", button_handle_64221873(btnA, "released"));
    btnA.on("longPress", button_handle_64221873(btnA, "longPress"));
    btnB.on("pressed", button_handle_64221873(btnB, "pressed"));
    btnB.on("released", button_handle_64221873(btnB, "released"));
    btnB.on("longPress", button_handle_64221873(btnB, "longPress"));
  });
}

/** 
 * 僅使用 webduino-js 
 */
function demo_js() {
  const opts = {
    board: 'Bit',
    device: 'J7ecBjhDEiAecaXUbW',
    transport: 'mqtt'
  };
  let board = new webduino.board[opts.board](opts);

  board.once(webduino.BoardEvent.READY, (board) => {
    console.log('開始囉');
    board.samplingInterval = 250;
    const btnA = new webduino.module.Button(board, board.getDigitalPin(35), webduino.module.Button.PULL_UP);
    const btnB = new webduino.module.Button(board, board.getDigitalPin(27), webduino.module.Button.PULL_UP);

    function doSomething() {
      console.log('一起點擊');
    }
    function handler(btn, type) {
      return () => {
        btn.currentStatus = type;
        btnA.currentStatus === "pressed" && btnB.currentStatus === "pressed" && doSomething();
      };
    }

    btnA.on("pressed", handler(btnA, "pressed"));
    btnA.on("released", handler(btnA, "released"));
    btnA.on("longPress", handler(btnA, "longPress"));
    btnB.on("pressed", handler(btnB, "pressed"));
    btnB.on("released", handler(btnB, "released"));
    btnB.on("longPress", handler(btnB, "longPress"));
  });
}
