
/**
 * GameScreen
 * 
 * The origin (0,0) is the top-left corner.
 * 
 *  0 1 2 3
 * 0
 * 1    
 * 2    x
 */

/**
 * @param columns width of game screen
 * @param rows height of game screen
 * @param {TTY Stream} outStream 
 */
function GameScreen(columns, rows, outStream) {
    this.cursor = { rows: 0, cols: 0};
    this.size = { columns, rows }
    this.outStream = outStream || process.stdout;
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

GameScreen.prototype.drawBorders = function (){
  for (let index = 0; index < this.size.columns; index++) {
    this.write("-"); 
  }
  this.write("\n");
  for (let index = 0; index < this.size.rows; index++) {
    this.write("|"); 
    for (let j = 0; j < (this.size.columns - 2); j++) {
      this.write(" "); 
    }
    this.write("|");
    this.write("\n");
  }
  for (let index = 0; index < this.size.columns; index++) {
    this.write("-"); 
  }
}

GameScreen.prototype.getSize = function(){
  return this.size;
}

module.exports = GameScreen;