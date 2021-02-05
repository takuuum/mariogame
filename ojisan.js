'use strict';

// おじさんクラス

class Ojisan {
    constructor(x,y) {
        this.x      = x<<4;
        this.y      = y<<4;
        this.ay     = 16;
        this.w      = 16;
        this.h      = 16;
        this.vx     = 0;
        this.vy     = 0;
        this.anime  = 0;
        this.snum   = 0;
        this.acount = 0;
        this.dirc   = 0;
        this.jump   = 0;
        this.down   = 0;
        this.count  = 0;
        this.small = 0;

        this.kinoko = 0;
        this.fire   = 0;
        this.type   = TYPE_MINI;
    }

    // ランダムに数をだす(checkCielで記載)
    getRandomlnt(max) {
        return Math.floor(Math.random()*Math.floor(max));
    }

    // 床の判定
    checkFloor() {
        if(this.vy <= 0) return;

        let lx = ((this.x+this.vx)>>4);
        let ly = ((this.y+this.vy)>>4);
        let p = this.type == TYPE_MINI?2:0;

        if(field.isBlock(lx+ 1+p,ly+31) || 
           field.isBlock(lx+14-p,ly+31)) {
            if(this.anime == ANIME_JUMP) this.anime = ANIME_WALK;
            this.jump = 0;
            this.vy   = 0;
            this.y    = ((((ly+31)>>4)<<4)-32)<<4;
        } 
    }

    // 天井の判定
    checkCeil() {
        if(this.vy >= 0) return;

        let lx = ((this.x+this.vx)>>4);
        let ly = ((this.y+this.vy)>>4);
        let ly2 = ly + (this.type == TYPE_MINI?21:5);

        let bl;
        if(bl = field.isBlock(lx+8,ly2)) { 
            if(this.anime == ANIME_JUMP) this.anime = ANIME_WALK;
            this.jump =15;
            this.vy   = 0;

            let x = (lx+8)>>4;
            let y =  (ly2)>>4;
            // console.log(lx,x,y);

            if(bl == 368) {
                block.push(new Block(374,x,y)); // ボヨヨンの動作
                if(this.getRandomlnt(3) == 0) {
                    switch(this.type) {
                        case TYPE_MINI:
                            item.push(new Item(218,x,y,0,0,ITEM_KINOKO));
                            break;
                        case TYPE_BIG:
                            item.push(new Item(250,x,y,0,0,ITEM_FIRE))
                            break;
                        case TYPE_FIRE:
                            item.push(new Item(486,x,y,0,0,ITEM_KUSA));  
                            break;
                    }
                }else item.push(new Item(384,x,y,0,0,ITEM_COIN));
                

            } else if(bl != 374 && this.type == TYPE_MINI) {
                block.push(new Block(bl,x,y)); // ボヨヨンの動作
            } else if(bl != 374) {
                block.push(new Block(bl,x,y,1, 20,-60)); // ボヨヨン,壊れるの動作
                block.push(new Block(bl,x,y,1,-20,-60)); // ボヨヨン,壊れるの動作
                block.push(new Block(bl,x,y,1, 20,-20)); // ボヨヨン,壊れるの動作
                block.push(new Block(bl,x,y,1,-20,-20)); // ボヨヨン,壊れるの動作
            }
        }
    }

    // 横の壁の判定
    checkWall() {
    
        let lx = ((this.x+this.vx)>>4);
        let ly = ((this.y+this.vy)>>4);

        let p = this.type == TYPE_MINI?16+8:16;

        // 右側のチェック
        if(field.isBlock(lx+15,ly+ p) || 
          (this.type == (TYPE_BIG && TYPE_FIRE) && (
           field.isBlock(lx+15,ly+15) || 
           field.isBlock(lx+15,ly+24))) ) {
                this.vx   = 0;
                this.x   -=16;
        // 左側のチェック
        }else if(field.isBlock(lx ,ly+ p) || 
                (this.type == (TYPE_BIG && TYPE_FIRE) && (
                 field.isBlock(lx ,ly+15) || 
                 field.isBlock(lx ,ly+24))) ) {
                    this.vx   = 0;
                    this.x   +=16;
        }
    }

    // ジャンプ処理
    updateJump() {
        // ジャンプ
        if(keyb.ABUTTON) {
            if(!this.jump) {
                this.anime = ANIME_JUMP;
                this.jump  = 1;
                this.vy    = -64;
            }
            if(this.jump < 15) this.vy = -(64 - this.jump); //大ジャンブ
        }
        if(this.jump) this.jump++; // 0以外であれば実行
    }

    // 死ぬ時の処理
    killDown() {
        switch(this.type) {
            case TYPE_MINI:
                this.down = 1;
                this.anime = ANIME_KILL;
                this.vx   = 0;
                this.vy = -72;
                break;
            case TYPE_BIG:
                this.count = 1;
                this.down  = 2;
                break;
            case TYPE_FIRE:
                this.count = 1;
                this.down  = 4;
                break;
        }
        return;
    }

    // 横方向の移動
    updateWalkSub(dir) {

        // 最高速まで加速
        if      (dir == 0 && this.vx <   MAX_SPEED) this.vx ++;
        else if (dir == 1 && this.vx >  -MAX_SPEED) this.vx --;

        // ジャンプしてない時
        if(!this.jump && !this.down) {
            // ダッシュの時の加速
            if(keyb.BBUTTON && dir == 0 && this.vx <  DASH_SPEED) {
                this.vx ++;
                if(this.vx >  MAX_SPEED) this.vx ++;
            }
            else if(keyb.BBUTTON && dir == 1 && this.vx > -DASH_SPEED) {
                this.vx --;
                if(this.vx < -MAX_SPEED) this.vx --;
            }
            // 立ちポーズだった時はカウントリセット
            if(this.anime == ANIME_STAND) this.acount = 0;
            // アニメを歩きアニメにする
            this.anime = ANIME_WALK;
            if(keyb.BBUTTON) this.anime = ANIME_DASH;
            // 方向を設定
            this.dirc  = dir;
            // 逆方向の時はブレーキをかける
            if(dir == 0 && this.vx < 0) this.vx ++;
            if(dir == 1 && this.vx > 0) this.vx --;
            // ダッシュをやめたときに速度を下げる
            if(!keyb.BBUTTON && this.vx < -MAX_SPEED) this.vx ++;
            if(!keyb.BBUTTON && this.vx >  MAX_SPEED) this.vx --;
            // 逆に強い加速の時はブレーキアニメ
            if(dir == 0 && this.vx < -8 || 
                dir == 1 && this.vx > 8) {
                this.anime = ANIME_BRAKE;
            }
            // console.log(this.vx,this.acount);
        }
    }

    // 歩く処理
    updateWalk() {
        // おじさんの横移動
        if(keyb.Right) {
            this.updateWalkSub(0);
        } else if(keyb.Left)  {
            this.updateWalkSub(1);
        } else if(!this.jump && !this.down) {
                if(this.vx > 0) this.vx --;
                if(this.vx < 0) this.vx ++;
                if(!this.vx) this.anime = ANIME_STAND;
        }
    }
    

    // スプライトを変える処理
    updateAnime() {
        // スプライトの決定
        switch(this.anime) {
            case ANIME_STAND:
                this.snum = 0;
                break;
            case ANIME_WALK:
                this.snum = 2 + ((this.acount/6) %3);
                break;
            case ANIME_JUMP:
                this.snum = 6;
                break;
            case ANIME_BRAKE:
                this.snum = 5;
                break;
            case ANIME_DASH:
                this.snum = 2 + ((this.acount/3) %3);
                break;
            case ANIME_KILL:
                this.snum = 14;
        }
        // ちっちゃいおじさんの時は+32
        if(this.type == TYPE_MINI) this.snum += 32;
        // ファイヤーおじさんの時は+256
        if(this.type == TYPE_FIRE) this.snum += 256;
        // 左向きの時は＋48を使う
        if(this.dirc) this.snum += 48;
    }
    
    // 毎フレームごと更新処理
    update() {
        // キノコを取った時のエフェクト
        if(this.kinoko) {
            let anime = [32,14,32,14,32,14,0,32,14,0];
            this.snum = anime[this.kinoko>>2];
            this.h    = this.snum==32?16 : 32;
            if(this.dirc) this.snum += 48;

            if(++this.kinoko == 40) {
                this.type = TYPE_BIG;
                this.ay   = 0;
                this.kinoko = 0; //40=anime.length<<4
            }
            return;
        }
        if(this.fire) {
            let anime = [0,14,0,270,0,270,270,258,270,258];
            this.snum = anime[this.fire>>2];
            this.h    = this.snum==32?16 : 32;
            if(this.dirc) this.snum += 48;

            if(++this.fire == 40) {
                this.type = TYPE_FIRE;
                this.ay   = 0;
                this.fire = 0; //40=anime.length<<4
            }
            return;
        }
        
        // アニメ用のカウンタ
        this.acount ++;
        if(Math.abs(this.vx) == MAX_SPEED) this.acount ++;

        this.updateJump();
        this.updateWalk();
        this.updateAnime();

        // 重力
        if(this.vy < 64) this.vy += GRAVITY;

        
        if(this.anime != ANIME_KILL) {
            // 床のチェック
            this.checkFloor();
            // 横の壁のチェック
            this.checkWall();
            // 天井のチェック
            this.checkCeil();

            // 実際にx座標を変えている
            this.x += this.vx;
        }

        // 実際にy座標を変えている
        this.y += this.vy;
        // 敵に当たった時のエフェクト
        if(this.down == 2) {
            ++this.count <= 48;
            let anime = [0,14,0,14,0,14,0,14,32,0.14,32];
            this.snum = anime[this.count>>2];
            this.h    = this.snum==32?16 : 32;
            if(this.dirc) this.snum += 48;
            if(this.count == 48) {
                this.type = TYPE_MINI;
                this.ay   = 16;
                this.h    = 16;
                this.count = 0;
                this.down = 0;
            }
            return;
        }
        if(this.down == 4) {
            ++this.count <= 48;
            let anime = [258,270,258,270,258,270,258,270,0,258,14,0];
            this.snum = anime[this.count>>2];
            this.h    = this.snum==32?16 : 32;
            if(this.dirc) this.snum += 48;
            if(this.count == 48) {
                this.type = TYPE_BIG;
                // this.ay   = 0;
                // this.h    = 32;
                this.count = 0;
                this.down = 0;
            }
            return;
        }

        // 下に落ちたらリロード
        if(this.y >= 500<<4) location.reload();
    }

    // 毎フレームごと描画処理
    draw() {

        let px = (this.x>>4) - field.scx;
        let py = (this.y>>4) - field.scy;
        let sx = (this.snum&15)<<4; // &はAND演算子
        let sy = (this.snum>>4)<<4; // >>はbit演算子

        let w  = this.w;
        let h  = this.h;

        py += (32-h);

        vcon.drawImage(chImg, sx,sy,w,h, px,py,w,h); 
        // 動きに合わせたアニメーション、最初のアニメーション、マリオの位置、マリオの大きさ
    }
}