const Bullet = require('./bullet');

function moveShip(screen, x, y){
    deleteShip(screen);
    screen.moveCursor(x, y)
    drawShip(screen);
}

function deleteShip(screen){
    screen.moveCursor(-1, -1);
    screen.write(" ");
    screen.moveCursor(-3, 1);
    screen.write("     ");
}

function drawShip(screen){
    screen.moveCursor(-1, -1);
    screen.write("|");
    screen.moveCursor(-3, 1);
    screen.write("|");
    screen.write(String.fromCharCode(0x2807));
    screen.write("|");
    screen.write(String.fromCharCode(0x2838));
    screen.write("|");
}
function log(screen, text){
    const previousPos = screen.getCursorPos();
    screen.cursorTo(screen.size.columns, +3)
    screen.write(text);
    screen.cursorTo(previousPos.x, previousPos.y);
}

function Ship(x, y, screen){
    this.pos = {x, y}; // Logical position of ship on the screen
    this.screen = screen; 
    this.screen.cursorTo(x,y);
    drawShip(this.screen);
}

Ship.prototype.moveRight = function(){
    this.screen.cursorTo(this.pos.x, this.pos.y); //move cursor to logical pos
    deleteShip(this.screen);
    this.screen.cursorTo(this.pos.x, this.pos.y); //bring back cursor to logical pos
    this.screen.moveCursor(1, 0); //move cursor to the right
    drawShip(this.screen);//draw ship on new cursor pos
    this.pos.x += 1; // update logical position
}
Ship.prototype.moveLeft = function(){
    this.screen.cursorTo(this.pos.x, this.pos.y);
    deleteShip(this.screen);
    this.screen.cursorTo(this.pos.x, this.pos.y); //move cursor to logical pos
    this.screen.moveCursor(-1, 0); //draw ship on new cursor pos
    drawShip(this.screen);
    this.pos.x -= 1;
}
Ship.prototype.moveUp = function(){
    this.screen.cursorTo(this.pos.x, this.pos.y);
    deleteShip(this.screen);
    this.screen.cursorTo(this.pos.x, this.pos.y); //move cursor to logical pos
    this.screen.moveCursor(0, -1); //draw ship on new cursor pos
    drawShip(this.screen);
    this.pos.y -= 1;
}
Ship.prototype.moveDown = function(){
    this.screen.cursorTo(this.pos.x, this.pos.y);
    deleteShip(this.screen);
    this.screen.cursorTo(this.pos.x, this.pos.y); //move cursor to logical pos
    this.screen.moveCursor(0, 1); //draw ship on new cursor pos
    drawShip(this.screen);
    this.pos.y += 1;
}
Ship.prototype.getPos = function(){
    return this.pos;
}
Ship.prototype.shoot = function(){
    return new Bullet(this.pos.x, this.pos.y-1, this.screen, '+');
}

module.exports = Ship;