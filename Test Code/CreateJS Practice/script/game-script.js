var stage;
var canvas;
var screen_width;
var screen_height;
var bmpAnimation;
var megaman;

//Sprites
var megamanSprite;
var fireplaceSprite
var bellSprite;
var santaSprite;
var characterSprite;


//Sprite Sheets
var megamanBlueSpriteSheet;
var boySpriteSheet;
var megamanRedeSpriteSheet;
var girlSpriteSheet;
var bellSpriteSheet;
var santaSpriteSheet;

//Key Codes
var KEYCODE_ENTER = 13;
var KEYCODE_SPACE = 32;
var KEYCODE_UP = 38; 
var KEYCODE_LEFT = 37; 
var KEYCODE_RIGHT = 39;
var KEYCODE_DOWN = 40;
var KEYCODE_W = 87;  
var KEYCODE_A = 65;  
var KEYCODE_S = 83;
var KEYCODE_D = 68;  
var KEYCODE_ESC = 27;    


//Start Screen
var startScreenStatus = false;
var startSelectToggle = false;


//Character Select
var charSelectStatus = false;
var charSelectBoy;
var charSelectGirl;
var charSelectFrame;
var charSelectToggle;


//Instruction Page
var instructionScreenStatus = false;
var instructionScreenCount = 0;
var instructionBoy;
var instructionText;
var instructionBell;
//Snow Stuff
var snowList;


var leftPressed = false;
var rightPressed = false;
var duckTrigger = false;
var upPressed = false;
var anyKeyPressed = false;


document.onkeydown = handleKeyDown;
document.onkeyup = handleKeyUp;

var character = -1;

var startTitleBG;
var background;

var startPage;
var startText;
var scoreDisplay;
var score = 0;
var backgroundvalue = 0;
var loadProgressLabel;

//End Card
var endCardPhotoStatus = false;
var endCardPhotoCount = 0;
var endCardGiftStatus = false;
var endCardFinalStatus = false;

var backgroundxDisplay;
var spritexDisplay;
var detectSteps;
var timeDisplay;
var timeDelay;
var warningDisplay;
var wanringCountDisplay;

var gameStatus = false;


var stepsTaken = 0;
var alert = 0;
var alertCount = 0;
var warning = 0;
var warningCount = 0;
var santaCount = 0;
var detection;
var alertStatus;
var duckAnim = false;

var keyActive = true;


function init() {
  // conventional initializer
  stage = new createjs.Stage("myCanvas");
  screen_height = stage.canvas.height;
  screen_width = stage.canvas.width;
  stage.enableMouseOver(50);


  manifest = [
    // array of assest (images/music) that load with manifest
    // grabbing assets from the DOM
    {src:"assets/Test.mp3", id:"music"},
    {src:"assets/PixelFont3.ttf", id:"PixelFont3"},
    {src:"images/bg_titlecard.png", id:"bg_TitleCard"},
    {src:"images/megaman.png", id:"megaman"},
    {src:"images/megamanred.png", id:"megamanred"},
    {src:"images/boy_sprite.png", id:"boy"},
    {src:"images/girl_sprite.png", id:"girl"},
    {src:"images/ChristmasBG_70.png", id:"background"},
    {src:"images/bg_firesprites.png", id:"fireplace"},
    {src:"images/endcard_info_tumblr.png", id:"tumblrButtonImg"},
    {src:"images/endcard_info_twitter.png", id:"twitterButtonImg"},
    {src:"images/endcard_info_facebook.png", id:"facebookButtonImg"},
    {src:"images/endcard_logo.png", id:"lcLogoImg"},
    {src:"images/bell.png", id:"bell"},
    {src:"images/endcard_boy.png", id:"endcard_boy"},
    {src:"images/endcard_girl.png", id:"endcard_girl"},
    {src:"images/santa_sprite.png", id:"santa"},
    {src:"images/flake_big.png", id:"bigSnow"},
    {src:"images/flake_small.png", id:"smallSnow"}
    
  ];
  loader = new createjs.LoadQueue(false);
  loadingInitialize();
  //Not completely sure what this does. I think it runs handlerComplete when
  //the files are done loading

  loader.installPlugin(createjs.Sound);
  loader.addEventListener("complete", handleComplete);
  //loader.addEventListener("progress", handleProgress);
  createjs.Ticker.timingMode = createjs.Ticker.TIMEOUT;
  createjs.Ticker.setFPS(60);
  createjs.Ticker.addEventListener("tick", handleProgress);
  // loads the manifest
  loader.loadManifest(manifest);
  stage.update();
}
//this function is called everytime the progress of our loading changes
function handleProgress() {
  //loadingBar.scaleX = loader.progress * 300;
  progressPercentage = Math.round(loader.progress*100);
  var progressPercentageInt = progressPercentage % 5;
  bellSprite.advance();


  //Text and color changes depending on percentage done
  if (progressPercentage >= 80) {
  	loadProgressLabel.color ="#7cc576";
    loadProgressLabel.text = "baking cookies";

  } else if (progressPercentage >= 60) {
	  loadProgressLabel.color ="#f74f4d";
    loadProgressLabel.text = "knitting sweaters";

  } else if (progressPercentage >= 40) {
  	loadProgressLabel.color ="#7cc576";
    loadProgressLabel.text = "catching snowflakes";

  } else if (progressPercentage >= 20) {
  	loadProgressLabel.color ="#f74f4d";
    loadProgressLabel.text = "making snowangels";

  } else if (progressPercentage >= 0) {

  	loadProgressLabel.color ="#fafcfa";
    loadProgressLabel.text = "wrapping presents";
  }
   stage.update();
}

//called when everything is loaded 
function handleComplete() {
  document.getElementById("loader").className = "";

  // the canvas is now clickable and will run loadingScreenClick
  stage.removeAllChildren();
  //create the game
  buildArt();
  startScreen();
  
  //remove the loading screen page and click function
  
  createjs.Ticker.removeEventListener("tick", handleProgress);
}

//Creates everything related to the loading screen
function loadingInitialize() {
  
  //define loading screen graphics
  loadProgressLabel = new createjs.Text("","48px PixelFont3","black");
  loadingScreenFill = new createjs.Shape();
  loadProgressLabel.lineWidth = 2000;
  loadProgressLabel.textAlign = "center";
  loadProgressLabel.x = screen_width/2;
  loadProgressLabel.y = screen_height/2 - 20;

  //Fill background with gray
  loadingScreenFill.graphics.beginFill("#000000").drawRect(0,0,screen_width,screen_height).endFill();

	bellSpriteSheet = new createjs.SpriteSheet( {
	// all main strings are reserved strings (images, frames, animations) that do a specific task
		"images": ["images/bell.png"],
		"frames": {height: 46, width: 44, regX: 21, regY: 0},
		"animations": {
			"initial": [0, 3, true, 5/60],
			"ringing": [4, 5,"ringing", 5/60]
		}
	});

	bellSprite = new createjs.Sprite(bellSpriteSheet, "ringing");
  bellSprite.setTransform(screen_width/2,screen_height/2 + 20,1,1);

  stage.addChild(loadingScreenFill, loadProgressLabel, bellSprite);

}
function buildArt() {
  startTitleBG = new createjs.Shape();  
  startTitleBG.graphics.beginBitmapFill(loader.getResult("bg_TitleCard")).drawRect(0,0,screen_width,screen_height).endFill;

  background = new createjs.Shape();
  background.graphics.beginBitmapFill(loader.getResult("background")).drawRect(0,0,1000,screen_height);
  megamanBlueSpriteSheet = new createjs.SpriteSheet( {
  // all main strings are reserved strings (images, frames, animations) that do a specific task
    "images": [loader.getResult("megaman")],

    "frames": {height: 30, width: 30, regX: 15, regY: 0},
    "animations": {
      "idle": [0, 0],
      "run": [3, 5,"run", 5/60], //Runs Left
      "duck": [7, 7]
    }
  });


  boySpriteSheet = new createjs.SpriteSheet( {
  // all main strings are reserved strings (images, frames, animations) that do a specific task
    "images": [loader.getResult("boy")],
    // x, y, width, height, imageIndex, regX, regY
    "frames": [
    /*00-01*/   [0,0,42,84,0,21,0],[42,0,42,84,0,21,0],
    /*02-03*/   [0,84,42,84,0,21,0],[42,84,42,84,0,21,0],
    /*04-05*/   [0,168,116,84,0,50,0],[116,168,116,84,0,50,0],
    /*06-11*/   [0,252,42,84,0,21,0],[42,252,42,84,0,21,0],[84,252,42,84,0,21,0],[126,252,42,84,0,21,0],[168,252,42,84,0,21,0],[210,252,42,84,0,21,0],
    /*12-21*/   [0,336,60,84,0,30,0],[60,336,60,84,0,30,0],[120,336,60,84,0,30,0],[180,336,60,84,0,30,0],[240,336,60,84,0,30,0],[300,336,60,84,0,30,0],[360,336,60,84,0,30,0],[420,336,60,84,0,30,0],[480,336,60,84,0,30,0],[540,336,60,84,0,30,0],
    /*22-31*/   [0,420,60,84,0,30,0],[60,420,60,84,0,30,0],[120,420,60,84,0,30,0],[180,420,60,84,0,30,0],[240,420,60,84,0,30,0],[300,420,60,84,0,30,0],[360,420,60,84,0,30,0],[420,420,60,84,0,30,0],[480,420,60,84,0,30,0],[540,420,60,84,0,30,0],
    /*32-41*/   [0,504,100,84,0,50,0],[100,504,100,84,0,50,0],[200,504,100,84,0,50,0],[300,504,100,84,0,50,0],[400,504,100,84,0,50,0],[500,504,100,84,0,50,0],[600,504,100,84,0,50,0],[700,504,100,84,0,50,0],[800,504,100,84,0,50,0],[900,504,100,84,0,50,0],
    /*42-46*/   [0,588,100,84,0,50,0],[100,588,100,84,0,50,0],[200,588,100,84,0,50,0],[300,588,100,84,0,50,0],[400,588,100,84,0,50,0],
    /*47-51*/   [0,672,80,88,0,40,0],[80,672,80,88,0,40,0],[160,672,80,88,0,40,0],[240,672,80,88,0,40,0],[320,672,80,88,0,40,0],
    /*52-57*/   [0,760,46,92,0,23,8],[46,760,46,92,0,23,8],[92,760,46,92,0,23,8],[138,760,46,92,0,23,8],[184,760,46,92,0,23,8],[230,760,46,92,0,23,8]   
    ],
    "animations": {
      "idle": [0,0,"blink",1/150],
      "lookUp": [1],
      "lookLeft": [3],
      "stressed":[4,5,"stressed",5/60],
      "blink": [6,11,"idle",5/60],
      "sneak": [12,31,"sneak",8/60],
      "duck": [32,46,"duckIdle", 20/60],
      "duckIdle":[46],
      "dive": [47,51,false,8/60],
      "pickMe": [52,57,false,8/60],
      "forceDuck": [32, 45, "stressed", 20/60]
    }
  });

  megamanRedSpriteSheet = new createjs.SpriteSheet( {
  // all main strings are reserved strings (images, frames, animations) that do a specific task
    "images": [loader.getResult("megamanred")],

    "frames": {height: 30, width: 30, regX: 15, regY: 0},
    "animations": {
      "idle": [0, 0],
      "run": [3, 5,"run", 5/60], //Runs Left
      "duck": [7, 7]
    }
  });

  girlSpriteSheet = new createjs.SpriteSheet( {
    // all main strings are reserved strings (images, frames, animations) that do a specific task
    "images": [loader.getResult("girl")],
    // x, y, width, height, imageIndex, regX, regY
    "frames": [
    /*00-01*/   [0,0,40,96,0,20,0],[40,0,40,96,0,20,0],
    /*02-03*/   [0,96,40,96,0,20,0],[40,96,40,96,0,20,0],
    /*04-05*/   [0,192,52,96,0,26,0],[52,192,52,96,0,26,0],
    /*06-11*/   [0,288,40,96,0,20,0],[40,288,40,96,0,20,0],[80,288,40,96,0,20,0],[120,288,40,96,0,20,0],[160,288,40,96,0,20,0],[200,288,40,96,0,20,0],
    /*12-21*/   [0,384,56,96,0,28,0],[56,384,56,96,0,28,0],[112,384,56,96,0,28,0],[168,384,56,96,0,28,0],[224,384,56,96,0,28,0],[280,384,56,96,0,28,0],[336,384,56,96,0,28,0],[392,384,56,96,0,28,0],[448,384,56,96,0,28,0],[504,384,56,96,0,28,0],
    /*22-31*/   [0,480,56,96,0,28,0],[56,480,56,96,0,28,0],[112,480,56,96,0,28,0],[168,480,56,96,0,28,0],[224,480,56,96,0,28,0],[280,480,56,96,0,28,0],[336,480,56,96,0,28,0],[392,480,56,96,0,28,0],[448,480,56,96,0,28,0],[504,480,56,96,0,28,0],
    /*32-41*/   [0,576,56,96,0,28,0],[56,576,56,96,0,28,0],[112,576,56,96,0,28,0],[168,576,56,96,0,28,0],[224,576,56,96,0,28,0],[280,576,56,96,0,28,0],[336,576,56,96,0,28,0],[392,576,56,96,0,28,0],[448,576,56,96,0,28,0],[504,576,56,96,0,28,0],
    /*42-45*/   [0,672,56,96,0,28,0],[56,672,56,96,0,28,0],[112,672,56,96,0,28,0],[168,672,56,96,0,28,0],
    /*46-50*/   [0,768,82,100,0,41,0],[82,768,82,100,0,41,0],[164,768,82,100,0,41,0],[246,768,82,100,0,41,0],[328,768,82,100,0,41,0],
    /*51-56*/   [0,868,42,104,0,22,9],[42,868,42,104,0,22,9],[84,868,42,104,0,22,9],[126,868,42,104,0,22,9],[168,868,42,104,0,22,9],[210,868,42,104,0,22,9]
    ], 
    "animations": {
      "idle": [0,0,"blink",1/150],
      "lookUp": [1],
      "lookLeft": [3],
      "stressed":[4,5,"stressed",5/60],
      "blink": [6,11,"idle",5/60],
      "sneak": [12,31,"sneak",8/60],
      "duck": [32,45,"duckIdle", 20/60],
      "duckIdle":[45],
      "dive": [46,50,false,8/60],
      "pickMe": [51,56,false,8/60],
      "forceDuck": [32, 45, "stressed", 20/60]
    }
  });

  santaSpriteSheet = new createjs.SpriteSheet( {
  // all main strings are reserved strings (images, frames, animations) that do a specific task
    "images": [loader.getResult("santa")],
    "frames": {height: 150, width: 190, regX: 0, regY: 0},
    "animations": {
      "idle": [0, 35,"idle", 5/60],
      "surprise": [36, 40, "surprise", 20/60]
    }
  });


}

function createSnow() {

  var bsnowContainer = new Container();
  var ssnowContainer = new Container();
  stage.addchild(bSnowContainer);
  stage.addchild(sSnowContainer);

  var snowNum = 15;
  var snowImage = event.target;
  for(var i = 0; i < snowNum; i++) {
    var snowBitmap = new Bitmap(snowImage);
    bsnowContainer.addchild(snowBitmap);
    snowBitmap.name = "big snow flake"+snowNum;
  }

}

function startScreen() {
  
  // crates new stages and properties for assets to live on
  startScreenStatus = true;

  startPage = new createjs.Shape();
  startText = new createjs.Text("Start","48px PixelFont3", "#fbaf5d");
  startTitle = new createjs.Text("Sneakin' on Santa", "100px PixelFont3", "#fbaf5d");
  startInstruction = new createjs.Text("Instructions","48px PixelFont3", "#fbaf5d");
  startButton = new createjs.Shape();
  startSelection = new createjs.Shape();
  var startTextBox = new createjs.Shape();
  var startInstructionBox = new createjs.Shape();

  
  startButtonContainer = new createjs.Container();
  startTextContainer = new createjs.Container();
  startInstructionContainer = new createjs.Container();
  //"SNEAKIN' ON SANTA" Text
  startTitle.x = screen_width/2;
  startTitle.y = 70;
  startTitle.textAlign = "center";
  startTitle.textBaseline = "alphabetic";

  //"START" Text
  startText.textAlign = "center";
  startText.textBaseline = "alphabetic";
  startText.x = screen_width/2;
  startText.y = 250;
  //"Instruction" Text
  startInstruction.textAlign = "center";
  startInstruction.textBaseline = "alphabetic";
  startInstruction.x = screen_width/2;
  startInstruction.y = 280;

  //Start Selection Square
  startSelection.graphics.beginFill("#f74f4d").drawRect(screen_width/2,0,150,30);
  startSelection.y = 242;
  startSelection.regX = 150/2;
  startSelection.regY = 30/2;
  startSelection.alpha = 0.75;

  //Create start button graphic
  startPage.graphics.beginFill("#000000").drawRect(0,0,screen_width,screen_height);
  startTextBox.graphics.beginFill("#FFFFFF").drawRect(-75,-15,150,30);

  startText.hitArea = startTextBox;

  startInstructionBox.graphics.beginFill("#FFFFFF").drawRect(-75,-15,150,30);

  startInstruction.hitArea = startInstructionBox;
  //TODO REMOVE CONTAINER FOR TEXT/INSTRUCTION
  //startTextContainer.addChild(startTextBox, startText);
  //startInstructionContainer.addChild(startInstructionBox, startInstruction);
  
  startText.addEventListener("rollover",startTextMouseOver);
  startInstruction.addEventListener("rollover",startInstructionMouseOver);
  startText.addEventListener("click",startTextClick);
  startInstruction.addEventListener("click",startInstructionClick);
  

  stage.addChild(startTitleBG, startTitle, startSelection, startText, startInstruction);

  stage.update();
}

function startTextMouseOver() {
  console.log(4);
  startSelectToggle = false;
  startSelection.y = 242;
  stage.update();
}

function startInstructionMouseOver() {
  console.log(5);
  startSelectToggle = true;
  startSelection.y = 272;
  stage.update();
}

function startTextClick() {
  if (!startSelectToggle) {
    charScreen();
  }
}

function startInstructionClick() {
  if (startSelectToggle) {
    instructionScreen()
  }
}


// When the start button is clicked, remove the start page
// Add score displays

function instructionScreen() {
  stage.removeAllChildren();
  instructionScreenStatus = true;
  instructionScreenCount = 0;

  var instructionBanner = new createjs.Shape(); 
  instructionText = new createjs.Text("Tap the right arrow key to move", "48px PixelFont3", "#fafcfa");
  instructionText.x = 250;
  instructionText.y = 35;
  instructionText.textAlign = "center";
  instructionBanner.graphics.beginFill("F25050").drawRect(0,0,screen_width,60);
  instructionBanner.alpha = 0.9;
  instructionBanner.y = 30
  instructionBoy = new createjs.Sprite(boySpriteSheet, "idle");
  instructionBoy.x = 45;
  instructionBoy.y = 200;
  instructionBell = new createjs.Sprite(bellSpriteSheet, "initial");
  instructionBell.x = 450;
  instructionBell.y = 100;



  // Boy moves across the screen 3 times
  var instructionBoyAnim = new createjs.Tween.get(instructionBoy, {paused:true})
            .wait(500)          //500
            .to({x:275},2000)   //2500
            .wait(500)          //3000
            .to({x:45},0)       
            .to({x:275},2000)   //5000
            .wait(500);         //5500

  instructionBoyAnim.setPaused(false);
  createjs.Ticker.addEventListener("tick", instructionScreenAnimation);

  stage.addChild(background, instructionBanner, instructionText, instructionBoy);
  stage.update();
}
//This is will be called to another ticker to allow for the sprites and text to change in the instruction screen
function instructionScreenAnimation() {
  stage.update();
  if(instructionScreenStatus) {
    //Count in fps, currently set to 60
    instructionScreenCount++;
  }
  if ( instructionScreenCount == 0.5*60) {
    instructionBoy.gotoAndPlay("sneak")
  } else if ( instructionScreenCount == 2.5*60) {
    instructionBoy.gotoAndPlay("idle");
  } else if ( instructionScreenCount == 3*60) {
    instructionBoy.gotoAndPlay("sneak");
  } else if ( instructionScreenCount == 5*60) {
    instructionBoy.gotoAndPlay("idle");
  } else if ( instructionScreenCount == 5.5*60) {

    instructionBoy.gotoAndPlay("duck");
    instructionText.text = "Press down or space to duck";

  } else if ( instructionScreenCount == 7.5*60) {
    stage.addChild(instructionBell);
    instructionBoy.gotoAndPlay("idle");
    instructionText.text = "Beware of Santa's gaze!";
  } else if ( instructionScreenCount == 9.5*60) {
    instructionBoy.gotoAndPlay("duck");
    instructionText.text = "Duck to avoid being noticed";
  } else if ( instructionScreenCount == 11.5*60) {
    instructionBoy.gotoAndPlay("stressed");
    instructionText.text = "or else...";
  } else if ( instructionScreenCount == 13.5*60) {
    //Return to start screen and remove ticker
    startScreen();
    createjs.Ticker.removeEventListener("tick", instructionScreenAnimation);
  }

  
}


function charScreen() {
  startScreenStatus = false; 
  charSelectStatus = true;
  // create shapes and containers
  charSelectFrame = new createjs.Shape();
  var charPage = new createjs.Shape();
  var charTitle = new createjs.Text("Select Your Character", "48px PixelFont3", "#666");
  var boyDisplay = new createjs.Shape();
  var boyDisplayContainer = new createjs.Container();
  var girlDisplay = new createjs.Shape();
  var girlDisplayContainer = new createjs.Container();
  var charDisplayWidth = 100;
  var charDisplayHeight = 150;




  // how big are they
  charTitle.x = screen_width/2;
  charTitle.y = 15;
  charTitle.textAlign = "center";

  charSelectBoy = new createjs.Sprite(boySpriteSheet, "idle");
  charSelectGirl = new createjs.Sprite(girlSpriteSheet, "idle");


  // where are they
  boyDisplayContainer.x = 125;
  boyDisplayContainer.y = 150;
  girlDisplayContainer.x = 375;
  girlDisplayContainer.y = 150;

  charSelectBoy.x = 125;
  charSelectBoy.y = 110; 
  charSelectGirl.x = 375;
  charSelectGirl.y = 102; 

  // draw it and fill it
  charPage.graphics.beginFill("#B26BE8").drawRect(0,0,500,screen_height);
  boyDisplay.graphics.beginFill("#9d9d9d").drawRect(0,0,charDisplayWidth,charDisplayHeight);
  girlDisplay.graphics.beginFill("#9d9d9d").drawRect(0,0,charDisplayWidth,charDisplayHeight);
  boyDisplay.regX = charDisplayWidth/2;
  boyDisplay.regY = charDisplayHeight/2;
  girlDisplay.regX = charDisplayWidth/2;
  girlDisplay.regY = charDisplayHeight/2;
  boyDisplay.alpha = 0.75;
  girlDisplay.alpha = 0.75;

  charSelectFrame.graphics.beginStroke("#fbaf5d").setStrokeStyle(4).drawRect(0,0,charDisplayWidth+10,charDisplayHeight+10);
  charSelectFrame.regX = (charDisplayWidth+10)/2;
  charSelectFrame.regY = (charDisplayHeight+10)/2;
  charSelectFrame.x = 125;
  charSelectFrame.y = 150;




  //put stuff into its containers
  boyDisplayContainer.addChild(boyDisplay);
  girlDisplayContainer.addChild(girlDisplay);

  //put is all on the main screen
  stage.addChild(startTitleBG, boyDisplayContainer, girlDisplayContainer, charTitle, charSelectBoy, charSelectGirl, charSelectFrame);

  //add eventListeners (hover, clikc etc..)
  charSelectBoy.addEventListener("rollover",charBoyMouseOver);
  charSelectGirl.addEventListener("rollover",charGirlMouseOver);
  charSelectBoy.addEventListener("click",charBoyClick);
  charSelectGirl.addEventListener("click",charGirlClick);
  


  stage.update();
}
function boySelect() {
  character = 0;
  charSelectBoy.gotoAndPlay("pickMe");
  createjs.Ticker.addEventListener("tick",charSelectAnim);
  startGame();
}

function girlSelect() {
  character = 1;
  charSelectGirl.gotoAndPlay("pickMe");
  createjs.Ticker.addEventListener("tick",charSelectAnim);
  startGame();
}


function charBoyMouseOver() {
  charSelectToggle = false;
  charSelectFrame.x = 125;
  stage.update();
}

function charGirlMouseOver() {
  charSelectToggle = true;
  charSelectFrame.x = 375;
  stage.update();
}

function charBoyClick() {
  if (!charSelectToggle) {

    boySelect()
  }
}

function charGirlClick() {
  if (charSelectToggle) {
    girlSelect()
  }
}

function charSelectAnim() {


  var charSelectFrameAnim = createjs.Tween.get(charSelectFrame, {paused:true})
                        .to({alpha:0},50)
                        .to({alpha:1},50)                         
                        .to({alpha:0},50)
                        .to({alpha:1},50)
                        .to({alpha:0},50)
                        .to({alpha:1},50)
                        .to({alpha:0},50)
                        .to({alpha:1},50)
                        .to({alpha:0},50)
                        .to({alpha:1},50)
                        .wait(1250);

  charSelectFrameAnim.setPaused(false);
  stage.update();
}



// Create the starting point of the game
function startGame() {
  stage.removeAllChildren();
  charSelectStatus = false;
  gameStatus = true;
  createjs.Ticker.removeAllEventListeners("tick");
  stage.removeAllEventListeners("click");
  stage.removeAllEventListeners("rollover");
  backgroundContainer = new createjs.Container();
  scoreDisplay = new createjs.Text("Score: 0", "36px PixelFont3", "#FFFFFF");
  
  //TODO: for testing movment and score
  backgroundxDisplay = new createjs.Text("bg: 0", "20px PixelFont3", "#FFFFFF");
  spritexDisplay = new createjs.Text("sprite: 0", "20px PixelFont3", "#FFFFFF"); 
  
  //TODO: for testing alert
  detectSteps = new createjs.Text("Steps: 0", "32px PixelFont3", "#FFFFFF");
  alertStatus = new createjs.Text("Alert: false", "32px PixelFont3", "#FFFFFF");
  timeDelay = new createjs.Text("Alert: false", "32px PixelFont3", "#FFFFFF");

  warningDisplay = new createjs.Text("Alert: false", "32px PixelFont3", "#FFFFFF");
  wanringCountDisplay = new createjs.Text("Alert: false", "32px PixelFont3", "#FFFFFF");

  //TODO: second count
  timeDisplay = new createjs.Text("Alert: false", "32px PixelFont3", "#FFFFFF")

  //fill the background at 0,0 to the size of the screen
  
  
  scoreDisplay.x = 275;
  scoreDisplay.y = 100;

  backgroundxDisplay.x = 275;
  backgroundxDisplay.y = 150;

  spritexDisplay.x = 275;
  spritexDisplay.y = 180;

  detectSteps.x = 275;
  detectSteps.y = 210;

  alertStatus.x = 275;
  alertStatus.y = 230;

  timeDelay.x = 350;
  timeDelay.y = 210;

  timeDisplay.x = 350;
  timeDisplay.y = 230;

  warningDisplay.x = 350;
  warningDisplay.y = 100;

  wanringCountDisplay.x = 350;
  wanringCountDisplay.y = 120;


//Boy Selection
  if (character == 0) {

    megamanSprite = new createjs.Sprite(megamanBlueSpriteSheet, "idle");
    characterSprite = new createjs.Sprite(boySpriteSheet, "idle");
}



//Girl Selection
  else if (character == 1) {
    
    megamanSprite = new createjs.Sprite(megamanRedSpriteSheet, "idle");
    characterSprite = new createjs.Sprite(girlSpriteSheet, "idle");

  } else {
    charScreen();
  }

  var fireplaceSpriteSheet = new createjs.SpriteSheet( {
  // all main strings are reserved strings (images, frames, animations) that do a specific task
    "images": [loader.getResult("fireplace")],
    "frames": {height: 300, width: 1000, regX: 0, regY: 0},
    "animations": {
      "idle": [0, 5,"idle", 5/60],
    }
  });

  
  characterSprite.setTransform(100,100,1,1);
  characterSprite.framerate = 60;
  
  fireplaceSprite = new createjs.Sprite(fireplaceSpriteSheet, "idle");
  fireplaceSprite.setTransform(0,0,1,1);
  fireplaceSprite.framerate = 60;


  
    // setTransform sets sprites x and y coordinates and scale
  megamanSprite.setTransform(120,250,1,1);
  megamanSprite.framerate = 60;

  santaSprite = new createjs.Sprite(santaSpriteSheet, "idle");
  santaSprite.setTransform(810,125,1,1);


  backgroundContainer.addChild(background, fireplaceSprite, santaSprite);

  // .addchild put everythign on the screen
  stage.addChild(backgroundContainer, megamanSprite, detectSteps, alertStatus, characterSprite, timeDisplay, timeDelay, warningDisplay, wanringCountDisplay);
  santaAlert();
  // not sure what .timingMode is
  // .Ticker adds continuous timer
  createjs.Ticker.timingMode = createjs.Ticker.TIMEOUT;
  createjs.Ticker.setFPS(60);
  createjs.Ticker.addEventListener("tick", stageUpdate);
}

function santaAlert() {
  var santaCountFunc = setInterval(function() {
    santaCount++;
    if(santaCount >= 4) {
      santaCount = 0;
    }
    if(alertCount > 0) {
      santaCount = 0;
    }
    if(santaCount == 3){ 
      detection =  Math.floor((Math.random()*10)+1);
      console.log(detection);

      switch(detection) {
        case 1:
          warning = 1;
          break;
        case 2:
          warning = 1;
          break;
        case 4:
          warning = 1;
          break;
        case 6:
          warning = 1;
          break;
        case 3:
          warning = 1;
          break;
        default:
          warning = 0;
          break;
      }
    }
    console.log("Key active: " + keyActive);

    if(warning == 1) {
      warningCount++;
      if(warningCount == 3) {
        alert = 1;
        warningCount = 0;
      }
    }

    if(alert == 1) {
      forceduck();
      santaSprite.gotoAndPlay("surprise");
      santaCount = 0;
      alertCount++;
      warning = 0;
    }
  }, 1000);

  stageUpdate();
}

function forceduck() {
  keyActive = false;
  rightPressed = false;

  if(!duckAnim && duckTrigger ==  false) {
    megamanSprite.gotoAndPlay("forceDuck");
    characterSprite.gotoAndPlay("forceDuck");
    duckAnim = true;
    return;
  }

  if(alertCount == 5) {
    megamanSprite.gotoAndStop("idle");
    characterSprite.gotoAndStop("idle");
    santaSprite.gotoAndStop("idle");
    alert = 0;
    alertCount = -1;
    keyActive = true;
    duckTrigger = false;
    duckAnim = false;
  }
}
// press key down
function handleKeyDown(e) {

  //cross browser issues exist
  if(!e){ 
    var e = window.event;
  }

  if(gameStatus) {
    if(keyActive) {
      switch(e.keyCode) {
        
        case KEYCODE_LEFT:
        case KEYCODE_A: {
          leftPressed = true;
          break;
        }
        case KEYCODE_RIGHT:
        case KEYCODE_D: {
          rightPressed = true;
          //add to stepsTaken
          stepsTaken++;
          break;
        }
        case KEYCODE_UP:
        case KEYCODE_W: {
          upPressed = true;
          break;
        }
        case KEYCODE_SPACE: 
        case KEYCODE_DOWN:
        case KEYCODE_S: {
          duckTrigger = true;
          break;
        }
      }
    }
  }
}

function handleKeyUp(e) {
  //cross browser issues exist
  if(!e){
    var e = window.event;
  }
  if (gameStatus) {
    if(keyActive) {
      //gotoAndStop will play the animation once and stop
      switch(e.keyCode) {
        case KEYCODE_LEFT:
        case KEYCODE_A: {
          leftPressed = false;
          megamanSprite.gotoAndStop("run");
          characterSprite.gotoAndPlay("idle");
          anyKeyPressed = false;
          break;
        }  
        case KEYCODE_RIGHT:
        case KEYCODE_D: {
          rightPressed = false;
          megamanSprite.gotoAndStop("run");
          characterSprite.gotoAndPlay("idle");       
          anyKeyPressed = false;
          break;
        } 
        case KEYCODE_UP:
        case KEYCODE_W: {
          upPressed = false;
          characterSprite.gotoAndPlay("idle");
          anyKeyPressed = false;
          break;
        } 

        case KEYCODE_SPACE: 
        case KEYCODE_DOWN:
        case KEYCODE_S: {
          duckTrigger = false;
          characterSprite.gotoAndPlay("idle");
          megamanSprite.gotoAndStop("idle");
          anyKeyPressed = false;
          break;
        }
      }
    }
    //During the end card photo, press esc, enter or space to skip it
    if(endCardPhotoStatus)
      if(e.keyCode == KEYCODE_ESC || e.keyCode == KEYCODE_ENTER || e.keyCode == KEYCODE_SPACE  ) {
        endCardPhotoStatus = false;
        endCardPhotoTransition()
      }
  }




  if (charSelectStatus) {
    switch(e.keyCode) {

      case KEYCODE_LEFT:
      case KEYCODE_A:
      case KEYCODE_RIGHT:
      case KEYCODE_D:

      charSelectToggle = !charSelectToggle; 
      
      // IF startSelectToggle is true, cursor on "Instructions"
      if (charSelectToggle) {
        charSelectFrame.x = 375;

        stage.update();
        break;
      } else {
        charSelectFrame.x = 125;
        stage.update();
        break;
      }     
      
      case KEYCODE_ENTER:
      case KEYCODE_SPACE:
      if (charSelectToggle) {
        girlSelect();
        break;
      } else {
        boySelect();
        break;
      } 
    }
  }

  if (startScreenStatus ) {
    switch(e.keyCode) {
      case KEYCODE_UP:
      case KEYCODE_W:
      case KEYCODE_DOWN:
      case KEYCODE_S:
      
      startSelectToggle = !startSelectToggle; 
      
      // IF startSelectToggle is true, cursor on "Instructions"
      if (startSelectToggle) {
        console.log(1);
        startSelection.y = 272;
        stage.update();
        break;
      } else {
        console.log(2);
        startSelection.y = 242;
        stage.update();
        break;
      }     
      
      case KEYCODE_ENTER:
      case KEYCODE_SPACE:
      if (startSelectToggle) {
        instructionScreen();
        break;
      } else {
        charScreen();
        break;
      } 
    }
  }
  

}


function restart() {
  // take out EVERYTHING
  stage.removeAllChildren();
  startScreen();
}

function scoretimer(event) {

  score++;

  /*scoreDisplay.text = "Score: " + score + " ";
  backgroundxDisplay.text = "bg: " + background.x + " ";
  spritexDisplay.text = "sprite: " + megamanSprite.x + " ";*/
}


function stageUpdate(event) {


  // run santa alert function
  //santaAlert();
  //When an arrow key is pressed, it will play the "run" animation (which loops)
  //will remove the anykeypress flag so that the animation will be only played once
  // if ((leftPressed||rightPressed) && !anyKeyPressed && !duckTrigger) {
  //   megamanSprite.gotoAndPlay("run");
  //   anyKeyPressed = true;
  // }

  // TODO: get this outta here when done, TESTING
  detectSteps.text = "steps: " + stepsTaken + " ";
  alertStatus.text = "alert: " + alert + " ";
  timeDelay.text = "delay: " + alertCount + " ";
  timeDisplay.text = "time: " + santaCount + " ";
  wanringCountDisplay.text = "warningCount: " + warningCount;
  warningDisplay.text = "warning: " + warning;


  if (leftPressed && !anyKeyPressed && !duckTrigger && !upPressed && !rightPressed) {
    characterSprite.gotoAndPlay("lookLeft");
    anyKeyPressed = true;
  }
  if (upPressed && !anyKeyPressed && !duckTrigger && !leftPressed && !rightPressed) {
    characterSprite.gotoAndPlay("lookUp");
    anyKeyPressed = true;
  }

    if (rightPressed && !anyKeyPressed && !duckTrigger && !upPressed && !leftPressed) {
    characterSprite.gotoAndPlay("sneak");
    anyKeyPressed = true;
  }

  // pressing space makes you go duck
  if (duckTrigger && !anyKeyPressed) {
    megamanSprite.gotoAndPlay("duck");
    characterSprite.gotoAndPlay("duck");
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
/*  if (leftPressed && !rightPressed && !duckTrigger) {
    // flip at regular state
    megamanSprite.scaleX = 1;
    
    if ((megamanSprite.x > 15 && megamanSprite.x <= 200 && backgroundContainer.x == 0) || 
    (megamanSprite.x > 200 && megamanSprite.x <= 400 && backgroundContainer.x == -500)) {
      megamanSprite.x--;
    } 
    if (megamanSprite.x == 200 && backgroundContainer.x >= -500 && backgroundContainer.x <= 0) {
      backgroundContainer.x++;
    }
  }*/


  //Pressed the Right Arrow Key **********
  if (!leftPressed && rightPressed && !duckTrigger) {
    //set the X scale to -1 to flip along the horizontal
    megamanSprite.scaleX = -1;

    //So the backgroundContainer will move till it hits the end.
    if ((megamanSprite.x >= 15 && megamanSprite.x < 200 && backgroundContainer.x == 0) || 
    (megamanSprite.x >= 200 && megamanSprite.x < 400 && backgroundContainer.x == -500)) {
      megamanSprite.x++;
    } 
    if (megamanSprite.x == 200 && -500 <= backgroundContainer.x && backgroundContainer.x <= 0) {
      backgroundContainer.x--;
    }
  }



  // If left and right are pressed at the same time or nothing is pressed
  // return to the standing animation
  if ((!duckTrigger&&!leftPressed&&!rightPressed) || (rightPressed&&leftPressed)) {
    megamanSprite.gotoAndStop("idle");
    anyKeyPressed = false;
  }
  if (megamanSprite.x >= 350){
    santaSprite.gotoAndPlay("surprise");
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
    endCardPhotoTransition()

  }

    // // Red banner pans across the screen
    // if (endCardGiftBanner.x < 500) {
    //   endCardGiftBanner.x = endCardGiftBanner.x + 20;
    // }
    // // After red banner pans across
    // // "YOU GOT" Text pans across quickly at first then slowly and exits quickly
    // if (endCardGiftBanner.x == 500) {
    //   if (endCardGiftYouGot.x < 100) {
    //     endCardGiftYouGot.x = endCardGiftYouGot.x + 30;
    //   }
    //   if (endCardGiftYouGot.x < 160 && endCardGiftYouGot.x >= 100) {
    //     endCardGiftYouGot.x = endCardGiftYouGot.x + 1;
    //   }
    //   if (endCardGiftYouGot.x >= 160) {
    //     endCardGiftYouGot.x = endCardGiftYouGot.x + 30;
    //   }
    // }

  
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
  endCardFlash = new createjs.Shape();

  endCardEnterSkip = new createjs.Text("Press Enter to skip >", "32px PixelFont3", "#FFFFFF");
  endPhotoContainer = new createjs.Container();

  if (character == 0) {
    endPhoto.graphics.beginBitmapFill(loader.getResult("endcard_boy")).drawRect(0,0,500,300);
  } else if (character == 1) {
    endPhoto.graphics.beginBitmapFill(loader.getResult("endcard_girl")).drawRect(0,0,500,300);
  }

  endBackground.graphics.beginFill("#000000").drawRect(0,0,screen_width,screen_height);
  endCardFlash.graphics.beginFill("#FFFFFF").drawRect(0,0,screen_width,screen_height);

  var endCardFlashAnim = createjs.Tween.get(endCardFlash, {paused:true})
          .to({alpha:0},75)

  endCardFlashAnim.setPaused(false);

  endCardEnterSkip.x = 310;
  endCardEnterSkip.y = 270;

  endPhotoContainer.addChild(endPhoto, endCardEnterSkip);

  stage.addChild(endBackground, endPhotoContainer, endCardFlash);

}

function endCardPhotoTransition() {
  //Photo and text fade away and move to the Gift end card 
  var endPhotoContainerAnim = createjs.Tween.get(endPhotoContainer, {paused:true})
          .to({alpha:0},500)
          .call(endCardGift);
  endPhotoContainerAnim.setPaused(false);
}

//Second stage of the end cards
//Display the gift the player receives based on their score
function endCardGift() {
  endCardPhotoStatus = false;
  endCardPhotoCount = 0;
  endCardGiftStatus = true;

  stage.removeAllChildren();


  endCardGiftBanner = new createjs.Shape();
  endCardGiftYouGot = new createjs.Text("YOU GOT", "160px PixelFont3", "#FFFFFF");
  endCardGiftText = new createjs.Text("GIFT", "160px PixelFont3", "#FFFFFF");
  endCardGiftYouGot.y = 70;
  endCardGiftYouGot.x = 600;
  endCardGiftText.y = 70;
  endCardGiftText.x = 600;

  endCardGiftBanner.graphics.beginFill("F25050").drawRect(screen_width,100,screen_width,100);

  stage.addChild(endBackground, endCardGiftBanner, endCardGiftYouGot, endCardGiftText);


  //Gift Card Animation

  // Red banner pans across the screen
  var giftBannerAnim = createjs.Tween.get(endCardGiftBanner, {paused:true})
            .wait(1850)
                  .to({x:-500},500,createjs.Ease.linear);
                  // 
                  // .to({x:1000},400,createjs.Ease.linear);
  // The words YOU GOT moves across the screen
  var giftYouGotAnim = createjs.Tween.get(endCardGiftYouGot, {paused:true})
                    .to({x:120},200,createjs.Ease.linear)
                    .to({x:80},1750,createjs.Ease.linear)
                    .to({x:-500},200,createjs.Ease.linear);
  // the gift name pans across
  var giftTextAnim = createjs.Tween.get(endCardGiftText, {paused:true})
                  .wait(2500)
                  .to({x:200},200,createjs.Ease.linear)
                  .wait(3100)
                  // .to({x:500},400,createjs.Ease.linear)
                  .call(endCardFinal);

  //Animation Timeline
  var giftTimeline = new createjs.Timeline([giftBannerAnim, giftYouGotAnim, giftTextAnim], {paused:true})
  giftTimeline.setPaused(false);
} 

  //Third stage of the end cards
  //Display social media info and score
function endCardFinal() {
  endCardGiftStatus = false;
  endCardFinalStatus = true;
  stage.removeChild(endCardGiftYouGot)
  //stage.removeAllChildren();
  replayButton = new createjs.Text("Replay?", "128px PixelFont3", "#fbaf5d");
  replayButton.textBaseline = "alphabetic";
  replayButton.x = 20;
  replayButton.y = 265;

  tumblrButton = new createjs.Shape();
  twitterButton = new createjs.Shape();
  facebookButton = new createjs.Shape();
  lcLogo = new createjs.Shape();
  socialMediaInfo = new createjs.Container();

  endCardFinalContainer = new createjs.Container();
  

  tumblrButton.graphics.beginBitmapFill(loader.getResult("tumblrButtonImg")).drawRect(0,0,147,21);
  twitterButton.graphics.beginBitmapFill(loader.getResult("twitterButtonImg")).drawRect(0,0,150,21);
  facebookButton.graphics.beginBitmapFill(loader.getResult("facebookButtonImg")).drawRect(0,0,163,21);
  lcLogo.graphics.beginBitmapFill(loader.getResult("lcLogoImg")).drawRect(0,0,59,82);
  
  tumblrButton.x = 64;
  tumblrButton.y = 15;
  twitterButton.x = 64;
  twitterButton.y = 38;
  facebookButton.x = 64;
  facebookButton.y = 61;


  socialMediaInfo.addChild(tumblrButton, twitterButton, facebookButton, lcLogo)

  socialMediaInfo.x = 265;
  socialMediaInfo.y = 210;


  //Set to invisible 
  endCardFinalContainer.addChild(socialMediaInfo, replayButton);
  endCardFinalContainer.alpha = 0;

  stage.addChild(endCardFinalContainer);

  

  replayButton.addEventListener('click', startScreen);
  facebookButton.addEventListener('click', facebookLink);
  tumblrButton.addEventListener('click', tumblrLink);
  twitterButton.addEventListener('click', twitterLink);


  //test image fades in
  var FinalAnim = createjs.Tween.get(endCardFinalContainer, {paused:true})
            .to({alpha:1},1000);
  FinalAnim.setPaused(false);
}


function tumblrLink() {
  window.open("http://lanterncubed.tumblr.com","_blank");
}

function twitterLink() {
  window.open("https://www.twitter.com/LanternCubed","_blank");
}

function facebookLink() {
  window.open("https://www.facebook.com/LanternCubed","_blank");
}