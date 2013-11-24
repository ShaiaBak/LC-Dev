var stage;
var canvas;
var screen_width;
var screen_height;
var bmpAnimation;
var megaman;
var megamanSprite;

var KEYCODE_ENTER = 13;   //usefull keycode
var KEYCODE_SPACE = 32;   //usefull keycode
var KEYCODE_UP = 38;    //usefull keycode
var KEYCODE_LEFT = 37;    //usefull keycode
var KEYCODE_RIGHT = 39;   //usefull keycode
var KEYCODE_W = 87;     //usefull keycode
var KEYCODE_A = 65;     //usefull keycode
var KEYCODE_D = 68;     //usefull keycode

var leftPressed = false;
var rightPressed = false;

var anyKeyPressed = false;


document.onkeydown = handleKeyDown;
document.onkeyup = handleKeyUp;




function init() {
  stage = new createjs.Stage("myCanvas");
  screen_height = stage.canvas.height;
  screen_width = stage.canvas.width;
  manifest = [
    {src:"images/megaman.png", id:"megaman"},
    {src:"images/charabg.png", id:"background"}
  ];
  
  loader = new createjs.LoadQueue(false);
  loader.addEventListener("complete", handleComplete);
  loader.loadManifest(manifest);

}

function handleComplete() {
  document.getElementById("loader").className = "";
  
  background = new createjs.Shape();
  background.graphics.beginBitmapFill(loader.getResult("background")).drawRect(0,0,screen_width,screen_height);

  var megamanSpriteSheet = new createjs.SpriteSheet({
    "images": [loader.getResult("megaman")],
    "frames": {height: 30, width: 30, regX: 0, regY: 0},
    "animations": {
      "idle": [0, 0], 
      "runLeft": [3, 5,"runLeft", 5/60]}
  });

  createjs.SpriteSheet
  megamanSprite = new createjs.Sprite(megamanSpriteSheet, "idle");

  megamanSprite.setTransform(1300,330,1,1);
  megamanSprite.framerate = 60;
  stage.addChild(background, megamanSprite);

  
  createjs.Ticker.timingMode = createjs.Ticker.RAF;
  createjs.Ticker.addEventListener("tick", tick);
 
  

 

}

function handleKeyDown(e) {
  //cross browser issues exist
  if(!e){ var e = window.event; }
  switch(e.keyCode) {
    
    case KEYCODE_LEFT: {
    leftPressed = true;
    return false;
    }
    case KEYCODE_RIGHT: {
    rightPressed = true;
    return false;
    }
  }
}

function handleKeyUp(e) {
  //cross browser issues exist
  if(!e){ var e = window.event; }
  switch(e.keyCode) {
    case KEYCODE_LEFT:{
      leftPressed = false;
      megamanSprite.gotoAndStop("runLeft");
      anyKeyPressed = false;

      break;
    }  
    case KEYCODE_RIGHT:{
      rightPressed = false;
      break;
    } 
  }
}


function tick(event) {
  
  if (leftPressed && !rightPressed){
    megamanSprite.x--
  }

  if (!leftPressed && !rightPressed){
    megamanSprite.gotoAndStop("idle");
  }

  if (leftPressed && anyKeyPressed==false){
   megamanSprite.gotoAndPlay("runLeft");
   anyKeyPressed= true;
  }
  


  stage.update(event);
}