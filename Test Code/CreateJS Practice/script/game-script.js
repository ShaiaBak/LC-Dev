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
var KEYCODE_S = 83;     //useful keycode
var KEYCODE_D = 68;     //usefull keycode

var leftPressed = false;
var rightPressed = false;
var spacePressed = false;
var anyKeyPressed = false;


document.onkeydown = handleKeyDown;
document.onkeyup = handleKeyUp;

var background;
var startPage;
var startText;
var scoreDisplay;
var backgroundxDisplay;
var spritexDisplay;
var score = 0;
var backgroundvalue = 0;
var loadProgressLabel;
var endCardPhotoStatus = false;
var endCardPhotoCount = 0;
var endCardGiftStatus = false;
function init() {
  // conventional initializer
  stage = new createjs.Stage("myCanvas");
  screen_height = stage.canvas.height;
  screen_width = stage.canvas.width;

  loadingInitialize();

  manifest = [
    // array of assest (images/music) that load with manifest
    {src:"images/megaman.png", id:"megaman"},
    {src:"images/ChristmasBG.png", id:"background"},
    {src:"assests/Test.mp3", id:"music"}
  ];


  //Not completely sure what this does. I think it runs handlerComplete when
  //the files are done loading
  loader = new createjs.LoadQueue(false);
  loader.installPlugin(createjs.Sound);
  loader.addEventListener("complete", handleComplete);
  loader.addEventListener("progress", handleProgress);
  // loads the manifest
  loader.loadManifest(manifest);
  stage.update();
}

//this function is called everytime the progress of our loading changes
function handleProgress() {
  loadingBar.scaleX = loader.progress * 300;
  progressPercentage = Math.round(loader.progress*100);
  loadProgressLabel.text = progressPercentage +"% Loaded";
  stage.update();
}

//called when everything is loaded 
function handleComplete() {
  // the canvas is now clickable and will run loadingScreenClick

 stage.addEventListener("click", loadingScreenClick);
}

//Creates everything related to the loading screen
function loadingInitialize() {
  
  //define loading screen graphics
  loadProgressLabel = new createjs.Text("","20px Arial","black");
  loadingScreenFill = new createjs.Shape();
  loadingBar = new createjs.Shape();
  loadingBarFrame = new createjs.Shape();
  loadingBarContainer = new createjs.Container();
  loadingBarHeight = 20;
  loadingBarWidth = 300;

  loadProgressLabel.lineWidth = 200;
  loadProgressLabel.textAlign = "center";
  loadProgressLabel.x = screen_width/2;
  loadProgressLabel.y = screen_height/2;

  //Fill background with gray
  loadingScreenFill.graphics.beginFill("#B0B0B0").drawRect(0,0,screen_width,screen_height).endFill();

  //Create the progression part of the loading screen
  loadingBar.graphics.beginFill("#000000").drawRect(0,0,1,20).endFill();
  
  //Creates a frame around the loading bar. Used 3 as a padding value
  //the frame is 3px larger and is offset by 1.5
  loadingBarFrame.graphics.setStrokeStyle(1).beginStroke("#000000").drawRect(-3/2, -3/2, loadingBarWidth+3, loadingBarHeight+3).endStroke();
  
  //Combine the frame and the bar into 1 object
  loadingBarContainer.addChild(loadingBar, loadingBarFrame);
  
  //center the loading bar
  loadingBarContainer.x = screen_width/2 - loadingBarWidth/2;
  loadingBarContainer.y = screen_height/2 + 50;

  stage.addChild(loadingScreenFill, loadProgressLabel, loadingBarContainer);

}

// When the canvas is clicked, build the game
function loadingScreenClick() {
  
  //create the game
  startScreen();

  //remove the loading screen page and click function
  stage.removeChild(loadProgressLabel, loadingBarContainer, loadingScreenFill);
  stage.removeEventListener("click", loadingScreenClick);
}

function startScreen() {

  document.getElementById("loader").className = "";
  // crates new stages and properties for assets to live on
  startPage = new createjs.Shape();
  startText = new createjs.Text("Start Button","20px Arial", "#000000");
  startButton = new createjs.Shape();
  startButtonContainer = new createjs.Container();

  startButtonContainer.x = screen_width/2 - 200/2;
  startButtonContainer.y = screen_height/2;
  startText.textAlign = "center";
  startText.x = 200/2;
  startText.y = 50/2;

  //Create start button graphic
  startPage.graphics.beginFill("#6C8CD5").drawRect(0,0,500,screen_height);
  startButton.graphics.beginFill("#B0B0B0").drawRect(0,0,200,50);
  startButton.alpha = 0.5;


  //Link the start button and the text together
  startButtonContainer.addChild(startButton, startText);

  stage.addChild(startPage,startButtonContainer);
  
  startButtonContainer.addEventListener("click",startButtonClick);

  stage.update();
}


// When the start button is clicked, remove the start page
// Add score displays
function startButtonClick() {
  stage.removeChild(startPage, startButtonContainer);
  startButtonContainer.removeEventListener("click", startButtonClick);
  stage.addChild(scoreDisplay,backgroundxDisplay,spritexDisplay);
  createjs.Ticker.addEventListener("tick",scoretimer);

  startGame();

  //TODO: MUSIC HAS TO MOVE
  createjs.Sound.play("music", createjs.Sound.INTERRUPT_NONE, 0, 0, -1, 0.4);
}

//function charSelect {
  /* PSUEDO CODE**** //TODO: REMOVE

  character = 0; //TODO: PUT AS GLOBAL VARIABLE
  
  megaGirl = new createjs("GIRL_SRITE");
  megaBOY = new createjs("BOY_SPRITE");

  switch:
    case CHOOSE_BOY: {
      character = 1;
    }
    case CHOOSE_boy: {
      character = 2;
    }

  if ( character == 1 ) {
    character = megaGirl;
  } else if ( character == 2) {
    character = megaBoy;
  }
  
  */
//}

// Create the starting point of the game
function startGame() {
  background = new createjs.Shape();
  backgroundxDisplay = new createjs.Text("bg: 0", "20px Arial", "#FFFFFF");
  spritexDisplay = new createjs.Text("sprite: 0", "20px Arial", "#FFFFFF");
  scoreDisplay = new createjs.Text("Score: 0", "36px Arial", "#FFFFFF");
  
  //fill the background at 0,0 to the size of the screen
  background.graphics.beginBitmapFill(loader.getResult("background")).drawRect(0,0,1000,screen_height);
  
  scoreDisplay.x = 300;
  scoreDisplay.y = 100;

  backgroundxDisplay.x = 300;
  backgroundxDisplay.y = 150;

  spritexDisplay.x = 300;
  spritexDisplay.y = 180;



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
  stage.addChild(background, megamanSprite);

  // not sure what .timingMode is
  // .Ticker adds continuous timer
  createjs.Ticker.timingMode = createjs.Ticker.TIMEOUT;
  createjs.Ticker.setFPS(60);
  createjs.Ticker.addEventListener("tick", stageUpdate);
 
}

// press key down
function handleKeyDown(e) {
  //cross browser issues exist
  if(!e){ 
    var e = window.event;
  }

  switch(e.keyCode) {
    
    case KEYCODE_LEFT:
    case KEYCODE_A: {
      leftPressed = true;
      break;
    }
    case KEYCODE_RIGHT:
    case KEYCODE_D: {
      rightPressed = true;
      break;
    }
    case KEYCODE_SPACE: 
    case KEYCODE_DOWN:
    case KEYCODE_S: {
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
    case KEYCODE_LEFT:
    case KEYCODE_A: {
      leftPressed = false;
      megamanSprite.gotoAndStop("run");
      anyKeyPressed = false;
      break;
    }  
    case KEYCODE_RIGHT:
    case KEYCODE_D: {
      rightPressed = false;
      megamanSprite.gotoAndStop("run");
      anyKeyPressed = false;
      break;
    } 
    case KEYCODE_SPACE: 
    case KEYCODE_DOWN:
    case KEYCODE_S: {
      spacePressed = false;
      megamanSprite.gotoAndStop("duck");
      anyKeyPressed = false;
      break;
    }

  }
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

  // If left and right are pressed at the same time or nothing is pressed
  // return to the standing animation
  if ((!spacePressed&&!leftPressed&&!rightPressed) || (rightPressed&&leftPressed)) {
    megamanSprite.gotoAndStop("idle");
    anyKeyPressed = false;
  }

  if (megamanSprite.x >= 400){
   endCardPhoto();
  }



  //if the end card photo is being displayed, begin counting for 5 seconds
  if(endCardPhotoStatus) {
    //Count in fps, currently set to 60
    endCardPhotoCount++
  }

  // Convect the fps to seconds 
  if ( parseInt(endCardPhotoCount/60) == 5){
    //When the time is 5 seconds, continue to the next end card
    endCardGift();
  }
  

  if (endCardGiftStatus) {

    // Red banner pans across the screen
    if (endCardGiftBanner.x < 500) {
      endCardGiftBanner.x = endCardGiftBanner.x + 20;
    }
    // After red banner pans across
    // "YOU GOT" Text pans across quickly at first then slowly and exits quickly
    if (endCardGiftBanner.x == 500) {
      if (endCardGiftYouGot.x < 100) {
        endCardGiftYouGot.x = endCardGiftYouGot.x + 30;
      }
      if (endCardGiftYouGot.x < 160 && endCardGiftYouGot.x >= 100) {
        endCardGiftYouGot.x = endCardGiftYouGot.x + 1;
      }
      if (endCardGiftYouGot.x >= 160) {
        endCardGiftYouGot.x = endCardGiftYouGot.x + 30;
      }
    }
  }

  
  stage.update();
}
//First stage of the end cards
//displays the photo of character and santa for 5 seconds
function endCardPhoto() {
  endCardPhotoStatus = true;
  megamanSprite.x = 120;
  stage.removeAllChildren();
  endPhoto = new createjs.Shape();
  endBackground = new createjs.Shape();
  endPhoto.graphics.beginStroke("#ff0000").beginFill("#FFFFFF").drawRect(0,0,250,250);
  endBackground.graphics.beginFill("#000000").drawRect(0,0,screen_width,screen_height);

  endPhoto.regX = 125;
  endPhoto.regY = 125;
  endPhoto.rotation = 60;
  endPhoto.x = 125;
  endPhoto.y = 50;
  stage.addChild(endBackground, endPhoto);
  
  
}
//Second stage of the end cards
//Display the gift the player receives based on their score
function endCardGift() {
  endCardPhotoStatus = false;
  endCardPhotoCount = 0;
  endCardGiftStatus = true;

  stage.removeAllChildren();


  endCardGiftBanner = new createjs.Shape();
  endCardGiftYouGot = new createjs.Text("YOU GOT", "50px Arial", "#FFFFFF");
  endCardGiftYouGot.y = 125;
  endCardGiftYouGot.x = -350;

  endCardGiftBanner.graphics.beginFill("F25050").drawRect(-screen_width,75,screen_width,150);
  
  stage.addChild(endBackground, endCardGiftBanner, endCardGiftYouGot);
} 


