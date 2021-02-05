'use strict';
// キノコとかアイテムとかのクラス

class Item extends Sprite {

    constructor(sp,x,y,vx,vy,tp) {
        super(sp,x,y,vx,vy);
        if(tp == undefined) tp = ITEM_KINOKO;
        this.tp = tp;
    }

    // キノコの処理
    proc_kinoko() {
        if(this.checkHit(ojisan)) {
            ojisan.kinoko = 1;
            this.kill = true;
            return true;
        }

        if(++this.count <= 32) {
            this.sz = (1+this.count)>>1; // sz = size
            this.y -= 1<<3; //キノコが出てくるアニメーション
            if(this.count == 32) this.vx = 20;
            return true;
        }
        return false;
    }
    
    proc_fire() {
        if(this.checkHit(ojisan)) {
            ojisan.fire = 1;
            this.kill = true;
            return true;
        }
        if(++this.count <= 32) {
            this.sz = (1+this.count)>>1; // sz = size
            this.y -= 1<<3; //キノコが出てくるアニメーション
            // if(this.count == 32) this.vx = 20;
            return true;
        }
        return false;
    }

    // 草の処理
    proc_kusa() {
        if(this.y > 0) {
            this.count++;
            if(this.count < 16) this.sz = this.count;
            else this.sz = 16
            this.y -= 1<<4;
        }
        return false;
    }

    // コインの処理
    proc_coin() {
        if(++this.count <= 28) {
            // コインの移動
            this.snum = 2 + ((this.acount/6) %3);
            this.y -= 1<<6;
            if(this.count >= 16) this.y += 2<<6;
            if(this.count == 28) this.kill = true;
        }
    }

    // 更新処理
    update() {
        if(this.kill) return;
        // if(ojisan.kinoko) return;

        switch(this.tp) {
            case ITEM_KINOKO:
                if(this.proc_kinoko()) return;
                break;
            case ITEM_KUSA:
                this.proc_kusa();
                return;
            case ITEM_COIN:
                this.proc_coin();
                return;
            case ITEM_FIRE:
                this.proc_fire();
                return;
        }

        this.checkWall();
        this.checkFloor();
        super.update();
    }

    // 描画処理
    draw() {
        super.draw();
        // 草の描画処理
        if(this.tp == ITEM_KUSA) {
            let c  = (this.count-16)>>4; // 草をいくつ描く必要があるか
            for(let i=0; i<=c; i++) {
                let an = 486+16;     // an = anime?
                let sx = (an&15)<<4; // &はAND演算子
                let sy = (an>>4)<<4; // >>はbit演算子
                let px = (this.x>>4) - (field.scx);
                let py = (this.y>>4) - (field.scy);

                let s
                s = 16
                if(i==c) s=(this.count%16);
                else s=16;
                py += 16+(i<<4);
                vcon.drawImage(chImg, sx,sy,16,s, px,py,16,s); // どこを移すか、位置
            }
        }
    }
}