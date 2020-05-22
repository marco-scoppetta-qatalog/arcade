

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
    this.pos.x += 2;
    moveShip(this.screen, 1, 0);
}
Ship.prototype.moveLeft = function(){
    this.pos.x -= 2;
    moveShip(this.screen, -3, 0);
}
Ship.prototype.moveUp = function(){
    this.pos.y -= 1;
    moveShip(this.screen, -1, -1);
}
Ship.prototype.moveDown = function(){
    this.pos.y += 1;
    moveShip(this.screen, -1, 1);
}
Ship.prototype.getPos = function(){
    return this.pos;
}

module.exports = Ship;