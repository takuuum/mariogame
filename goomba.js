'use strict';
// クリボーのクラス
// const wait = (sec) => {
//     return new Promise((resolve) => {
//       setTimeout(resolve, sec*1000);
//     });
//   };
// let sprite = new Sprite;
// class Goomba extends Sprite {
class Goomba extends Sprite {

    constructor(x,y) {
        super(x,y);
        this.x  = x<<4;
        this.y  = y<<4
        this.sp = 96;
        this.w  = 16;
        this.h  = 16;
        this.vx = -7;
        this.vy = 0;
    }

    // 更新処理
    update() {
        if((this.x>>4) > (ojisan.x>>4)+SCREEN_SIZE_W) return;

        if(this.checkStanp(ojisan)) {
            this.vx = 0;
            ++this.killcount <=8;
            if(this.killcount < 8) this.sp = 98;
            else this.kill = true; 
            return
        }
        if(this.kill) return;

        // checkStanpが出た時にcheckHitは無効にしたい

        if(++this.count < 16) this.sp = 96;
        else if(this.count < 32) this.sp = 97;
        else if(this.count = 32) this.count = 0;
        if(this.checkHit(ojisan)) ojisan.killDown();
        this.checkWall();
        this.checkFloor();
        super.update();
        // if(this.checkHit(sprite)) this.vx *= -1
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
    new Goomba(2570,170),
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

