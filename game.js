const util = require('util');
const GameScreen = require('./gamescreen');
const Ship = require('./ship');
const exec = util.promisify(require('child_process').exec);


const ROWS = 20;
const COLUMNS = 40;
let runGame = true;
const gameScreen = new GameScreen();
const inputs = [];
process.stdin.on('keypress',  (str, key) => {inputs.push(key);})


async function enableTerminalCursor(){
  const { stdout } = await exec("tput cnorm");
  console.log(stdout);
}

async function disableTerminalCursor(){
  const { stdout } = await exec("tput civis");
  console.log(stdout);
}

async function handleInputs(ship){
  while(inputs.length){
    const key = inputs.pop();
    const pos = gameScreen.getCursorPos();
    if(key.name === 'right'){
      if(pos.cols < (COLUMNS - 2)){
        ship.moveRight();
      }
    }
    if(key.name === 'left'){
      if(pos.cols > 3){
        ship.moveLeft();
      }
    }
    if(key.name === 'up'){
      if(pos.rows > 1){
        ship.moveUp();
      }
    }
    if(key.name === 'down'){
      if(pos.rows < (ROWS)){
        ship.moveDown();
      }
    }
    if (key.ctrl && key.name === 'c') {
      gameScreen.cursorTo(0, ROWS+1);
      gameScreen.write("\n");
      gameScreen.write("Bye!")
      runGame = false;
    }
  }
}


const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));


async function startGame(){
  try {
    await disableTerminalCursor();
    gameScreen.drawBorders(COLUMNS, ROWS);

    const ship = new Ship((COLUMNS/2), ROWS-1, gameScreen)

    while(runGame){
      await handleInputs(ship);
      await sleep(10)
    }

    await enableTerminalCursor();
    process.exit(0);
  } catch(err) {
    console.error(err);
    await enableTerminalCursor();
    process.exit(1);
  }
}


startGame();
