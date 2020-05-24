

function moveEnemy(screen, x, y){
    screen.moveCursor(-1, 0)
    screen.write(" "); 
    screen.moveCursor(x, y)
    screen.write("|");
}


function Enemy(x, y, screen){
    this.pos = {x, y};
    this.screen = screen; 
    this.screen.cursorTo(x - 1 ,y);
    this.screen.write("▬");
    this.destroyed = false;
}

Enemy.prototype.moveRight = function(){
    this.screen.cursorTo(this.pos.x, this.pos.y);
    this.pos.x += 2;
    moveEnemy(this.screen, 1, 0);
}
Enemy.prototype.moveLeft = function(){
    this.screen.cursorTo(this.pos.x, this.pos.y);
    this.pos.x -= 2;
    moveEnemy(this.screen, -3, 0);
}
Enemy.prototype.getPos = function(){
    return this.pos;
}
Enemy.prototype.getPosAsString = function(){
    return this.pos.x.toString() + this.pos.y.toString();
}
Enemy.prototype.destroy = function(){
    this.destroyed = true;
}
Enemy.prototype.isDestroyed = function(){
    return this.destroyed;
}

module.exports = Enemy;