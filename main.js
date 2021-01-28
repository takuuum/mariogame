'use strict';

// フレームレート維持
let frameCount = 0;
let startTime;

let chImg = new Image();
chImg.src = "sprite.png";

// chImg.onload = draw;

// キーボード
let keyb = {};

// おじさんを作る
let ojisan = new Ojisan(100,180);

// フィールドを作る
let field = new Field();

// コントローラーをつくる
// let cont = new Cont();

// ブロックのオブジェクト
let block = [];
let item  = [];

function updateObj(obj) {
    // スプライトのブロックとアイテムの更新
    for(let i=obj.length-1; i>=0; i--) {
        obj[i].update();
        if(obj[i].kill) obj.splice(i,1);
    }
}

// 更新処理
function update() {

    // おじさんの更新
    ojisan.update();

    // クリボーを更新
    // goomba.update();
    updateObj(goomba);

    if(ojisan.kinoko) return;

    // マップの更新
    field.update();
    // コントローラーの更新
    // cont.update();

    // ブロックとアイテムの更新
    updateObj(block);
    updateObj(item);
}

// スプライトの描画
function drawSprite(snum,x,y) {
    let sx = (snum&15)<<4; // &はAND演算子
    let sy = (snum>>4)<<4; // >>はbit演算子
    vcon.drawImage(chImg, sx,sy,16,32, x,y,16,32); 
    // 動きに合わせたアニメーション、最初のアニメーション、マリオの位置、マリオの大きさ
}

function drawObj(obj) {
    // スプライトのブロックとアイテムの表示
    for(let i=0; i<obj.length; i++) {
        obj[i].draw();
    }
}

// 描画処理
function draw() {

    // 画面を水色でクリア
    vcon.fillStyle="#66AAFF"; //背景の色
    vcon.fillRect(0,0,SCREEN_SIZE_W,SCREEN_SIZE_H); //背景のサイズ
    // vcon1.fillStyle="white"; //背景の色
    // vcon1.fillRect(0,0,cSCREEN_SIZE_W,cSCREEN_SIZE_H); //背景のサイズ

    // マップを表示
    field.draw();
    // コントローラーを表示
    // cont.draw();

    // ブロックとアイテムの表示
    drawObj(block);
    drawObj(item);
    
    // おじさんを表示
    ojisan.draw();

    // クリボーを表示
    // goomba.draw();
    drawObj(goomba);

    // 画面に情報を表示
    vcon.font="16px";
    vcon.fillStyle="white";
    let time;
    time = Math.floor(frameCount/70); 
    vcon.fillText('TIME : ' + time, 10, 20);

    // 仮想画面から実画面へ拡大転送
    con.drawImage(vcan,0,0,SCREEN_SIZE_W,SCREEN_SIZE_H,
        0,0,SCREEN_SIZE_W *3,SCREEN_SIZE_H *3); 
    // con1.drawImage(vcan1,0,0,SCREEN_SIZE_W,cSCREEN_SIZE_H,
    //     0,0,cSCREEN_SIZE_W*3 ,cSCREEN_SIZE_H *3); 

    // コントローラーの描画処理
    // con1.drawImage(chImg2,57,250,1000,800,0,0,1400,1000);


}

// setInterval(mainLoop, 1000/60); 1000ms = 1s

// ループ開始
window.onload = function() {
    startTime = performance.now(); //今、何msなのかが分かる
    mainLoop();

}

// メインループ
function mainLoop() {
    let nowTime = performance.now(); //今、何msなのかが分かる
    let nowFrame = (nowTime - startTime) / GAME_FPS; //1秒後であれば(nowTime-startTime)は1000になるはず
    if(nowFrame > frameCount) {
        let c = 0;
        while(nowFrame > frameCount) {
            frameCount ++;
            // 更新処理
            update();
            if(++c >= 4)break;
        }
        // 描画処理
        draw();
        }
    requestAnimationFrame(mainLoop);
}

// キーボードが押された時に時に呼ばれる
document.onkeydown = function(e) {
    if(e.keyCode == 37) keyb.Left    = true;
    if(e.keyCode == 39) keyb.Right   = true;
    if(e.keyCode == 90) keyb.BBUTTON = true;
    if(e.keyCode == 88) keyb.ABUTTON = true;

    // if(e.keyCode == 65) {
    //     block.push(new Block(368,5,5));
    // }
    if(e.keyCode == 65) field.scx--; //65=「A」
    if(e.keyCode == 83) field.scx++; //83=「S」
}

// キーボードが離れた時に時に呼ばれる
document.onkeyup = function(e) {
    if(e.keyCode == 37) keyb.Left    = false; //37=「←」
    if(e.keyCode == 39) keyb.Right   = false; //39=「→」
    if(e.keyCode == 90) keyb.BBUTTON = false; //90=「Z」
    if(e.keyCode == 88) keyb.ABUTTON = false; //88=「X」
}
let leftButton = document.getElementById("leftButton"); 
leftButton.addEventListener("touchstart", touchLeft);
leftButton.addEventListener("touchend", touchLeft);
    function touchLeft(e) {
        if(e.type == 'touchstart') keyb.Left  = true;
        if(e.type == 'touchend')   keyb.Left  = false;
    }
let rightButton = document.getElementById("rightButton"); 
rightButton.addEventListener("touchstart", touchRight);
rightButton.addEventListener("touchend", touchRight);
    function touchRight(e) {
        if(e.type == 'touchstart') keyb.Right = true;
        if(e.type == 'touchend')   keyb.Right = false;
    }
let aButton = document.getElementById("aButton"); 
aButton.addEventListener("touchstart", touchA);
aButton.addEventListener("touchend", touchA);
    function touchA(e) {
        if(e.type == 'touchstart') keyb.ABUTTON = true;
        if(e.type == 'touchend')   keyb.ABUTTON = false;
    }
