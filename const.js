'use strict';

// 定数の定義用のJS

const GAME_FPS  = 1000/60; //FPS
// let container = document.getElementById('canvas-container');
// const SCREEN_SIZE_W = container.clientWidth; //画面サイズ横
// const SCREEN_SIZE_H = container.clientHeight;//画面サイズ縦

const SCREEN_SIZE_W = 320; //画面サイズ横
const SCREEN_SIZE_H = 224; //画面サイズ縦
// const cSCREEN_SIZE_W = 320; //画面サイズ横
// const cSCREEN_SIZE_H = 160; //画面サイズ縦
// const SCREEN_SIZE_W = 256; //画面サイズ横
// const SCREEN_SIZE_H = 224; //画面サイズ縦

//裏画面
let vcan = document.createElement('canvas'); 
let vcon = vcan.getContext('2d');

//実画面
let can = document.getElementById('can'); 
let con = can.getContext('2d');

//画面サイズ変更
vcan.width = SCREEN_SIZE_W;
vcan.height = SCREEN_SIZE_H;

can.width = SCREEN_SIZE_W *3;
can.height = SCREEN_SIZE_H *3;

//画質よくする
con.mozimageSmoothingEnabled    = false;
con.msimageSmoothingEnabled     = false;
con.webkitimageSmoothingEnabled = false;
con.imageSmoothingEnabled       = false;

// マップデータのブロックの数
const FIELD_SIZE_W = 256;
const FIELD_SIZE_H = 14;
// const CONT_SIZE_W  = 44;
// const CONT_SIZE_H  = 18;

// １画面当たりのブロックの数
const MAP_SIZE_W   = SCREEN_SIZE_W/16;
const MAP_SIZE_H   = SCREEN_SIZE_H/16;

const TimeCount    = 0;
const ANIME_STAND = 1;
const ANIME_WALK  = 2;
const ANIME_BRAKE = 4;
const ANIME_JUMP  = 8;
const ANIME_DASH  = 16;
const ANIME_KILL  = 32;
const ANIME_GOAL  = 64;
const GRAVITY     = 4;
const MAX_SPEED   = 32;
const DASH_SPEED  = 40;
const TYPE_MINI   = 1;
const TYPE_BIG    = 2;
const TYPE_FIRE   = 4;
const ITEM_KINOKO = 1;
const ITEM_KUSA   = 2;
const ITEM_COIN   = 4;
const ITEM_STAR   = 8;
const ITEM_FIRE   = 16;


// スプライトの基本クラス
class Sprite {
    constructor(sp,x,y,vx,vy) {
        this.sp = sp;
        this.x  = x<<8;
        this.y  = y<<8;
        this.ay = 0; //当たり判定用の高さ調節
        this.w  = 16;
        this.h  = 16;
        this.vx = vx;
        this.vy = vy;
        this.sz = 0;
        this.kill  = false;
        this.count = 0;
        this.killcount = 0;
    }

    // 床の判定
    checkFloor() {
        if(this.sp == 98 || this.vy <= 0) return;

        let lx = ((this.x+this.vx)>>4);
        let ly = ((this.y+this.vy)>>4);

        if(field.isBlock(lx+1,ly+15) || field.isBlock(lx+14,ly+15)) {
            this.vy   = 0;
            this.y    = ((((ly+15)>>4)<<4)-16)<<4;
        }
    }

    // 横の壁の判定
    checkWall() {

        let lx = ((this.x+this.vx)>>4);
        let ly = ((this.y+this.vy)>>4);

        // 右左のチェック
        if(field.isBlock(lx+15,ly+ 3) || field.isBlock(lx+15,ly+12) || //右側
        field.isBlock(lx   ,ly+ 3) || field.isBlock(lx   ,ly+12)) { //左側
                this.vx *= -1;
        }
    }
    
    // 当たり判定
    checkHit(obj) {
        if(ojisan.down) return;
        // 物体1アイテム
        let left1   = (this.x>>4)    +2; //2
        let right1  = left1 + this.w -4; //2
        let top1    = (this.y>>4)    +5 + this.ay; //5
        let bottom1 = top1 + this.h  -7; //2
        // 物体2おじさん
        let left2   = (obj.x>>4)    +2; //2
        let right2  = left2 + obj.w -4; //2
        let top2    = (obj.y>>4)    +4 + obj.ay; //5
        let bottom2 = top2 + obj.h  -2; //2

        return(
            left1   <= right2 && 
            right1  >= left2  && 
            top1    <= bottom2 &&
            bottom1 >= top2
        );
    }

    // 踏めたか判定
    checkStanp(obj) {
        if(ojisan.down) return;
        // 物体1クリボー
        let left1   = (this.x>>4)    +3; //3
        let right1  = left1 + this.w -6; //3
        let top1    = (this.y>>4)    +4+ this.ay; //4
        let bottom1 = top1 + this.h  -6; //2
        // 物体2おじさん
        let left2   = (obj.x>>4)    +3; //3
        let right2  = left2 + obj.w -6; //3
        let top2    = (obj.y>>4)    +6 + obj.ay; //6
        let bottom2 = top2 + obj.h  -3; //3

        return(
            left1   <= right2 && 
            right1  >= left2  && 
            top1    <= bottom2 &&
            bottom1 >= top2
        );
    }

    // 更新処理
    update() {
        if(this.vy < 64) this.vy += GRAVITY;
        this.x += this.vx;
        this.y += this.vy;

        if((this.y>>4) > FIELD_SIZE_H*16) this.kill = true;
    }

    // 描画処理
    draw() { // s=size, p=pixel?
        let an = this.sp; // an=anime?, sp=sprite?
        let sx = (an&15)<<4; // &はAND演算子
        let sy = (an>>4)<<4; // >>はbit演算子
        let px = (this.x>>4) - (field.scx); 
        let py = (this.y>>4) - (field.scy);

        let w  = this.w;
        let h  = this.h;

        py -= (h-16);
        if(this.sz) h = this.sz;
        vcon.drawImage(chImg, sx,sy,w,h, px,py,w,h); // どこを移すか、位置
    }
}
