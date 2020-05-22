const util = require('util');
const GameScreen = require('./gamescreen');
const exec = util.promisify(require('child_process').exec);
const ROWS = 20;
const COLUMNS = 40;

function moveShip(x, y){
  gameScreen.moveCursor(-1, 0)
  gameScreen.write(" "); 
  gameScreen.moveCursor(x, y)
  gameScreen.write("|");
}

async function handleInputs(){
  while(inputs.length){
    const key = inputs.pop();
    const pos = gameScreen.getCursorPos();
    if(key.name === 'right'){
      if(pos.cols < (COLUMNS - 2)){
        moveShip(1, 0)
      }
    }
    if(key.name === 'left'){
      if(pos.cols > 3){
       moveShip(-3, 0)
      }
    }
    if(key.name === 'up'){
      if(pos.rows > 1){
        moveShip(-1, -1);
      }
    }
    if(key.name === 'down'){
      if(pos.rows < (ROWS)){
        moveShip(-1, 1);
      }
    }
    if (key.ctrl && key.name === 'c') {
      gameScreen.cursorTo(0, ROWS+1);
      gameScreen.write("\n");
      gameScreen.write("Bye!")
      const { stdout } = await exec("tput cnorm");
      console.log(stdout);
      runGame = false;
    }
  }
}


const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function drawBorders(){
  for (let index = 0; index < COLUMNS; index++) {
    gameScreen.write("-"); 
  }
  gameScreen.write("\n");
  for (let index = 0; index < ROWS; index++) {
    gameScreen.write("|"); 
    for (let j = 0; j < (COLUMNS - 2); j++) {
      gameScreen.write(" "); 
    }
    gameScreen.write("|");
    gameScreen.write("\n");
  }
  for (let index = 0; index < COLUMNS; index++) {
    gameScreen.write("-"); 
  }
  gameScreen.moveCursor(-(COLUMNS/2), -2);
  gameScreen.write("|"); 
}


let runGame = true;
const gameScreen = new GameScreen();
const inputs = [];
process.stdin.on('keypress',  (str, key) => {inputs.push(key);})

async function startGame(){
  try {
    const { stdout } = await exec("tput civis");
    console.log(stdout);
    drawBorders()
    while(runGame){
      await handleInputs();
      await sleep(10)
    }
    process.exit(0);
  } catch(err) {
    console.error(err);
    process.exit(1);
  }
}


startGame();
