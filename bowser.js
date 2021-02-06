'use strict';
class Bowser extends Sprite {

    constructor(x,y) {
        super(x,y);
        this.x  = x<<4;
        this.y  = y<<4
        this.sp = 224;
        this.w  = 32;
        this.h  = 32;
        this.vx = 0;
        this.vy = 0;
        this.count2 = 0;
    }

    update() {
        if((this.x>>4) > (ojisan.x>>4)+SCREEN_SIZE_W) return;
        // if(this.x < ojisan.x) this.sp =192;
        // this.y += this.vy;

        // if(++this.count <= 24) {
        //     this.y -= 1<<4; 
        // } else 
        if(++this.count < 72) {
            // ++this.count2 <= 48;
            let anime = [226,224,226,224,226,224];
            this.sp = anime[this.count>>3];
        } else if(this.count < 96) {
            this.count2 = 0;
        } else if(this.count < 178) {
            // this.kill = true;
        } else if(this.count == 178) {
            this.count = 0;
            // this.kill = false;
        }
        if(this.checkHit(ojisan)) ojisan.killDown();
        this.checkWall();
        this.checkFloor();
        super.update();
    }

    draw() {
        // if(this.kill) return;
        super.draw();
    }
}

let bowser = [
    new Bowser(180,160),
   
];
// パックンを消す、当たり判定