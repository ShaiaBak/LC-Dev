var stage;
var canvas;
var screen_width;
var screen_height;
var bmpAnimation;
var megaman;
var megamanSprite;
var fireplaceSprite
var bellSprite;
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
var KEYCODE_ESC = 27;    

var leftPressed = false;
var rightPressed = false;
var spacePressed = false;
var anyKeyPressed = false;


document.onkeydown = handleKeyDown;
document.onkeyup = handleKeyUp;

var character = -1;

var background;
var startPage;
var startText;
var scoreDisplay;
var backgroundxDisplay;
var spritexDisplay;
var detectSteps;
var score = 0;
var backgroundvalue = 0;
var loadProgressLabel;
var endCardPhotoStatus = false;
var endCardPhotoCount = 0;
var endCardGiftStatus = false;
var endCardFinalStatus = false;

var stepsTaken = 0;
var alert = 0;

var alertStatus;

function init() {
  // conventional initializer
  stage = new createjs.Stage("myCanvas");
  screen_height = stage.canvas.height;
  screen_width = stage.canvas.width;

 

  manifest = [
    // array of assest (images/music) that load with manifest
    // grabbing assets from the DOM
    {src:"images/megaman.png", id:"megaman"},
    {src:"images/megamanred.png", id:"megamanred"},
    {src:"images/ChristmasBG_70.png", id:"background"},
    {src:"images/bg_firesprites.png", id:"fireplace"},
    {src:"images/endcard_info_tumblr.png", id:"tumblrButtonImg"},
    {src:"images/endcard_info_twitter.png", id:"twitterButtonImg"},
    {src:"images/endcard_info_facebook.png", id:"facebookButtonImg"},
    {src:"images/endcard_logo.png", id:"lcLogoImg"},
    {src:"images/bell.png", id:"bell"},
    {src:"images/endcard_boy.png", id:"endcard_boy"},
    {src:"images/endcard_girl.png", id:"endcard_girl"},
    {src:"assets/Test.mp3", id:"music"}
  ];
  loader = new createjs.LoadQueue(false);
  loadingInitialize();
  //Not completely sure what this does. I think it runs handlerComplete when
  //the files are done loading

  loader.installPlugin(createjs.Sound);
  loader.addEventListener("complete", handleComplete);
  loader.addEventListener("progress", handleProgress);
  // loads the manifest
  loader.loadManifest(manifest);
  loadingInitialize();
  stage.update();
}

//this function is called everytime the progress of our loading changes
function handleProgress() {
  //loadingBar.scaleX = loader.progress * 300;
  progressPercentage = Math.round(loader.progress*100);
  var progressPercentageInt = progressPercentage % 5;
  bellSprite.gotoAndStop(progressPercentageInt); 

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
  // the canvas is now clickable and will run loadingScreenClick
  stage.removeChild(bellSprite);
 stage.addEventListener("click", loadingScreenClick);
}

//Creates everything related to the loading screen
function loadingInitialize() {
  
  //define loading screen graphics
  loadProgressLabel = new createjs.Text("","48px PixelFont3","black");
  loadingScreenFill = new createjs.Shape();
  // loadingBar = new createjs.Shape();
  // loadingBarFrame = new createjs.Shape();
  // loadingBarContainer = new createjs.Container();
  // loadingBarHeight = 20;
  // loadingBarWidth = 300;

  loadProgressLabel.lineWidth = 2000;
  loadProgressLabel.textAlign = "center";
  loadProgressLabel.x = screen_width/2;
  loadProgressLabel.y = screen_height/2 - 20;

  //Fill background with gray
  loadingScreenFill.graphics.beginFill("#000000").drawRect(0,0,screen_width,screen_height).endFill();

	var bellSpriteSheet = new createjs.SpriteSheet( {
	// all main strings are reserved strings (images, frames, animations) that do a specific task
		"images": ["images/bell.png"],
		"frames": {height: 47, width: 42, regX: 21, regY: 0},
		"animations": {
			"initial": [0, 3, 5/60],
			"ringing": [4, 5,"ringing", 5/60]
		}
	});

	bellSprite = new createjs.Sprite(bellSpriteSheet, "initial");
	bellSprite.setTransform(screen_width/2,screen_height/2 + 20,1,1);

  //Create the progression part of the loading screen
  // loadingBar.graphics.beginFill("#000000").drawRect(0,0,1,20).endFill();
  
  //Creates a frame around the loading bar. Used 3 as a padding value
  //the frame is 3px larger and is offset by 1.5
  //loadingBarFrame.graphics.setStrokeStyle(1).beginStroke("#000000").drawRect(-3/2, -3/2, loadingBarWidth+3, loadingBarHeight+3).endStroke();
  
  //Combine the frame and the bar into 1 object
  //loadingBarContainer.addChild(loadingBar, loadingBarFrame);
  
  //center the loading bar
  //loadingBarContainer.x = screen_width/2 - loadingBarWidth/2;
  //loadingBarContainer.y = screen_height/2 + 50;

  stage.addChild(loadingScreenFill, loadProgressLabel, bellSprite);

}

// When the canvas is clicked, build the game
function loadingScreenClick() {
  
  //create the game
  startScreen();

  //remove the loading screen page and click function
  stage.removeChild(loadProgressLabel, loadingScreenFill);
  stage.removeEventListener("click", loadingScreenClick);
}

function startScreen() {
  document.getElementById("loader").className = "";
  // crates new stages and properties for assets to live on
  startPage = new createjs.Shape();
  startText = new createjs.Text("Start Button","20px PixelFont3", "#000000");
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
  createjs.Ticker.addEventListener("tick", scoretimer);

  charScreen();

  //TODO: MUSIC HAS TO MOVE
  //createjs.Sound.play("music", createjs.Sound.INTERRUPT_NONE, 0, 0, -1, 0.4);
}

function charScreen() {

  // create shapes and containers
  var charPage = new createjs.Shape();
  var charTitle = new createjs.Text("Select Your Character", "24px PixelFont3", "#666");
  var boyDisplay = new createjs.Shape();
  var boyDisplayContainer = new createjs.Container();
  var girlDisplay = new createjs.Shape();
  var girlDisplayContainer = new createjs.Container();

  // how big are they
  charTitle.x = screen_width/2;
  charTitle.y = 15;
  charTitle.textAlign = "center";

  // where are they
  boyDisplayContainer.x = 50;
  boyDisplayContainer.y = 50;
  girlDisplayContainer.x = 300;
  girlDisplayContainer.y = 50;

  // draw it and fill it
  charPage.graphics.beginFill("#B26BE8").drawRect(0,0,500,screen_height);
  boyDisplay.graphics.beginFill("#6B97E8").drawRect(0,0,150,200);
  girlDisplay.graphics.beginFill("#F0596A").drawRect(0,0,150,200);

  //put stuff into its containers
  boyDisplayContainer.addChild(boyDisplay);
  girlDisplayContainer.addChild(girlDisplay);

  //put is all on the main screen
  stage.addChild(charPage, boyDisplayContainer, girlDisplayContainer, charTitle);

  //add eventListeners (hover, clikc etc..)
  boyDisplayContainer.addEventListener("click", boySelect);
  girlDisplayContainer.addEventListener("click", girlSelect);

  function boySelect() {
    character = 0;
    startGame();
  }

  function girlSelect() {
    character = 1;
    startGame();
  }

  stage.update();
}

// Create the starting point of the game
function startGame() {
  stage.removeAllChildren();
  background = new createjs.Shape();
  backgroundContainer = new createjs.Container();
  scoreDisplay = new createjs.Text("Score: 0", "36px PixelFont3", "#FFFFFF");
  
  //TODO: for testing movment and score
  backgroundxDisplay = new createjs.Text("bg: 0", "20px PixelFont3", "#FFFFFF");
  spritexDisplay = new createjs.Text("sprite: 0", "20px PixelFont3", "#FFFFFF"); 
  
  //TODO: for testing alert
  detectSteps = new createjs.Text("Steps: 0", "20px PixelFont3", "#FFFFFF");
  alertStatus = new createjs.Text("Alert: false", "20px PixelFont3", "#FFFFFF");

  //fill the background at 0,0 to the size of the screen
  background.graphics.beginBitmapFill(loader.getResult("background")).drawRect(0,0,1000,screen_height);
  
  scoreDisplay.x = 300;
  scoreDisplay.y = 100;

  backgroundxDisplay.x = 300;
  backgroundxDisplay.y = 150;

  spritexDisplay.x = 300;
  spritexDisplay.y = 180;

  detectSteps.x = 300;
  detectSteps.y = 210;

  alertStatus.x = 300;
  alertStatus.y = 230;

  if (character == 0) {
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
  }

  else if (character == 1) {
    var megamanSpriteSheet = new createjs.SpriteSheet( {
      // all main strings are reserved strings (images, frames, animations) that do a specific task
      "images": [loader.getResult("megamanred")],
      "frames": {height: 30, width: 30, regX: 15, regY: 0},
      "animations": {
        "idle": [0, 0],
        "run": [3, 5,"run", 5/60], //Runs Left
        "duck": [7, 7]
      }
    });
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


  megamanSprite = new createjs.Sprite(megamanSpriteSheet, "idle");
  
  // setTransform sets sprites x and y coordinates and scale
  megamanSprite.setTransform(120,250,1,1);
  megamanSprite.framerate = 60;

  backgroundContainer.addChild(background, fireplaceSprite);

  // .addchild put everythign on the screen
  stage.addChild(backgroundContainer, megamanSprite, detectSteps, alertStatus);

  // not sure what .timingMode is
  // .Ticker adds continuous timer
  createjs.Ticker.timingMode = createjs.Ticker.TIMEOUT;
  createjs.Ticker.setFPS(60);
  createjs.Ticker.addEventListener("tick", stageUpdate);
  createjs.Ticker.addEventListener("tick", santaAlert);
 
}

function santaAlert() {
  //if(alert != 1) {
    for(var i = 0; i < stepsTaken; i++) {
      if(stepsTaken % 2 == 0 && stepsTaken != 0) {
        var detection =  Math.floor((Math.random()*10)+1);
        if(detection == 7) {
          alert = 1;
          return;
        } else {
          return;
        }
      }
      console.log(detection);
    }

    if (alert == 1) {
      forceduck();
      alert = 0;
    }
  //}

  console.log('wat');
  stageUpdate();
}

function forceduck() {
  spacePressed = true;
  alert = 0;
  if(alert == 0) {
    spacePressed = false;
  }
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
      //add to stepsTaken
      stepsTaken++;
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
  //During the end card photo, press esc, enter or space to skip it
  if(endCardPhotoStatus)
    if(e.keyCode == KEYCODE_ESC || e.keyCode == KEYCODE_ENTER || e.keyCode == KEYCODE_SPACE  ) {
      endCardPhotoStatus = false;
      endCardPhotoTransition()
    }

}


function restart() {
  // take out EVERYTHING
  stage.removeAllChildren();
}

function scoretimer(event) {

  score++;

  /*scoreDisplay.text = "Score: " + score + " ";
  backgroundxDisplay.text = "bg: " + background.x + " ";
  spritexDisplay.text = "sprite: " + megamanSprite.x + " ";*/
  detectSteps.text = "steps: " + stepsTaken + " ";
  alertStatus.text = "alert: " + alert + " ";

}


function stageUpdate(event) {

  // run santa alert function
  //santaAlert();

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
    
    if ((megamanSprite.x > 15 && megamanSprite.x <= 200 && backgroundContainer.x == 0) || 
    (megamanSprite.x > 200 && megamanSprite.x <= 400 && backgroundContainer.x == -500)) {
      megamanSprite.x--;
    } 
    if (megamanSprite.x == 200 && backgroundContainer.x >= -500 && backgroundContainer.x <= 0) {
      backgroundContainer.x++;
    }
  }


  //Pressed the Right Arrow Key **********
  if (!leftPressed && rightPressed && !spacePressed) {
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

  endCardGiftBanner.graphics.beginFill("F25050").drawRect(screen_width,90,screen_width,120);

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

  //stage.removeAllChildren();

  tumblrButton = new createjs.Shape();
  twitterButton = new createjs.Shape();
  facebookButton = new createjs.Shape();
  lcLogo = new createjs.Shape();
  socialMediaInfo = new createjs.Container();

  endCardFinalBackground = new createjs.Shape();
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

  // tumblrButton.addEventListener('click',tumblrLink);
  // twitterButton.addEventListener('click',twitterLink);
  // facebookButton.addEventListener('click',facebookLink);


  socialMediaInfo.addChild(tumblrButton, twitterButton, facebookButton, lcLogo)
  socialMediaInfo.x = 265;
  socialMediaInfo.y = 215;




  endCardFinalBackground.graphics.beginFill("F25050").drawRect(100,100,100,100);
  //Set to invisible 
  endCardFinalContainer.addChild(endCardFinalBackground);
  endCardFinalContainer.alpha = 0;

  stage.addChild(socialMediaInfo);
  
  //test image fades in
  var FinalAnim = createjs.Tween.get(endCardFinalContainer, {paused:true})
            .to({alpha:1},2000);
  FinalAnim.setPaused(false);

  endCardFinalContainer.addEventListener('click', facebookLink);

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