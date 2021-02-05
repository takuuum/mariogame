'use strict';
class Piranha extends Sprite {

    constructor(x,y) {
        super(x,y);
        this.x  = x<<4;
        this.y  = y<<4
        this.sp = 140;
        this.w  = 16;
        this.h  = 32;
        this.vx = 0;
        this.vy = 0;
        this.count2 = 0;
    }

    update() {
        if((this.x>>4) > (ojisan.x>>4)+SCREEN_SIZE_W) return;
        this.y += this.vy;

        if(++this.count <= 24) {
            this.y -= 1<<4; 
        } else if(this.count < 72) {
            ++this.count2 <= 48;
            let anime = [140,141,140,141,140,141];
            this.sp = anime[this.count2>>3];
        } else if(this.count < 96) {
            this.sp = 140;
            this.y += 1<<4; 
            this.count2 = 0;
        } else if(this.count == 178) {
            this.count = 0;
        }
        if(this.checkHit(ojisan)) ojisan.killDown();
    }

    draw() {
        // if(this.kill) return;
        super.draw();
    }
}

let piranha = [
    new Piranha(920,136),
    new Piranha(2200,188),
    new Piranha(2600,168),
    new Piranha(2856,168)
];
// パックンを消す、当たり判定