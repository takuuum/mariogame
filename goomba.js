'use strict';
// クリボーのクラス

class Goomba extends Sprite {

    constructor(x,y) {
        super(x,y);
        this.x  = x<<4;
        this.y  = y<<4
        this.sp = 96;
        this.w  = 16;
        this.h  = 16;
        this.vx = -8;
        this.vy = 0;
    }

    // 更新処理
    update() {
        if((this.x>>4) > (ojisan.x>>4)+SCREEN_SIZE_W) return;
        // return;

        if(this.checkStanp(ojisan)) {
            this.vx = 0;
            ++this.killcount <=8;
            if(this.killcount < 8) this.sp = 98;
            else {
                score.push(100);
                let sound = new Audio('kill.mp3');
                sound.play();
                sound.volume = 0.5;
                this.kill = true; 
            }
            return
        }
        if(this.kill) return;

        // checkStanpが出た時にcheckHitは無効にしたい

        if(++this.count < 16) this.sp = 96;
        else if(this.count < 32) this.sp = 97;
        else if(this.count = 32) this.count = 0;
        if(this.checkHit(ojisan)) ojisan.killDown();
        if(this.checkHit(Fire)) {
            this.kill = true;
            Fire.kill = true;
        }
        this.checkWall();
        this.checkFloor();
        super.update();
    }

    // 描画処理
    draw() {
        if(this.kill) return;
        super.draw();
    }
}
// クリボーを作る
let goomba = [
    new Goomba(400,170),
    new Goomba(580,170),
    new Goomba(800,170),
    new Goomba(880,170),
    new Goomba(1260,86),
    new Goomba(1380,22),
    new Goomba(1800,170),
    new Goomba(2100,170),
    new Goomba(2310,170),
    new Goomba(2720,80),
    new Goomba(3030,170),
    new Goomba(3040,170),
    new Goomba(3050,170),
    new Goomba(3060,170),
    new Goomba(3070,170),
    new Goomba(3080,170),
    new Goomba(3090,170),
    new Goomba(3100,170),
    new Goomba(3110,170),
    new Goomba(3120,170),
    new Goomba(3130,170),
];
