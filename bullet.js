


function Bullet(x, y, screen){
    this.pos = { x, y };
    this.screen = screen; 
    this.screen.cursorTo(x - 1, y );
    this.screen.write("+");
}

Bullet.prototype.moveUp = function(){
    this.screen.cursorTo(this.pos.x - 1,  this.pos.y);
    this.screen.write(' ');
    this.pos.y -= 1;

    if( this.pos.y === 0 ){ return true; }

    this.screen.cursorTo(this.pos.x - 1, this.pos.y);
    this.screen.write('+');
    return false;
}
Bullet.prototype.getPos = function(){
    return this.pos;
}
Bullet.prototype.getPosAsString = function(){
    return this.pos.x.toString() + this.pos.y.toString();
}


module.exports = Bullet;