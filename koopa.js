'use strict';
// ノコノコのクラス

class Koopa extends Sprite {

    constructor(x,y) {
        super(x,y);
        this.x  = x<<4;
        this.y  = y<<4
        this.sp = 162;
        this.w  = 16;
        this.h  = 32;
        this.vx = -8;
        this.vy = 0;
    }

    // 更新処理
    update() {
        if((this.x>>4) > (ojisan.x>>4)+SCREEN_SIZE_W) return;

        if(this.kill) return;
        
        if(this.checkStanp(ojisan)) {
            score.push(200);
            this.sp = 133;
            this.vx = 32;
            return;
        }
        this.checkWall();
        this.checkFloor();
        super.update();
        if(this.checkHit(ojisan)) ojisan.killDown();

        if(this.sp == 133) return;
        if(++this.count < 16) this.sp = 162;
        else if(this.count < 32) this.sp = 163;
        else if(this.count = 32) this.count = 0;
        if(this.vx > 0) this.sp -= 32;

        if(this.checkHit(Fire)) {
            this.kill = true;
            Fire.kill = true;
        }
        // if(this.checkHit(sprite)) this.vx *= -1
    }

    // 描画処理
    draw() {
        if(this.kill) return;
        super.draw();
    }
}
// クリボーを作る
let koopa = [
    new Koopa(520,170),
    new Koopa(1650,170),
    new Koopa(2080,20),
    new Koopa(2420,80),
    new Koopa(2830,170),
    new Koopa(2720,80),
];

