const util = require('util');
const GameScreen = require('./gamescreen');
const Ship = require('./ship');
const Enemy = require('./enemy');
const exec = util.promisify(require('child_process').exec);


const ROWS = 20;
const COLUMNS = 40;
let runGame = true;
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

function handleInputs(screen, ship, bullets){
  while(inputs.length){
    const key = inputs.pop();
    const pos = ship.getPos();
    if(key.name === 'right'){
      if(pos.x < (COLUMNS - 2)){
        ship.moveRight();
      }
    }
    if(key.name === 'left'){
      if(pos.x > 3){
        ship.moveLeft();
      }
    }
    if(key.name === 'up'){
      if(pos.y > 1){
        ship.moveUp();
      }
    }
    if(key.name === 'down'){
      if(pos.y < (ROWS)){
        ship.moveDown();
      }
    }
    if (key.ctrl && key.name === 'c') {
      screen.cursorTo(0, ROWS+1);
      screen.write("\n");
      screen.write("Bye!")
      runGame = false;
    }
    if(key.name === 'space'){
      bullets.push(ship.shoot());
    }
  }
}


function updateBullets(bullets){
  bullets.forEach((b, i ) => {
    const deleteBullet = b.moveUp();
    if(deleteBullet){
      bullets.splice(i, 1);
    }  
  })
}

let TICK = 1;
let POINTS = 0;
function update(bullets, enemy){
  TICK++;
  if(TICK%2===0){
   updateBullets(bullets);
   if(!enemy.isDestroyed()){
    const ePos = enemy.getPosAsString();
    bullets.forEach(b =>{
      if(ePos === b.getPosAsString()){
        POINTS++;
        enemy.destroy();
      }
    })
   }
  }
}

function render(screen){
  drawPoints(screen);
}


const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function drawPoints(s){
  s.cursorTo(COLUMNS+1, 0);
  s.write(POINTS.toString());
}

async function startGame(){
  try {
    await disableTerminalCursor();

    const gameScreen = new GameScreen();
    gameScreen.drawBorders(COLUMNS, ROWS);
    drawPoints(gameScreen);
    const ship = new Ship((COLUMNS/2), ROWS-1, gameScreen);
    const enemy = new Enemy((COLUMNS/2), 1, gameScreen);
    const bullets = [];

    while(runGame){
      handleInputs(gameScreen, ship, bullets);
      update(bullets, enemy);
      render(gameScreen);
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
