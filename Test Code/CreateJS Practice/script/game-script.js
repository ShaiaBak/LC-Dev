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
  stage = new createjs.Stage("myCanvas");
  screen_height = stage.canvas.height;
  screen_width = stage.canvas.width;
  manifest = [
    {src:"images/megaman.png", id:"megaman"},
    {src:"images/ChristmasBG.png", id:"background"}
  ];
  //Not completely sure what this does. I think it runs handlerComplete when
  //the files are done loading
  loader = new createjs.LoadQueue(false);
  loader.addEventListener("complete", handleComplete);
  loader.loadManifest(manifest);

}

function handleComplete() {
  document.getElementById("loader").className = "";
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
  

  StartPage.graphics.beginFill("#6C8CD5").drawRect(0,0,500,screen_height);


  var megamanSpriteSheet = new createjs.SpriteSheet({
    "images": [loader.getResult("megaman")],
    "frames": {height: 30, width: 30, regX: 15, regY: 0},
    "animations": {
      "idle": [0, 0], 
      "run": [3, 5,"run", 5/60], //Runs Left
      "duck": [7, 7]
      } 
  });
  megamanSprite = new createjs.Sprite(megamanSpriteSheet, "idle");
  
  //setTransform places megaman at x=1300, y=330, scalex=1, scaley=1
  megamanSprite.setTransform(120,250,1,1);
  megamanSprite.framerate = 60;
  stage.addChild(background, megamanSprite, box);
  stage.addChild(StartPage,StartText);
  

  
  createjs.Ticker.timingMode = createjs.Ticker.RAF;
  createjs.Ticker.addEventListener("tick", tick);
  StartText.addEventListener("click", StartButton);
 
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
    
    case KEYCODE_SPACE: {
    spacePressed = true;
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
      case KEYCODE_SPACE:{
      spacePressed = false;
      megamanSprite.gotoAndStop("duck");
      anyKeyPressed = false;
      break;
    } 

  }
}
function StartButton(event) {
  stage.removeChild(StartText,StartPage);
  stage.addChild(scoreDisplay,backgroundxDisplay,spritexDisplay);
  


  //createjs.Ticker.setFPS(40);
  
  createjs.Ticker.addEventListener("tick",scoretimer);
}

function restart() {
  stage.removeAllChildren();

}

function scoretimer(event){

  score++;

  scoreDisplay.text = "Score: "+score+" ";
  backgroundxDisplay.text = "bg: "+background.x+" ";
  spritexDisplay.text = "sprite: "+megamanSprite.x+" ";


}


function tick(event) {

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

  //Pressed the Left Arrow Key
  if (leftPressed && !rightPressed && !spacePressed){
    megamanSprite.scaleX = 1;
    
    if ((15 < megamanSprite.x && megamanSprite.x <= 200 && background.x == 0) || 
        (200 < megamanSprite.x && megamanSprite.x <= 400 && background.x == -500)){
      megamanSprite.x--;
    } 
    if (megamanSprite.x == 200 && -500 <= background.x && background.x <= 0){
      background.x++;
    }
  }
  //Pressed the Left Arrow Key
  if ( !leftPressed && rightPressed && !spacePressed ){
    //set the X scale to -1 to flip along the horizontal
    megamanSprite.scaleX = -1;
    

    //So the background will move till it hits the end.
    //after it hits the end, the sprite will move

    if ((15 <= megamanSprite.x && megamanSprite.x < 200 && background.x == 0) || 
        (200 <= megamanSprite.x && megamanSprite.x < 400 && background.x == -500)){
      megamanSprite.x++;
    } 
    if (megamanSprite.x == 200 && -500 <= background.x && background.x <= 0){
      background.x--;
    }
  }


  /////////////////////////////////////////////////////////////////////////////////////////
  // OLD CODE, LEFT IN FOR NOW


  // //Pressed the Left Arrow Key
  // if (leftPressed && !rightPressed){
  //   megamanSprite.scaleX = 1;
  //   megamanSprite.x--;

  //   //485 is 30 from the bounding box
  //   //Moves the background in the opposite direction
  //   //the ++ cancels movement, I feel like there is a better way to do this
  //   if (megamanSprite.x <= 485){
  //     megamanSprite.x++;
  //     background.x++;
  //   }
    
  // }
  // //Pressed the Left Arrow Key
  // if (!leftPressed && rightPressed){
  //   //set the X scale to -1 to flip along the horizontal
  //   megamanSprite.scaleX = -1;
  //   //megamanSprite.x++;

  //   //925 is 30 from the bounding box
  //   //if (megamanSprite.x >= 925){
  //   //  megamanSprite.x--;
  //     background.x--;
  // // }
  // }

  /////////////////////////////////////////////////////////////////////////////////////////
  if (spacePressed){
    megamanSprite.gotoAndPlay("duck");
    anykeypress = true;
  }

  // if both or neither buttons pressed, the character will stop
  if ( (!spacePressed&&!leftPressed&&!rightPressed) ){
    megamanSprite.gotoAndStop("idle");
  }

  //When an arrow key is pressed, it will play the "run" animation (which loops)
  //will remove the anykeypress flag so that the animation will be only played once
  if ((leftPressed||rightPressed) && !anyKeyPressed && !spacePressed){
    megamanSprite.gotoAndPlay("run");
    anyKeyPressed= true;
  }

  //stage.addChild(background);

  stage.update(event);
}