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
var KEYCODE_DOWN = 40;   //usefull keycode
var KEYCODE_W = 87;     //usefull keycode
var KEYCODE_A = 65;     //usefull keycode
var KEYCODE_D = 68;     //usefull keycode

var leftPressed = false;
var rightPressed = false;
var spacePressed = false;
var anyKeyPressed = false;


document.onkeydown = handleKeyDown;
document.onkeyup = handleKeyUp;

var box;
var background;
var StartPage;
var StartText;
var scoreDisplay;
var backgroundxDisplay;
var spritexDisplay;
var score = 0;
var backgroundvalue = 0;

function init() {
  // conventional initializer
  stage = new createjs.Stage("myCanvas");
  screen_height = stage.canvas.height;
  screen_width = stage.canvas.width;
  manifest = [
    // array of assest (images/music) that load with manifest
    {src:"images/megaman.png", id:"megaman"},
    {src:"images/ChristmasBG.png", id:"background"}
  ];
  //Not completely sure what this does. I think it runs handlerComplete when
  //the files are done loading
  loader = new createjs.LoadQueue(false);
  loader.addEventListener("complete", handleComplete);
  // loads the manifest
  loader.loadManifest(manifest);

}

// when game is done
function handleComplete() {
  document.getElementById("loader").className = "";
  // crates new stages and properties for assets to live on
  box = new createjs.Shape();
  background = new createjs.Shape();
  StartPage = new createjs.Shape();
  StartText = new createjs.Text("Start Button","20px Arial", "#000000");
  scoreDisplay = new createjs.Text("Score: 0", "36px Arial", "#000000");
  backgroundxDisplay = new createjs.Text("bg: 0", "20px Arial", "#FFFFFF");
  spritexDisplay = new createjs.Text("sprite: 0", "20px Arial", "#FFFFFF");
  StartText.x = 100;
  StartText.y = 270;

  scoreDisplay.x = 300;
  scoreDisplay.y = 100;
  backgroundxDisplay.x = 300;
  backgroundxDisplay.y = 150;
  spritexDisplay.x = 300;
  spritexDisplay.y = 180;

  //fill the background at 0,0 to the size of the screen
  background.graphics.beginBitmapFill(loader.getResult("background")).drawRect(0,0,1000,screen_height);

  // (1410-500)/2 = 455, just to center the box
  box.graphics.beginStroke("#ff0000").drawRect(0,0,500,screen_height);
  

  StartPage.graphics.beginFill("#6C8CD5").drawRect(0,0,250,screen_height);


  var megamanSpriteSheet = new createjs.SpriteSheet( {
    // all main strings are reserved strings (images, frames, animations) that do a specific task
    "images": [loader.getResult("megaman")],
    "frames": {height: 30, width: 30, regX: 15, regY: 0},
    "animations": {
      "idle": [0, 0],
      "run": [3, 5,"run", 5/60], //Runs Left
      "duck": [7, 7]
    }
  });
  megamanSprite = new createjs.Sprite(megamanSpriteSheet, "idle");
  
  // setTransform sets sprites x and y coordinates and scale
  megamanSprite.setTransform(120,250,1,1);
  megamanSprite.framerate = 60;
  // .addchild put everythign on the screen
  stage.addChild(background, megamanSprite, box);
  stage.addChild(StartPage,StartText);
  
  // not sure what .timingMode is
  // .Ticker adds continuous timer
  createjs.Ticker.timingMode = createjs.Ticker.RAF;
  createjs.Ticker.addEventListener("tick", stageUpdate);
  StartText.addEventListener("click", StartButton);
}

// press key down
function handleKeyDown(e) {
  //cross browser issues exist
  if(!e){ 
    var e = window.event;
  }

  switch(e.keyCode) {
    
    case KEYCODE_LEFT: {
      leftPressed = true;
      break;
    }
    case KEYCODE_RIGHT: {
      rightPressed = true;
      break;
    }
    case KEYCODE_SPACE: {
      spacePressed = true;
      break;
    }

  }
}

function handleKeyUp(e) {
  //cross browser issues exist
  if(!e){
    var e = window.event;
  }

  //gotoAndStop will play the animation once and stop
  switch(e.keyCode) {
    case KEYCODE_LEFT: {
      leftPressed = false;
      megamanSprite.gotoAndStop("run");
      anyKeyPressed = false;
      break;
    }  
    case KEYCODE_RIGHT: {
      rightPressed = false;
      megamanSprite.gotoAndStop("run");
      anyKeyPressed = false;
      break;
    } 
      case KEYCODE_SPACE: {
      spacePressed = false;
      megamanSprite.gotoAndStop("duck");
      anyKeyPressed = false;
      break;
    } 

  }
}
function StartButton(event) {
  // take out the start screen and add in the HUD
  stage.removeChild(StartText,StartPage);
  stage.addChild(scoreDisplay,backgroundxDisplay,spritexDisplay);
  


  //createjs.Ticker.setFPS(40);
  
  createjs.Ticker.addEventListener("tick",scoretimer);
}

function restart() {
  // take out EVERYTHING
  stage.removeAllChildren();

}

function scoretimer(event) {

  score++;

  scoreDisplay.text = "Score: "+score+" ";
  backgroundxDisplay.text = "bg: "+background.x+" ";
  spritexDisplay.text = "sprite: "+megamanSprite.x+" ";

}


function stageUpdate(event) {


  //When an arrow key is pressed, it will play the "run" animation (which loops)
  //will remove the anykeypress flag so that the animation will be only played once
  if ((leftPressed||rightPressed) && !anyKeyPressed && !spacePressed) {
    megamanSprite.gotoAndPlay("run");
    anyKeyPressed = true;
  }

  //****************

  //Walking logic broken down into 3 stages
  //stage 1: starting area
  //15 < character.x <= 200 && bg.x == 0
  //character moves left and right freely til he hits 200

  //stage 2: traversing area
  //character.x == 200 && -500 <= bg.x && bg.x <= 0
  //character runs on the spot and the background moves

  //stage 3
  //200 < character.x <= 400 && bg.x == -500
  //character runs freely past 200 to 400
  
  //Pressed the Left Arrow Key **********
  if (leftPressed && !rightPressed && !spacePressed) {
    // flip at regular state
    megamanSprite.scaleX = 1;
    
    if ((megamanSprite.x > 15 && megamanSprite.x <= 200 && background.x == 0) || 
    (megamanSprite.x > 200 && megamanSprite.x <= 400 && background.x == -500)) {
      megamanSprite.x--;
    } 
    if (megamanSprite.x == 200 && background.x >= -500 && background.x <= 0) {
      background.x++;
    }
  }


  //Pressed the Right Arrow Key **********
  if (!leftPressed && rightPressed && !spacePressed) {
    //set the X scale to -1 to flip along the horizontal
    megamanSprite.scaleX = -1;

    //So the background will move till it hits the end.
    if ((megamanSprite.x >= 15 && megamanSprite.x < 200 && background.x == 0) || 
    (megamanSprite.x >= 200 && megamanSprite.x < 400 && background.x == -500)) {
      megamanSprite.x++;
    } 
    if (megamanSprite.x == 200 && -500 <= background.x && background.x <= 0) {
      background.x--;
    }
  }

  // pressing space makes you go duck
  if (spacePressed) {
    megamanSprite.gotoAndPlay("duck");
    anykeypress = true;
  }

  // if both or neither buttons pressed, the character will stop moving
  if ((!spacePressed&&!leftPressed&&!rightPressed)) {
    megamanSprite.gotoAndStop("idle");
    anyKeyPressed = false;
  }

  //stage.addChild(background);

  stage.update(event);
}