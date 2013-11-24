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
  //Not completely sure what this does. I think it runs handlerComplete when
  //the files are done loading
  loader = new createjs.LoadQueue(false);
  loader.addEventListener("complete", handleComplete);
  loader.loadManifest(manifest);

}

function handleComplete() {
  document.getElementById("loader").className = "";
  
  background = new createjs.Shape();
  //fill the background at 0,0 to the size of the screen
  background.graphics.beginBitmapFill(loader.getResult("background")).drawRect(0,0,screen_width,screen_height);
  box = new createjs.Shape();
  // (1410-500)/2 = 455, just to center the box
  box.graphics.beginStroke("#ff0000").drawRect(455,0,500,screen_height);


  var megamanSpriteSheet = new createjs.SpriteSheet({
    "images": [loader.getResult("megaman")],
    "frames": {height: 30, width: 30, regX: 15, regY: 0},
    "animations": {
      "idle": [0, 0], 
      "run": [3, 5,"run", 5/60]} //Runs Left
  });
  megamanSprite = new createjs.Sprite(megamanSpriteSheet, "idle");
  //setTransform places megaman at x=1300, y=330, scalex=1, scalex=2
  megamanSprite.setTransform(600,330,1,1);
  megamanSprite.framerate = 60;
  stage.addChild(background, megamanSprite, box);

  
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
  //gotoAndStop will play the animation once and stop
  switch(e.keyCode) {
    case KEYCODE_LEFT:{
      leftPressed = false;
      megamanSprite.gotoAndStop("run");
      anyKeyPressed = false;
      break;
    }  
    case KEYCODE_RIGHT:{
      rightPressed = false;
      megamanSprite.gotoAndStop("run");
      anyKeyPressed = false;
      break;
    } 
  }
}


function tick(event) {
  //Pressed the Left Arrow Key
  if (leftPressed && !rightPressed){
    megamanSprite.scaleX = 1;
    megamanSprite.x--;

    //485 is 30 from the bounding box
    //Moves the background in the opposite direction
    //the ++ cancels movement, I feel like there is a better way to do this
    if (megamanSprite.x <= 485){
      megamanSprite.x++;
      background.x++;
    }
    
  }
  //Pressed the Left Arrow Key
  if (!leftPressed && rightPressed){
    //set the X scale to -1 to flip along the horizontal
    megamanSprite.scaleX = -1;
    megamanSprite.x++;
    
    //925 is 30 from the bounding box
    if (megamanSprite.x >= 925){
      megamanSprite.x--;
      background.x--;
    }
  }


  if (!leftPressed && !rightPressed){
    megamanSprite.gotoAndStop("idle");
  }

  //When an arrow key is pressed, it will play the "run" animation (which loops)
  //will remove the anykeypress flag so that the animation will be only played once
  if ((leftPressed||rightPressed) && !anyKeyPressed){
    megamanSprite.gotoAndPlay("run");
    anyKeyPressed= true;
  }





  stage.update(event);
}