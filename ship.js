const Bullet = require('./bullet');

function moveShip(screen, x, y){
    screen.moveCursor(-1, 0)
    screen.write(" "); 
    screen.moveCursor(x, y)
    screen.write("|");
}

function Ship(x, y, screen){
    this.pos = { x, y};
    this.screen = screen; 
    this.screen.cursorTo(x - 1 ,y);
    this.screen.write("|");
}

Ship.prototype.moveRight = function(){
    this.screen.cursorTo(this.pos.x, this.pos.y);
    this.pos.x += 2;
    moveShip(this.screen, 1, 0);
}
Ship.prototype.moveLeft = function(){
    this.screen.cursorTo(this.pos.x, this.pos.y);
    this.pos.x -= 2;
    moveShip(this.screen, -3, 0);
}
Ship.prototype.moveUp = function(){
    this.screen.cursorTo(this.pos.x, this.pos.y);
    this.pos.y -= 1;
    moveShip(this.screen, -1, -1);
}
Ship.prototype.moveDown = function(){
    this.screen.cursorTo(this.pos.x, this.pos.y);
    this.pos.y += 1;
    moveShip(this.screen, -1, 1);
}
Ship.prototype.getPos = function(){
    return this.pos;
}
Ship.prototype.shoot = function(){
    return new Bullet(this.pos.x, this.pos.y-1, this.screen);
}

module.exports = Ship;