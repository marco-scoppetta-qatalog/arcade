

function moveShip(screen, x, y){
    screen.moveCursor(-1, 0)
    screen.write(" "); 
    screen.moveCursor(x, y)
    screen.write("|");
}

function Ship(x, y, screen){
    this.pos = {};
    this.pos.x = x;
    this.pos.y = y
    this.screen = screen; 
    this.screen.cursorTo(x ,y);
    this.screen.write("|");
}

Ship.prototype.moveRight = function(){
    moveShip(this.screen, 1, 0);
}
Ship.prototype.moveLeft = function(){
    moveShip(this.screen, -3, 0);
}
Ship.prototype.moveUp = function(){
    moveShip(this.screen, -1, -1);
}
Ship.prototype.moveDown = function(){
    moveShip(this.screen, -1, 1);
}

module.exports = Ship;