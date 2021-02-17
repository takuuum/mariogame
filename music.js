'use strict';
// https://techacademy.jp/magazine/21240 を参考に記述

let music = new Audio();
  function getRandomlnt(max) {
    return Math.floor(Math.random()*Math.floor(max));
  }
  function init() {
    music.preload = "auto";
    switch(getRandomlnt(3)) {
      case 0: 
        music.src = "WorldMario.mp3";
        break;
      case 1: 
        music.src = "NewMario.mp3";
        break;
      case 2: 
        music.src = "SuperMario.mp3";
        break;
    } 
    music.volume = 0.6;
    music.load();

    music.addEventListener("ended", function () {
      music.currentTime = 0;
      music.play();
    }, false);
  }

  function play() {
    music.loop = true;
    music.play();
    music.start = true;
  }

//   function stop() {
//     music.pause();
//     music.currentTime = 0;
//   }

init();
