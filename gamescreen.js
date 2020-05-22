
const readline = require('readline');

/**
 * 
 * @param {TTY Stream} inStream 
 * @param {TTY Stream} outStream 
 */
function GameScreen(inStream, outStream) {
    this.cursor = { rows: 0, cols: 0};
    this.inStream = inStream || process.stdin;
    this.outStream = outStream || process.stdout;
    
    this.inStream.setRawMode(true)
    readline.emitKeypressEvents(this.inStream);
}

GameScreen.prototype.write = function(text) {
  if(text === '\n'){
    this.cursor.cols = 0;
    this.cursor.rows += 1;
  }else {
    this.cursor.cols += text.length;
  }

  this.outStream.write(text); 
};

GameScreen.prototype.moveCursor = function(x,y) {
  this.cursor.cols += x;
  this.cursor.rows += y;

  this.outStream.moveCursor(x, y);
}

GameScreen.prototype.cursorTo = function(x,y) {
  const deltaX = x - this.cursor.cols;
  const deltaY = y - this.cursor.rows;
  this.cursor.cols = x;
  this.cursor.rows = y;
  this.outStream.moveCursor(deltaX, deltaY);
}

GameScreen.prototype.getCursorPos = function(){
  return this.cursor;
}

module.exports = GameScreen;