'use strict';
// クリボーのクラス
// const wait = (sec) => {
//     return new Promise((resolve) => {
//       setTimeout(resolve, sec*1000);
//     });
//   };
  
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
        this.kill  = false;
        this.count = 0;
    }

    // 更新処理
    update() {
        if(this.kill) return;
        // クリボーの処理
        if(this.checkHit(ojisan)) {
            // ojisan.kinoko -= 1;
            this.kill = true;
            return;
        }

        if((this.y>>4) > FIELD_SIZE_H*16) this.kill = true;
        this.checkWall();
        this.checkFloor();
        super.update();
    }

    // 描画処理
    draw() {
        if(this.kill) return;
        super.draw();
        ++this.count <= 32;
        if(this.count < 16) {
                this.sp = 96;
        }
        else if(this.count < 32) this.sp = 97;
        else if(this.count = 32) this.count = 0;

        // let px = (this.x>>4) - field.scx;
        // let py = (this.y>>4) - field.scy;
        // let an = this.sp;     // an = anime?
        // let sx = (an&15)<<4; // &はAND演算子
        // let sy = (an>>4)<<4; // >>はbit演算子

        // vcon.drawImage(chImg, sx,sy,16,16, px,py,16,16); 
    }
}

// クリボーを作る
let goomba = [
    new Goomba(400,180),
    new Goomba(580,180),
    new Goomba(800,180),
    new Goomba(900,180),
];

