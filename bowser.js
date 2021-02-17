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

        if(++this.count < 96) {
            // ++this.count2 <= 48;
            let anime = [226,224,226,224,226,224,226,224,226,224,226,224];
            this.sp = anime[this.count>>3];
        } else if(this.count == 96) {
            let lx = ((this.x+this.vx)>>4);
            let ly = ((this.y+this.vy)>>4);
            bowserfire.push(new BowserFire(lx-16,ly-16));
            bowserfire1.push(new BowserFire1(lx-16,ly-16));
            // bowserfire.push(new BowserFire(232,(this.x>>4)-16,(this.y>>4)+32));
        } else if(this.count < 144) {
            ++this.count2
            let anime = [228,230,228,230,228,230,224];
            this.sp = anime[this.count2>>3];
        } else if(this.count < 160) {
            this.count2 = 0;
            this.vy -= 8;
        } else if(this.count == 192) {
            this.count = 0;
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
let bowser = [new Bowser(2984,32)];

// クッパのファイヤー
class BowserFire extends Sprite {
    constructor(x,y) {
        super(x,y);
        this.x  = x<<4;
        this.y  = y<<4
        this.sp = 232;
        this.w  = 32;
        this.h  = 16;
        this.vx = -25;
        this.vy = 10;
    }

    update() {
        if((this.x>>4) > (ojisan.x>>4)+SCREEN_SIZE_W) return;
        this.x += this.vx;
        this.y += this.vy;

        if(this.checkHit(ojisan)) ojisan.killDown();
        // super.update();
    }

    draw() {
        // if(this.kill) return;
        super.draw();
    }
}

// let bowserfire = [new BowserFire(180,160)]

class BowserFire1 extends Sprite {
    constructor(x,y) {
        super(x,y);
        this.x  = x<<4;
        this.y  = y<<4
        this.sp = 248;
        this.w  = 32;
        this.h  = 16;
        this.vx = -25;
        this.vy = 20;
    }

    update() {
        if((this.x>>4) > (ojisan.x>>4)+SCREEN_SIZE_W) return;
        this.x += this.vx;
        this.y += this.vy;

        if(this.checkHit(ojisan)) ojisan.killDown();
        // super.update();
    }

    draw() {
        // if(this.kill) return;
        super.draw();
    }
}

class BulletBill extends Sprite {
    constructor(x,y) {
        super(x,y);
        this.x  = x<<4;
        this.y  = y<<4
        this.sp = 189;
        this.w  = 16;
        this.h  = 16;
        this.vx = -25;
        this.vy = 0;
    }

    update() {
        if((this.x>>4) > (ojisan.x>>4)+48) return;
        this.x += this.vx;
        this.y += this.vy;

        if(this.checkHit(ojisan)) ojisan.killDown();
        // super.update();
    }

    draw() {
        // if(this.kill) return;
        super.draw();
    }
}

let bulletbill = [new BulletBill(2080,32)]
