var stage;
var canvas;
var screen_width;
var screen_height;
var bmpAnimation;

//Sprites
var fireplaceSprite
var bellSprite;
var santaSprite;
var characterSprite;


//Sprite Sheets
var boySpriteSheet;
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
var charSelectFrame1;
var charSelectFrame2;
var charSelectToggle;
var charSelectCount = 0;

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
var backgroundvalue     = 0;
var loadProgressLabel;

var characterDiveCount  = 0;

// score and score timer
var scoreDisplay;
var score       = 0;
var finalScore  = 0;
var scoreTimer  = 33;
var multiplier  = 4; 

//End Card
var endCardPhotoStatus  = false;
var endCardPhotoCount   = 0;
var endCardGiftStatus   = false;
var endCardFinalStatus  = false;
var endCardGiftReward;
var endcardFlash;
var endBackground;
var endPhoto; 

var backgroundxDisplay;
var spritexDisplay;
var detectSteps;
var timeDisplay;
var timeDelay;
var warningDisplay;
var warningCountDisplay;
var scoreTimeDisplay;

var gameStatus    = false;

var stepsTaken    = 0;
var alert         = 0;
var alertCount    = 0;
var warning       = 0;
var warningCount  = 0;
var santaCount    = 0;
var totalDodged   = 0;
var totalAlerts   = 0;
var duckAnim      = false;
var dodgeTrigger  = false;
var detection;
var alertStatus;

var keyActive     = true;

var replayButton2;
var replayButton1;
var scoreTimerFunc;
var santaCountFunc;

//Animations
var endCardFlashAnim;
var endPhotoContainerAnim;
var giftBannerAnim;
var giftYouGotAnim;
var giftRewardAnim;
var FinalAnim;


var drumLoop;
var mainMusic;
var musicToggle   = false;
var musicButton;
var musicButtonHitArea;
var soundFXButton;
var soundFXButtonHitArea;
var soundFXToggle   = false;
var mainMusicFade;
var alarmFX;
var boyChooseFX;
var girlChooseFX;
var caughtFX;
var dodgeFX;
var warningFX;
var giftRewardFX;
var cameraShutter;
var charSelectFX;

function init() {
  // conventional initializer
  stage = new createjs.Stage("myCanvas");
  screen_height = stage.canvas.height;
  screen_width = stage.canvas.width;
  stage.enableMouseOver(50);


  manifest = [
    // array of assest (images/music) that load with manifest
    // grabbing assets from the DOM
    {src:"assets/drumloop-draft2.mp3", id:"drumLoopID"},
    {src:"assets/rooftop-dreams-draft4.mp3", id:"mainMusicID"},
    {src:"assets/start-rooftop-draft1.mp3", id:"startMusicID"},
    {src:"assets/alarm-fx.mp3", id:"alarmFXID"},
    {src:"assets/boy-choose-fx.mp3", id:"boyChooseFXID"},
    {src:"assets/girl-choose-fx.mp3", id:"girlChooseFXID"},
    {src:"assets/caught-fx.mp3", id:"caughtFXID"},
    {src:"assets/dodge-fx.mp3", id:"dodgeFXID"},
    {src:"assets/warning2-fx.mp3", id:"warningFXID"},
    {src:"assets/gift-reward.mp3", id:"giftRewardFXID"},
    {src:"assets/camera-shutter.mp3", id:"cameraShutterFXID"},
    {src:"assets/char-select.mp3", id:"charSelectFXID"},
    {src:"assets/PixelFont3.ttf", id:"PixelFont3"},
    {src:"images/presents/present_bear.png", id:"pBear"},
    {src:"images/presents/present_bunny.png", id:"pBunny"},
    {src:"images/presents/present_coal.png", id:"pCoal"},
    {src:"images/presents/present_cowmandobot.png", id:"pCowmandobot"},
    {src:"images/presents/present_eraser.png", id:"pEraser"},
    {src:"images/presents/present_gamebox01.png", id:"pGameBox01"},
    {src:"images/presents/present_gamebox02.png", id:"pGameBox02"},
    {src:"images/presents/present_guy.png", id:"pGuy"},
    {src:"images/presents/present_kitty.png", id:"pKitty"},
    {src:"images/presents/present_poop.png", id:"pPoop"},
    {src:"images/presents/present_powerguy.png", id:"pPowerguy"},
    {src:"images/presents/present_puppy.png", id:"pPuppy"},
    {src:"images/presents/present_socks.png", id:"pSocks"},
    {src:"images/presents/present_sweater01.png", id:"pSweater01"},
    {src:"images/presents/present_sweater02.png", id:"pSweater02"},
    {src:"images/presents/present_sweater03.png", id:"pSweater03"},
    {src:"images/presents/present_sweater04.png", id:"pSweater04"},
    {src:"images/presents/present_sweater05.png", id:"pSweater05"},
    {src:"images/bg_titlecard.png", id:"bg_TitleCard"},
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
    {src:"images/flake_small.png", id:"smallSnow"},
    {src:"images/merrychristmas.png", id:"mcEndCard"}  
    
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
      "idle": [0],
      "initial": [0, 3, true, 10/60],
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

  boySpriteSheet = new createjs.SpriteSheet( {
  // all main strings are reserved strings (images, frames, animations) that do a specific task
    "images": [loader.getResult("boy")],
    // x, y, width, height, imageIndex, regX, regY
    "frames": [
    /*00-01*/   [0,0,42,84,0,21,0],[42,0,42,84,0,21,0],
    /*02-03*/   [0,84,42,84,0,21,0],[42,84,42,84,0,21,0],
    /*04-05*/   [0,168,116,84,0,56,0],[116,168,116,84,0,56,0],
    /*06-11*/   [0,252,42,84,0,21,0],[42,252,42,84,0,21,0],[84,252,42,84,0,21,0],[126,252,42,84,0,21,0],[168,252,42,84,0,21,0],[210,252,42,84,0,21,0],
    /*12-21*/   [0,336,60,84,0,30,0],[60,336,60,84,0,30,0],[120,336,60,84,0,30,0],[180,336,60,84,0,30,0],[240,336,60,84,0,30,0],[300,336,60,84,0,30,0],[360,336,60,84,0,30,0],[420,336,60,84,0,30,0],[480,336,60,84,0,30,0],[540,336,60,84,0,30,0],
    /*22-31*/   [0,420,60,84,0,30,0],[60,420,60,84,0,30,0],[120,420,60,84,0,30,0],[180,420,60,84,0,30,0],[240,420,60,84,0,30,0],[300,420,60,84,0,30,0],[360,420,60,84,0,30,0],[420,420,60,84,0,30,0],[480,420,60,84,0,30,0],[540,420,60,84,0,30,0],
    /*32-41*/   [0,504,100,84,0,56,0],[100,504,100,84,0,56,0],[200,504,100,84,0,56,0],[300,504,100,84,0,56,0],[400,504,100,84,0,56,0],[500,504,100,84,0,56,0],[600,504,100,84,0,56,0],[700,504,100,84,0,56,0],[800,504,100,84,0,56,0],[900,504,100,84,0,56,0],
    /*42-46*/   [0,588,100,84,0,56,0],[100,588,100,84,0,56,0],[200,588,100,84,0,56,0],[300,588,100,84,0,56,0],[400,588,100,84,0,56,0],
    /*47-51*/   [0,672,80,88,0,40,0],[80,672,80,88,0,40,0],[160,672,80,88,0,40,0],[240,672,80,88,0,40,0],[320,672,80,88,0,40,0],
    /*52-57*/   [0,760,46,92,0,23,8],[46,760,46,92,0,23,8],[92,760,46,92,0,23,8],[138,760,46,92,0,23,8],[184,760,46,92,0,23,8],[230,760,46,92,0,23,8]   
    ],
    "animations": {
      "idle": [0,0,"blink",1/150],
      "lookUp": [1],
      "lookLeft": [3],
      "stressed":[4,5,"stressed",5/60],
      "blink": [6,11,"idle",5/60],
      "sneak": [12,31,"sneak",15/60],
      "duck": [32,46,"duckIdle", 20/60],
      "duckIdle":[46],
      "dive": [47,51,false,10/60],
      "pickMe": [52,57,false,8/60],
      "forceDuck": [32, 45, "stressed", 20/60]
    }
  });

  girlSpriteSheet = new createjs.SpriteSheet( {
    // all main strings are reserved strings (images, frames, animations) that do a specific task
    "images": [loader.getResult("girl")],
    // x, y, width, height, imageIndex, regX, regY
    "frames": [
    /*00-01*/   [0,0,40,96,0,20,0],[40,0,40,96,0,20,0],
    /*02-03*/   [0,96,40,96,0,20,0],[40,96,40,96,0,20,0],
    /*04-05*/   [0,192,52,96,0,12,0],[52,192,52,96,0,12,0],
    /*06-11*/   [0,288,40,96,0,20,0],[40,288,40,96,0,20,0],[80,288,40,96,0,20,0],[120,288,40,96,0,20,0],[160,288,40,96,0,20,0],[200,288,40,96,0,20,0],
    /*12-21*/   [0,384,56,96,0,28,0],[56,384,56,96,0,28,0],[112,384,56,96,0,28,0],[168,384,56,96,0,28,0],[224,384,56,96,0,28,0],[280,384,56,96,0,28,0],[336,384,56,96,0,28,0],[392,384,56,96,0,28,0],[448,384,56,96,0,28,0],[504,384,56,96,0,28,0],
    /*22-31*/   [0,480,56,96,0,28,0],[56,480,56,96,0,28,0],[112,480,56,96,0,28,0],[168,480,56,96,0,28,0],[224,480,56,96,0,28,0],[280,480,56,96,0,28,0],[336,480,56,96,0,28,0],[392,480,56,96,0,28,0],[448,480,56,96,0,28,0],[504,480,56,96,0,28,0],
    /*32-41*/   [0,576,56,96,0,20,0],[56,576,56,96,0,20,0],[112,576,56,96,0,20,0],[168,576,56,96,0,20,0],[224,576,56,96,0,20,0],[280,576,56,96,0,20,0],[336,576,56,96,0,20,0],[392,576,56,96,0,20,0],[448,576,56,96,0,20,0],[504,576,56,96,0,20,0],
    /*42-45*/   [0,672,56,96,0,20,0],[56,672,56,96,0,20,0],[112,672,56,96,0,20,0],[168,672,56,96,0,20,0],
    /*46-50*/   [0,768,82,100,0,41,0],[82,768,82,100,0,41,0],[164,768,82,100,0,41,0],[246,768,82,100,0,41,0],[328,768,82,100,0,41,0],
    /*51-56*/   [0,868,42,104,0,22,9],[42,868,42,104,0,22,9],[84,868,42,104,0,22,9],[126,868,42,104,0,22,9],[168,868,42,104,0,22,9],[210,868,42,104,0,22,9]
    ], 
    "animations": {
      "idle": [0,0,"blink",1/150],
      "lookUp": [1],
      "lookLeft": [3],
      "stressed":[4,5,"stressed",5/60],
      "blink": [6,11,"idle",5/60],
      "sneak": [12,31,"sneak", 15/60],
      "duck": [32,45,"duckIdle", 20/60],
      "duckIdle":[45],
      "dive": [46,50,false,10/60],
      "pickMe": [51,56,false,8/60],
      "forceDuck": [32, 45, "stressed", 20/60]
    }
  });

  santaSpriteSheet = new createjs.SpriteSheet( {
  // all main strings are reserved strings (images, frames, animations) that do a specific task
    "images": [loader.getResult("santa")],
    "frames": {height: 150, width: 190, regX: 0, regY: 0},
    "animations": {
      "idle": [0, 35,"idle", 10/60],
      "surprise": [36, 40, "surprise", 20/60]
    }
  });

  //Music Button
  musicButton = new createjs.Text("Music On", "32px PixelFont3", "#FFFFFF");
  musicButtonHitArea = new createjs.Shape();
  musicButtonHitArea.graphics.beginFill("#000000").drawRect(0,0,100,15);
  

  musicButton.x = 425,
  musicButton.y = 253;
  musicButton.alpha = 0.6;
  musicButtonHitArea.x = 0,
  musicButtonHitArea.y = 9;

  musicButton.hitArea = musicButtonHitArea; 

  soundFXButton = new createjs.Text("SoundFX On", "32px PixelFont3", "#FFFFFF");
  soundFXButtonHitArea = new createjs.Shape();
  soundFXButtonHitArea.graphics.beginFill("#000000").drawRect(0,0,100,15);
  

  soundFXButton.x = 403,
  soundFXButton.y = 268;
  soundFXButton.alpha = 0.6;
  soundFXButtonHitArea.x = 0,
  soundFXButtonHitArea.y = 9;
  soundFXButton.hitArea = musicButtonHitArea; 


  mainMusic = createjs.Sound.play("mainMusicID", createjs.Sound.INTERRUPT_NONE, 0, 0, -1, 0.15);
  drumLoop = createjs.Sound.play("drumLoopID", createjs.Sound.INTERRUPT_NONE, 0, 0, -1, 0.3);
  startMusic = createjs.Sound.play("startMusicID", createjs.Sound.INTERRUPT_NONE, 0, 0, -1, 0.3);
  alarmFX = createjs.Sound.play("alarmFXID", createjs.Sound.INTERRUPT_NONE, 0, 0, 0, 0.1, 1);
  boyChooseFX = createjs.Sound.play("boyChooseFXID", createjs.Sound.INTERRUPT_NONE, 0, 0, 0, 0.1);
  girlChooseFX = createjs.Sound.play("girlChooseFXID", createjs.Sound.INTERRUPT_NONE, 0, 0, 0, 0.1);
  caughtFX = createjs.Sound.play("caughtFXID", createjs.Sound.INTERRUPT_NONE, 0, 0, 0, 0.1, 1);
  dodgeFX = createjs.Sound.play("dodgeFXID", createjs.Sound.INTERRUPT_NONE, 0, 0, 0, 0.2, 1); 
  warningFX = createjs.Sound.play("warningFXID", createjs.Sound.INTERRUPT_NONE, 0, 0, 0, 0.2, 1);
  giftRewardFX = createjs.Sound.play("giftRewardFXID", createjs.Sound.INTERRUPT_NONE, 0, 0, 0, 0.3);
  cameraShutterFX = createjs.Sound.play("cameraShutterFXID", createjs.Sound.INTERRUPT_NONE, 0, 0, 0, 0.15);
  charSelectFX = createjs.Sound.play("charSelectFXID", createjs.Sound.INTERRUPT_NONE, 0, 0, 0, 0.3);
  mainMusicFade = new createjs.Tween.get(mainMusic, {paused:true})
                 .to({volume: 0.15}, 2000);

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
  createjs.Sound.stop();
  startMusic.play();
  // crates new stages and properties for assets to live on
  startScreenStatus = true;
  charSelectStatus = false;
  instructionScreenStatus = false;
  startPage = new createjs.Shape();
  startText = new createjs.Text("Start","48px PixelFont3", "#000000");
  startTitle = new createjs.Text("Sneakin' on Santa", "100px PixelFont3", "#fbaf5d");
  startInstruction = new createjs.Text("Instructions","48px PixelFont3", "#000000");
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
  if (startSelectToggle) {
    startSelection.y = 272;
  } else {
    startSelection.y = 242;
  }
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
  musicButton.addEventListener("click", musicButtonClick);
  soundFXButton.addEventListener("click", soundFXButtonClick);

  stage.addChild(startTitleBG, startTitle, startSelection, startText, startInstruction, musicButton, soundFXButton);

  stage.update();
}

function startTextMouseOver() {
  startSelectToggle = false;
  startSelection.y = 242;
  stage.update();
}

function startInstructionMouseOver() {
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


function musicButtonClick() {
  musicToggle = !musicToggle;
  if (!musicToggle) {
    musicButton.text = "Music On";
    mainMusic.setVolume(0.15);
    startMusic.setVolume(0.3);
    drumLoop.setVolume(0.3);
    stage.update();
  } else {
    musicButton.text = "Music Off";
    mainMusic.setVolume(0);
    startMusic.setVolume(0);
    drumLoop.setVolume(0);
    mainMusicFade.setPaused(true);
    stage.update();
  }
}

function soundFXButtonClick() {
  soundFXToggle = !soundFXToggle;
  if (!soundFXToggle) {
    soundFXButton.text = "SoundFX On";
    alarmFX.setVolume(0.1);
    boyChooseFX.setVolume(0.1);
    caughtFX.setVolume(0.1);
    dodgeFX.setVolume(0.2);
    warningFX.setVolume(0.2);
    giftRewardFX.setVolume(0.3);
    cameraShutterFX.setVolume(0.15);
    charSelectFX.setVolume(0.3);
    stage.update();
  } else {
    soundFXButton.text = "SoundFX Off";
    alarmFX.setVolume(0);
    boyChooseFX.setVolume(0);
    caughtFX.setVolume(0);
    dodgeFX.setVolume(0);
    warningFX.setVolume(0);
    giftRewardFX.setVolume(0);
    cameraShutterFX.setVolume(0);
    charSelectFX.setVolume(0);
    stage.update();
  }
}


// When the start button is clicked, remove the start page
// Add score displays

function instructionScreen() {
  createjs.Sound.stop();
  drumLoop.play();
  stage.removeAllChildren();
  startScreenStatus = false;
  charSelectStatus = false;
  instructionScreenStatus = true;
  instructionScreenCount = 0;

  var instructionBanner = new createjs.Shape(); 
  instructionText = new createjs.Text("Press the right arrow key to move", "48px PixelFont3", "#fafcfa");
  instructionText.x = 250;
  instructionText.y = 35;
  instructionText.textAlign = "center";
  instructionBanner.graphics.beginFill("F25050").drawRect(0,0,screen_width,60);
  instructionBanner.alpha = 0.9;
  instructionBanner.y = 30;
  instructionBoy = new createjs.Sprite(boySpriteSheet, "idle");
  instructionBoy.x = 45;
  instructionBoy.y = 200;
  instructionBell = new createjs.Sprite(bellSpriteSheet, "initial");
  instructionBell.x = 450;
  instructionBell.y = 100;



  // Boy moves across the screen 2 times
  var instructionBoyAnim = new createjs.Tween.get(instructionBoy, {paused:true})
            .wait(500)          //500
            .to({x:250},2000)   //2500
            .wait(1000)         //3500
            .to({x:45},0)       
            .to({x:250},2000)   //5500
            .wait(1000);         //6000

  instructionBoyAnim.setPaused(false);
  createjs.Ticker.addEventListener("tick", instructionScreenAnimation);

  stage.addChild(background, instructionBanner, instructionText, instructionBoy, instructionBell);
  instructionBell.gotoAndStop("initial");
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
  } else if ( instructionScreenCount == 3.5*60) {
    instructionBoy.gotoAndPlay("sneak");
  } else if ( instructionScreenCount == 5.5*60) {
    instructionBoy.gotoAndPlay("idle");
  } else if ( instructionScreenCount == 6.5*60) {

    instructionBoy.gotoAndPlay("duck");
    instructionText.text = "Press down or space to duck";

  } else if ( instructionScreenCount == 9*60) {
    warningFX.play({loop:1});
    instructionBell.gotoAndPlay("initial");
    instructionBoy.gotoAndPlay("idle");
    instructionText.text = "Beware of Santa's gaze!";
  } else if ( instructionScreenCount == 13*60) {
    alarmFX.play();
    instructionBell.gotoAndPlay("ringing");
    instructionBoy.gotoAndPlay("duck");
    instructionText.text = "Duck to avoid being noticed";
  } else if ( instructionScreenCount == 17*60) {
    instructionBoy.gotoAndPlay("stressed");
    instructionText.text = "or else...";
  } else if ( instructionScreenCount == 21*60) {
    //Return to start screen and remove ticker
    warningFX.stop();
    alarmFX.stop();
    startScreen();
    createjs.Tween.removeTweens(instructionBoy);
    createjs.Ticker.removeEventListener("tick", instructionScreenAnimation);
  }

  
}


function charScreen() {
  createjs.Sound.stop();
  drumLoop.play();
  startScreenStatus = false; 
  charSelectStatus = true;
  // create shapes and containers
  charSelectFrame1 = new createjs.Shape();
  charSelectFrame2 = new createjs.Shape();
  var charPage = new createjs.Shape();
  var charTitle = new createjs.Text("Select Your Character", "48px PixelFont3", "#666");
  var boyDisplay = new createjs.Shape();
  var boyDisplayContainer = new createjs.Container();
  var girlDisplay = new createjs.Shape();
  var girlDisplayContainer = new createjs.Container();
  var charDisplayWidth = 100;
  var charDisplayHeight = 150;
  charSelectCount = 0;



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

  charSelectBoy.x = 0;
  charSelectBoy.y = -30; 
  charSelectGirl.x = 0;
  charSelectGirl.y = -40; 

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

  charSelectFrame1.graphics.beginStroke("#F25050").setStrokeStyle(4).drawRect(0,0,charDisplayWidth+10,charDisplayHeight+10);
  charSelectFrame1.regX = (charDisplayWidth+10)/2;
  charSelectFrame1.regY = (charDisplayHeight+10)/2;
  charSelectFrame1.x = 125;
  charSelectFrame1.y = 150;

  charSelectFrame2.graphics.beginStroke("#FFFFFF").setStrokeStyle(4).drawRect(0,0,charDisplayWidth+10,charDisplayHeight+10);
  charSelectFrame2.regX = (charDisplayWidth+10)/2;
  charSelectFrame2.regY = (charDisplayHeight+10)/2;
  charSelectFrame2.x = 125;
  charSelectFrame2.y = 150;




  //put stuff into its containers
  boyDisplayContainer.addChild(boyDisplay, charSelectBoy);
  girlDisplayContainer.addChild(girlDisplay, charSelectGirl );

  //put is all on the main screen
  stage.addChild(startTitleBG, boyDisplayContainer, girlDisplayContainer, charTitle, charSelectFrame2, charSelectFrame1, musicButton, soundFXButton);

  //add eventListeners (hover, clikc etc..)
  boyDisplayContainer.addEventListener("rollover",charBoyMouseOver);
  girlDisplayContainer.addEventListener("rollover",charGirlMouseOver);
  boyDisplayContainer.addEventListener("click",charBoyClick);
  girlDisplayContainer.addEventListener("click",charGirlClick);
  


  stage.update();
}
function boySelect() {
  character = 0;
  charSelectFX.play();
  charSelectBoy.gotoAndPlay("pickMe");
  createjs.Ticker.addEventListener("tick",charSelectAnim);
}

function girlSelect() {
  character = 1;
  charSelectFX.play();
  charSelectGirl.gotoAndPlay("pickMe");
  createjs.Ticker.addEventListener("tick",charSelectAnim);
}


function charBoyMouseOver() {
  if (charSelectStatus) {
    boyChooseFX.stop();
    boyChooseFX.play();


    charSelectToggle = false;
    charSelectFrame1.x = 125;
    charSelectFrame2.x = 125;
    stage.update();
  }
}

function charGirlMouseOver() {
  if (charSelectStatus) {        
    boyChooseFX.stop();
    boyChooseFX.play();

    charSelectToggle = true;
    charSelectFrame1.x = 375;
    charSelectFrame2.x = 375;
    stage.update();
  }
}

function charBoyClick() {
  if (!charSelectToggle && charSelectStatus) {
    boySelect();
  }
}

function charGirlClick() {
  if (charSelectToggle && charSelectStatus) {
    girlSelect();
  }
}

function charSelectAnim() {
  charSelectStatus = false;

  var charSelectFrameAnim = createjs.Tween.get(charSelectFrame1)
                        .to({alpha:0},75)
                        .to({alpha:1},75)
                        .to({alpha:0},75)
                        .to({alpha:1},75)
                        .to({alpha:0},75)
                        .to({alpha:1},75)
                        .to({alpha:0},75)
                        .to({alpha:1},75)
                        .to({alpha:0},75)
                        .to({alpha:1},75);
  charSelectFrameAnim.setPaused(false);
  if (charSelectCount == 1*60 ) {
    // charSelectFrameAnim.setPaused(true);
    createjs.Ticker.removeEventListener("tick",charSelectAnim);
    createjs.Tween.removeTweens(charSelectFrame1);
    startGame();
    stage.update();

  }

  charSelectCount++;
  stage.update();
}



// Create the starting point of the game
function startGame() {

  createjs.Sound.stop();
  mainMusic.play({volume: 0});
  if (!musicToggle) {
    mainMusicFade.setPaused(false);
  }
  stage.removeAllChildren();
  charSelectStatus = false;
  gameStatus = true;
  characterDiveCount = 0;
  stage.removeAllEventListeners("click");
  stage.removeAllEventListeners("rollover");
  backgroundContainer = new createjs.Container();
  scoreDisplay = new createjs.Text("Score: 0", "36px PixelFont3", "#FFFFFF");
  
  //TODO: for testing movment and score
  backgroundxDisplay = new createjs.Text("bg: 0", "20px PixelFont3", "#FFFFFF");
  spritexDisplay = new createjs.Text("sprite: 0", "20px PixelFont3", "#FFFFFF"); 
  scoreTimeDisplay = new createjs.Text("sprite: 0", "32px PixelFont3", "#FFFFFF");

  //TODO: for testing alert
  detectSteps = new createjs.Text("Steps: 0", "32px PixelFont3", "#FFFFFF");
  alertStatus = new createjs.Text("Alert: false", "32px PixelFont3", "#FFFFFF");
  timeDelay = new createjs.Text("Alert: false", "32px PixelFont3", "#FFFFFF");

  warningDisplay = new createjs.Text("Alert: false", "32px PixelFont3", "#FFFFFF");
  warningCountDisplay = new createjs.Text("Alert: false", "32px PixelFont3", "#FFFFFF");

  //TODO: second count
  timeDisplay = new createjs.Text("Alert: false", "32px PixelFont3", "#FFFFFF")




  //fill the background at 0,0 to the size of the screen
  
  
  scoreDisplay.x = 175;
  scoreDisplay.y = 100;

  scoreTimeDisplay.x = 175;
  scoreTimeDisplay.y = 120;

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

  warningCountDisplay.x = 350;
  warningCountDisplay.y = 120;


//Boy Selection
  if (character == 0) {

    characterSprite = new createjs.Sprite(boySpriteSheet, "idle");
    characterSprite.setTransform(100,200,1,1);
    characterSprite.framerate = 60;
}



//Girl Selection
  else if (character == 1) {
    
    characterSprite = new createjs.Sprite(girlSpriteSheet, "idle");
    characterSprite.setTransform(100,192,1,1);
    characterSprite.framerate = 60;
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
  
  fireplaceSprite = new createjs.Sprite(fireplaceSpriteSheet, "idle");
  fireplaceSprite.setTransform(0,0,1,1);

  fireplaceSprite.framerate = 60;

  bellSprite.x = 440;
  bellSprite.y = 75;
  bellSprite.gotoAndStop("initial");


  
    // setTransform sets sprites x and y coordinates and scale


  santaSprite = new createjs.Sprite(santaSpriteSheet, "idle");
  santaSprite.setTransform(830,125,1,1);


  backgroundContainer.addChild(background, fireplaceSprite, santaSprite);

  // .addchild put everythign on the screen
  stage.addChild(backgroundContainer, characterSprite, bellSprite, musicButton, soundFXButton);



  if(gameStatus) {
    santaAlert();
    gameScore();
  }
  
  // not sure what .timingMode is
  // .Ticker adds continuous timer
  createjs.Ticker.timingMode = createjs.Ticker.TIMEOUT;
  createjs.Ticker.setFPS(60);
  createjs.Ticker.addEventListener("tick", stageUpdate);
}



function gameScore() {
  scoreTimerFunc = setInterval(function() {
    scoreTimer--;
  }, 1000);
}

function santaAlert() {
  santaCountFunc = setInterval(function() {
    santaCount++;
    if(santaCount > 2) {
      santaCount = 0;
    }
    if(alertCount > 2) {
      santaCount = 0;
    }
    // when santa counts to this number, check if hes alerted
    if(santaCount == 2 && gameStatus){ 
      // selects a number from 1 - 10
      detection =  Math.floor((Math.random()*10)+1);
      console.log(detection);

      // if detection is any of these numbers
      //TODO - frequency of detection up
      if (characterSprite.x >= 0 && backgroundContainer.x >= 0 ) {
        console.log("Q1");
        switch(detection) {
          case 2:
          case 4:
          case 5:
          case 6:
          case 8:
          case 10:
            warningFX.play();
            bellSprite.gotoAndPlay("initial");
            warning = 1;
            break;
          default:
            warning = 0;
            break;
        }
      }
      else if (backgroundContainer.x <= -100 && backgroundContainer.x > -300) {
        console.log("Q3");
        switch(detection) {
          case 1:
          case 2:
          case 4:
          case 5:
          case 6:
          case 8:
          case 9:
          case 10:
            warningFX.play();
            bellSprite.gotoAndPlay("initial");
            warning = 1;
            break;
          default:
            warning = 0;
            break;
        }
      }
      else if (backgroundContainer.x <= -300 && characterSprite.x <= 300) {
        console.log("Q5");
        switch(detection) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
          case 8:
          case 9:
          case 10:
            warningFX.play();
            bellSprite.gotoAndPlay("initial");
            warning = 1;
            break;
          default:
            warning = 0;
            break;
        }
      }
    }

    // warns player before santa is alerted
    // change warning count to make shorter or longer
    // minus 1 from warning count for accuracy 
    if(warning == 1) {
      warningCount++;
      if(warningCount == 2) {
        
        bellSprite.gotoAndPlay("ringing");
        warningFX.stop();
        alarmFX.play();
        alert = 1;
        warningCount = 0;
      }
    }

    if(alert == 1 && gameStatus) {
      forceduck();
      bellSprite.advance;
      santaCount = 0;
      warning = 0;
      alertCount++;
    }
  }, 1000);

  stageUpdate();
}

function forceduck() {
  santaSprite.gotoAndPlay("surprise");

  // if the playing is not ducking or if player stops ducking while santa is looking, do this
  if(dodgeTrigger == false) {
    keyActive     = false;
    rightPressed  = false;
    upPressed     = false;
    leftPressed   = false;

    // make sure duck animation plays only once
    if(!duckAnim) {
      characterSprite.gotoAndPlay("forceDuck");
      duckAnim    = true;
      return;
    }
    if(alertCount == 5) {
      characterSprite.gotoAndStop("idle");
      santaSprite.gotoAndPlay("idle");
      bellSprite.gotoAndStop("initial");
      alarmFX.stop();
      caughtFX.play();
      totalAlerts++;
      scoreTimer       -= 1;
      alert             = 0;
      alertCount        = -1;
      keyActive         = true;
      duckTrigger       = false;
      duckAnim          = false;
      anyKeyPressed     = false;
    }
  }
  // if player IS ducking, do this
  else {
    if(alertCount == 2) {
      santaSprite.gotoAndPlay("idle");
      bellSprite.gotoAndStop("initial");
      alarmFX.stop();
      dodgeFX.play();
      totalAlerts++;
      totalDodged++;
      scoreTimer       += 2;
      alert             = 0;
      alertCount        = -1;
      keyActive         = true;
      duckAnim          = false;
    }
  }
  
  stage.update();

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
          dodgeTrigger = true;
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
          characterSprite.gotoAndPlay("idle");
          anyKeyPressed = false;
          break;
        }  
        case KEYCODE_RIGHT:
        case KEYCODE_D: {
          rightPressed = false;
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
          dodgeTrigger = false;
          characterSprite.gotoAndPlay("idle");
          anyKeyPressed = false;
          break;
        }
      }
  }

    }
  //During the end card photo, press esc, enter or space to skip it
  if(endCardPhotoStatus) {
    if(e.keyCode == KEYCODE_ESC || e.keyCode == KEYCODE_ENTER || e.keyCode == KEYCODE_SPACE  ) {
      endCardPhotoStatus = false;
      endCardPhotoTransition();
    }
  
  }
// If the game is in the instruction screen, press space or enter to skip
// and return to the start screen
  if (instructionScreenStatus && !charSelectStatus && !startScreenStatus) {
    switch(e.keyCode) {
      case KEYCODE_ENTER:
      case KEYCODE_SPACE:
      warningFX.stop();
      alarmFX.stop();
      startScreen();
      instructionScreenStatus = false;
      createjs.Ticker.removeEventListener("tick", instructionScreenAnimation);
      e = 0;
      break;
    }
  }

// If the game is at the Character Select screen, press left or right to
// chose between the characters
  if (charSelectStatus && !instructionScreenStatus && !startScreenStatus) {
    switch(e.keyCode) {
      case KEYCODE_LEFT:
      case KEYCODE_A:
      case KEYCODE_RIGHT:
      case KEYCODE_D:
      boyChooseFX.stop();
      boyChooseFX.play();
      charSelectToggle = !charSelectToggle; 
      
      // IF startSelectToggle is true, cursor on "Instructions"
      if (charSelectToggle) {
        charSelectFrame1.x = 375;
        charSelectFrame2.x = 375;
        stage.update();
        break;
      } else {
        charSelectFrame1.x = 125;
        charSelectFrame2.x = 125;
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

  if (startScreenStatus && !instructionScreenStatus && !charSelectStatus) {
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
  if ( endCardFinalStatus) {
    switch(e.keyCode) {
      case KEYCODE_ENTER:
      restart();
      break;
    }
  }


}


function restart() {
  score = 0;
  stepsTaken = 0;
  scoreTimer = 33;

  createjs.Ticker.removeEventListener("tick",endCardUpdate);
  createjs.Ticker.removeEventListener("tick",endCardFlashAnim);
  createjs.Ticker.removeEventListener("tick",endPhotoContainerAnim);
  createjs.Ticker.removeEventListener("tick",giftBannerAnim);
  createjs.Ticker.removeEventListener("tick",giftYouGotAnim);
  createjs.Ticker.removeEventListener("tick",giftRewardAnim);
  createjs.Ticker.removeEventListener("tick",FinalAnim);
  createjs.Ticker.removeEventListener("tick",characterDiveAnim);
  // createjs.Tween.removeTweens(endCardFlash);
  // createjs.Tween.removeTweens(endPhotoContainer);
  // createjs.Tween.removeTweens(endCardGiftBanner);
  // createjs.Tween.removeTweens(endCardGiftYouGot);
  // createjs.Tween.removeTweens(endCardGiftReward);
  // createjs.Tween.removeTweens(endCardFinalContainer);
  createjs.Ticker.removeEventListener("tick",stageUpdate);
  // createjs.Ticker.removeAllEventListeners();
  clearInterval(scoreTimerFunc);
  clearInterval(santaCountFunc);
  //Restore default values
  instructionScreenCount = 0;
  charSelectToggle = false;
  charSelectCount = 0;
  startScreenStatus = false;
  startSelectToggle = false;
  charSelectStatus = false;
  instructionScreenStatus = false;
  instructionScreenCount = 0;
  character = -1;
  score = 0;
  backgroundvalue = 0;
  characterDiveCount = 0;
  endCardPhotoStatus = false;
  endCardPhotoCount = 0;
  endCardGiftStatus = false;
  endCardFinalStatus = false;

  gameStatus = false;
  stepsTaken = 0;
  alert = 0;
  alertCount = 0;
  warning = 0;
  warningCount = 0;
  santaCount = 0;
  detection;
  alertStatus;
  duckAnim = false;
  dodgeTrigger = false;
  keyActive = true;
  characterSprite.x = 100;
  backgroundContainer.x = 0;
  leftPressed = false;
  rightPressed = false;
  duckTrigger = false;
  upPressed = false;
  anyKeyPressed = false;
  // take out EVERYTHING
  stage.removeAllChildren();
  startScreen();
}

function stageUpdate(event) {

  // TODO: get this outta here when done, TESTING
  // detectSteps.text = "steps: " + stepsTaken + " ";
  // alertStatus.text = "alert: " + alert + " ";
  // timeDelay.text = "delay: " + alertCount + " ";
  // timeDisplay.text = "time: " + santaCount + " ";
  // warningCountDisplay.text = "warningCount: " + warningCount;
  // warningDisplay.text = "warning: " + warning;
  // scoreDisplay.text = "Score: " + score + " X" + multiplier;
  // scoreTimeDisplay.text = "Gametime: " + scoreTimer;


  score = stepsTaken;

  if(scoreTimer <= 30 && scoreTimer >= 27) {
    multiplier = 4;
  }else if(scoreTimer <= 26 && scoreTimer >= 22) {
    multiplier = 3.5;
  }else if(scoreTimer <= 21 && scoreTimer >= 18) {
    multiplier = 3;
  }else if(scoreTimer <= 17 && scoreTimer >= 14) {
    multiplier = 2.5;
  }else if(scoreTimer <= 13 && scoreTimer >= 10) {
    multiplier = 2;
  }else if(scoreTimer <= 9 && scoreTimer >= 6) {
    multiplier = 1.5;
  }else if(scoreTimer <= 5 && scoreTimer >= 2) {
    multiplier = 1;
  }else if(scoreTimer <= 2 && scoreTimer >= 1) {
    multiplier = 0.5;
  }else if(scoreTimer <= 0) {
    multiplier = 0;
  }


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
  if ((duckTrigger && !anyKeyPressed) || (duckTrigger && upPressed) || (duckTrigger && leftPressed) || (duckTrigger && rightPressed)) {
    characterSprite.gotoAndPlay("duck");
    anyKeyPressed = true;
  }

  // if((duckTrigger && upPressed) || (duckTrigger && leftPressed) || (duckTrigger && rightPressed)) {
  //   leftPressed = false;
  //   rightPressed = false;
  //   upPressed = false;
  //   characterSprite.gotoAndPlay("duck");
  //   anyKeyPressed = true;
  // }

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

  //Pressed the Right Arrow Key **********
  if (!leftPressed && rightPressed && !duckTrigger && !upPressed) {
    //set the X scale to -1 to flip along the horizontal

    //So the backgroundContainer will move till it hits the end.
    if ((characterSprite.x >= 15 && characterSprite.x < 200 && backgroundContainer.x == 0) || 
    (characterSprite.x >= 200 && characterSprite.x < 400 && backgroundContainer.x == -500)) {
      characterSprite.x++;
    } 
    if (characterSprite.x == 200 && -500 <= backgroundContainer.x && backgroundContainer.x <= 0) {
      backgroundContainer.x--;
    }
  }



  // If left and right are pressed at the same time or nothing is pressed
  // return to the standing animation
  if (((!duckTrigger&&!leftPressed&&!rightPressed&&!upPressed) || (rightPressed&&leftPressed) || (rightPressed&&upPressed)) && alert != 1) {
    characterSprite.gotoAndStop("idle");

    anyKeyPressed = false;
  }

  if (characterSprite.x >= 340) {
    santaSprite.gotoAndPlay("surprise");
  }

  if (characterSprite.x >= 350) {
    gameStatus = false;
    characterDiveCount++;
    if (characterDiveCount <= 5) {
      characterSprite.gotoAndPlay("dive");
    } else if (characterDiveCount == 0.75*60) {
      endCardPhoto();
    }
    characterDiveAnim = createjs.Tween.get(characterSprite, {paused:true})
                          .to({x:390, y:160},300);
    characterDiveAnim.setPaused(false);
  }

  stage.update();
}

//First stage of the end cards
//displays the photo of character and santa for 5 seconds
function endCardPhoto() {
  /*if(scoreTimer < )*/
  mainMusic.setVolume(0.05);
  cameraShutterFX.play();
  if(!gameStatus) {
    finalScore = parseInt(score * (multiplier + (totalDodged/totalAlerts)) );
  }

  endCardPhotoStatus = true;
  characterSprite.x = 120;

  stage.removeAllChildren();
  endCardMerry = new createjs.Shape();
  endPhoto = new createjs.Shape();
  endBackground = new createjs.Shape();
  endCardFlash = new createjs.Shape();

  endCardEnterSkip = new createjs.Text("Press Enter to skip >", "32px PixelFont3", "#FFFFFF");
  endCardEnterSkip.alpha = 0.3;
  endPhotoContainer = new createjs.Container();

  if (character == 0) {
    endPhoto.graphics.beginBitmapFill(loader.getResult("endcard_boy")).drawRect(0,0,500,300);
  } else if (character == 1) {
    endPhoto.graphics.beginBitmapFill(loader.getResult("endcard_girl")).drawRect(0,0,500,300);
  }

  endCardMerry.graphics.beginBitmapFill(loader.getResult("mcEndCard")).drawRect(0,0,216,71);
  endBackground.graphics.beginFill("#000000").drawRect(0,0,screen_width,screen_height);
  endCardFlash.graphics.beginFill("#FFFFFF").drawRect(0,0,screen_width,screen_height);

  endCardFlashAnim = createjs.Tween.get(endCardFlash, {paused:true})
          .to({alpha:0},500);

  endCardFlashAnim.setPaused(false);

  endCardEnterSkip.x = 310;
  endCardEnterSkip.y = 270;

  endCardMerry.x = 275;
  endCardMerry.y = 100;
 
  endPhotoContainer.addChild(endPhoto, endCardEnterSkip, endCardMerry);

  stage.addChild(endBackground, endPhotoContainer, endPhoto, endCardFlash);

  createjs.Ticker.addEventListener("tick", endCardUpdate);

}

function endCardUpdate() {
    endCardPhotoCount++;
   
  // Convect the fps to seconds 
  if (endCardPhotoStatus && endCardPhotoCount  == 5*60) {
    //When the time is 5 seconds, continue to the next end card

    endCardPhotoTransition();
  }


  stage.update();
}


function endCardPhotoTransition() {
  //Photo and text fade away and move to the Gift end card   
  endPhotoContainerAnim = createjs.Tween.get(endPhotoContainer, {paused:true})
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
  giftRewardFX.play({delay:1500});
  stage.removeAllChildren();


  endCardGiftBanner = new createjs.Shape();
  endCardGiftYouGot = new createjs.Text("YOU GOT", "160px PixelFont3", "#FFFFFF");
  endCardGiftReward = new createjs.Shape();
  endCardGiftYouGot.y = 50;
  endCardGiftYouGot.x = 500;

  if (finalScore >= 1000) {
    //Game Box
      switch(Math.floor((Math.random()*2)+1)) {
      case 1:
      endCardGiftReward.graphics.beginBitmapFill(loader.getResult("pGameBox01")).drawRect(0,0,500,131);
      break;
      case 2:
      endCardGiftReward.graphics.beginBitmapFill(loader.getResult("pGameBox02")).drawRect(0,0,500,131);
      break;
    }
  } else if (finalScore >= 875) {
    //Pet
      switch(Math.floor((Math.random()*2)+1)) {
      case 1:
      endCardGiftReward.graphics.beginBitmapFill(loader.getResult("pKitty")).drawRect(0,0,500,131);
      break;
      case 2:
      endCardGiftReward.graphics.beginBitmapFill(loader.getResult("pPuppy")).drawRect(0,0,500,131);
      break;
    }
  } else if (finalScore >= 750) {
    //Action Figure100
    switch(Math.floor((Math.random()*3)+1)) {
      case 1:
      endCardGiftReward.graphics.beginBitmapFill(loader.getResult("pCowmandobot")).drawRect(0,0,500,131);
      break;
      case 2:
      endCardGiftReward.graphics.beginBitmapFill(loader.getResult("pGuy")).drawRect(0,0,500,131);
      break;
      case 3:
      endCardGiftReward.graphics.beginBitmapFill(loader.getResult("pPowerguy")).drawRect(0,0,500,131);
      break;
    }
  } else if (finalScore >= 625) {
    //Sweater
    switch(Math.floor((Math.random()*5)+1)) {
      case 1:
      endCardGiftReward.graphics.beginBitmapFill(loader.getResult("pSweater01")).drawRect(0,0,500,131);
      break;
     
      case 2:
      endCardGiftReward.graphics.beginBitmapFill(loader.getResult("pSweater02")).drawRect(0,0,500,131);
      break;
     
      case 3:
      endCardGiftReward.graphics.beginBitmapFill(loader.getResult("pSweater03")).drawRect(0,0,500,131);
      break;
     
      case 4:
      endCardGiftReward.graphics.beginBitmapFill(loader.getResult("pSweater04")).drawRect(0,0,500,131);
      break;
     
      case 5:
      endCardGiftReward.graphics.beginBitmapFill(loader.getResult("pSweater05")).drawRect(0,0,500,131);
      break;
    }

  } else if (finalScore >= 500) {
    //Socks
    endCardGiftReward.graphics.beginBitmapFill(loader.getResult("pSocks")).drawRect(0,0,500,131);
  } else if (finalScore >= 375) {
    //Eraser
    endCardGiftReward.graphics.beginBitmapFill(loader.getResult("pEraser")).drawRect(0,0,500,131);
  } else if (finalScore >= 250) {
    //Coal
    endCardGiftReward.graphics.beginBitmapFill(loader.getResult("pCoal")).drawRect(0,0,500,131);  
  } else if (finalScore >= 0) {
    //Poop
    endCardGiftReward.graphics.beginBitmapFill(loader.getResult("pPoop")).drawRect(0,0,500,131);
  }

  endCardGiftBanner.graphics.beginFill("#f74f4d").drawRect(screen_width,70,screen_width,120);
  
  endCardGiftReward.y = 65;
  endCardGiftReward.x = 500;

  stage.addChild(endBackground, endCardGiftBanner, endCardGiftYouGot, endCardGiftReward);


  //Gift Card Animation

  // Red banner pans across the screen
  giftBannerAnim = createjs.Tween.get(endCardGiftBanner, {paused:true})
                  .wait(2600)
                  .to({x:-500},500,createjs.Ease.linear);
                  // 
                  // .to({x:1000},400,createjs.Ease.linear);
  // The words YOU GOT moves across the screen
  giftYouGotAnim = createjs.Tween.get(endCardGiftYouGot, {paused:true})
                    .to({x:120},400,createjs.Ease.linear)
                    .to({x:80},2000,createjs.Ease.linear)
                    .to({x:-500},400,createjs.Ease.linear);
  // the gift name pans across
  giftRewardAnim = createjs.Tween.get(endCardGiftReward, {paused:true})
                  .wait(3100)
                  .to({x:0},300,createjs.Ease.linear)
                  .wait(3100)
                  // .to({x:500},400,createjs.Ease.linear)
                  .call(endCardFinal);

  //Animation Timeline
  var giftTimeline = new createjs.Timeline([giftBannerAnim, giftYouGotAnim, giftRewardAnim], {paused:true})
  giftTimeline.setPaused(false);
} 

  //Third stage of the end cards
  //Display social media info and score
function endCardFinal() {
  endCardGiftStatus = false;
  endCardFinalStatus = true;
  mainMusic.setVolume(0.15);
  stage.removeChild(endCardGiftYouGot)
  //stage.removeAllChildren();
  var replayButtonHitArea = new createjs.Shape();
  endCardFinalScore = new createjs.Text("You Scored 102", "96px PixelFont3", "#fbaf5d");
  endCardFinalScore.textAlign = "center";
  endCardFinalScore.textBaseline = "alphabetic";
  endCardFinalScore.x = 250;
  endCardFinalScore.y = 55;
  endCardFinalScore.text = "You Scored: " + finalScore;

  replayButton1 = new createjs.Text("Replay?", "128px PixelFont3", "#fbaf5d");
  replayButton1.textAlign = "center";
  replayButton1.textBaseline = "alphabetic";
  replayButton1.x = 130;
  replayButton1.y = 265;

  replayButton2 = new createjs.Text("Replay?", "128px PixelFont3", "#FFFFFF");
  replayButton2.textAlign = "center";
  replayButton2.textBaseline = "alphabetic";
  replayButton2.x = 130;
  replayButton2.y = 265;

  replayButtonHitArea.graphics.beginFill("#FFFFFF").drawRect(-125,-64,250,128);

  var backgroundxDisplay = new createjs.Text("bg: 0", "20px PixelFont3", "#FFFFFF");
  var spritexDisplay = new createjs.Text("sprite: 0", "20px PixelFont3", "#FFFFFF"); 
  var scoreTimeDisplay = new createjs.Text("sprite: 0", "32px PixelFont3", "#FFFFFF");
  
  //TODO TYLER FINAL TESTING VALUES
  // detectSteps.text = "steps: " + stepsTaken + " ";
  // alertStatus.text = "alert: " + totalAlerts + " ";
  // timeDelay.text = "delay: " + alertCount + " ";
  // timeDisplay.text = "time: " + santaCount + " ";
  // warningCountDisplay.text = "dodgeCount: " + totalDodged;
  // warningDisplay.text = "warning: " + warning;
  // scoreDisplay.text = "Score: " + score + " X" + multiplier;
  // scoreTimeDisplay.text = "Gametime: " + scoreTimer;
  






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
  replayButton1.hitArea = replayButtonHitArea;

  socialMediaInfo.addChild(tumblrButton, twitterButton, facebookButton, lcLogo);

  socialMediaInfo.x = 265;
  socialMediaInfo.y = 205;


  //Set to invisible 
  endCardFinalContainer.addChild(socialMediaInfo, endCardFinalScore, replayButton2, replayButton1);
  endCardFinalContainer.alpha = 0;

  stage.addChild(endCardFinalContainer);
//TODO: Remove LATER
  // stage.addChild(detectSteps, alertStatus, scoreTimeDisplay, warningCountDisplay, scoreDisplay);
  

  replayButton1.addEventListener('click', restart);
  facebookButton.addEventListener('click', facebookLink);
  tumblrButton.addEventListener('click', tumblrLink);
  twitterButton.addEventListener('click', twitterLink);
  replayButton1.addEventListener("rollover",replayButtonMouseOver);
  replayButton1.addEventListener("rollout",replayButtonMouseOut);
  //test image fades in
  facebookButton.cursor='pointer';
  tumblrButton.cursor='pointer';
  twitterButton.cursor='pointer';
  
  FinalAnim = createjs.Tween.get(endCardFinalContainer, {paused:true})
            .to({alpha:1},1000);
  FinalAnim.setPaused(false);
}
function replayButtonMouseOver() {
  replayButton1.alpha = 0;
}

function replayButtonMouseOut() {
  replayButton1.alpha = 1;
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