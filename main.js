'use strict';

// フレームレート維持
let frameCount = 0;
let startTime;

let chImg = new Image();
chImg.src = "sprite.png";

// キーボード
let keyb = {};

// おじさんを作る
let ojisan = new Ojisan(100,180);

// フィールドを作る
let field = new Field();

let sprite = new Sprite();

// スコアをつくる
let score = [];

// ブロックのオブジェクト
let block = [];
let item  = [];
let bowserfire   = [];
let bowserfire1  = [];
let fire  = [];

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

    // ブロックとアイテムの更新
    updateObj(block);
    updateObj(item);
    updateObj(bowserfire);
    updateObj(bowserfire1);
    updateObj(fire);
    
    if(!music.start) return;
    
    // 敵を更新
    updateObj(goomba);
    updateObj(piranha);
    updateObj(bowser);
    updateObj(bulletbill);
    updateObj(koopa);
    
    if(ojisan.kinoko || ojisan.goal) return;

    // マップの更新
    field.update();
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

    // 敵を表示
    drawObj(piranha);
    drawObj(bulletbill);

    // マップを表示
    field.draw();

    // ブロックとアイテムの表示
    drawObj(block);
    drawObj(item);
    drawObj(bowserfire);
    drawObj(bowserfire1);
    drawObj(fire);
    
    // おじさんを表示
    ojisan.draw();

    // 敵を表示
    drawObj(goomba);
    drawObj(bowser);
    drawObj(koopa);

    if(!music.start) {
    // 画面にタイトルを表示
        let chara = new Image();
        chara.src="https://fontmeme.com/permalink/210217/c8a8184c38b17e42fb21ce1c220e559a.png";
        vcon.drawImage(chara, 100, 58, 120,25);

        let chara2 = new Image();
        chara2.src="https://fontmeme.com/permalink/210217/66c022225209a9b0383f5cdfccd85c2c.png";
        vcon.drawImage(chara2, 35, 90, 250,30);

        vcon.font="50px";
        vcon.fillStyle="white";
        vcon.fillText('>  はじめる', 130, 160);
    }else {
        // 画面に情報を表示
        vcon.font="16px";
        vcon.fillStyle="white";
        let time;
        let sum = 0;
        time = 200-Math.floor(frameCount/70); 
        if(time == 100) {
            let sound = new Audio('countdown.mp3');
            sound.play();
        }
        if(time == 0) location.reload();
        for(let i=0; i<score.length; i++) {
            sum += score[i];
        }

        vcon.fillText('SCORE : ' + sum, 10, 20);
        vcon.fillText('WORLD : 1-1 ', 160, 20);
        vcon.fillText('TIME : ' + time, 240, 20);
    }

    // 仮想画面から実画面へ拡大転送
    con.drawImage(vcan,0,0,SCREEN_SIZE_W,SCREEN_SIZE_H,
        0,0,SCREEN_SIZE_W *3,SCREEN_SIZE_H *3); 
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

// タッチ操作
let leftButton = document.getElementById("leftButton"); 
leftButton.src = "leftbutt.png"
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
