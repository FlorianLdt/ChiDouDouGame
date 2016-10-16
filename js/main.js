// version 0.2

mousepos = {x:0, y:0};
// Inits
window.onload = function init() {
  var game = new GF();
  game.start();
};

audioID = 0;
 var assets = {};

var bgSound;
var gameOverSound;
var eatingSound;

// GAME FRAMEWORK STARTS HERE
var GF = function(){
  // Vars relative to the canvas
  var canvas, ctx, w, h; 
  mousepos = {x:0, y:0};

  // Game states
  var states = {
    startMenu : 0,
    play : 1,
    gameOver : 2,
    rules: 3,
    credits: 4
  };

  // Let's begin with the startMenu
  currentState = states.startMenu;

  // initialization of the score
  currentScore = 0;
  
    // frame updating count
  compteurFrame = 0;
  
  // Bean frequence 
  frequenceBeans =200;

  // vars for handling inputs
  var inputStates = {};

  var player = {
    x:0,
    y:0,
    boundingCircleRadius: 20    
  };

  // array of beans to animate
  var beanArray = [];

  // clears the canvas content
  function clearCanvas() {
    ctx.clearRect(0, 0, w, h);
  }
  
  function allAssetsLoaded(assetsLoaded) {
        console.log("all samples loaded and decoded");
        for (var asset in assetsLoaded) {
            assets[asset] = assetsLoaded[asset];
        }
    }
  
  // Main Loop of the game
  var mainLoop = function(time){
    // Clear the canvas
    clearCanvas();
    // check inputStates
    if (inputStates.mousePos) { 
      mousepos.x = inputStates.mousePos.x;
      mousepos.y = inputStates.mousePos.y;
    }
     
    switch(currentState) {

      // START MENU
      //////////////////////////////////////////////////////////
      case states.startMenu:
        ctx.fillStyle = "red";
        ctx.font = "80px Consolas";
        var textString = "吃 豆 豆";
        textWidth = ctx.measureText(textString).width;
        ctx.fillText(textString, w/2 - textWidth/2, 120);
        ctx.font = "40px Consolas";
        var textString = "(N)ew Game";
        textWidth = ctx.measureText(textString).width;
        ctx.fillText(textString, w/2 - textWidth/2, 250);
        var textString = "(R)ules";
        textWidth = ctx.measureText(textString).width;
        ctx.fillText(textString, w/2 - textWidth/2, 350);
        var textString = "(C)redits";
        textWidth = ctx.measureText(textString).width;
        ctx.fillText(textString, w/2 - textWidth/2, 450);
        ctx.font = "15px Consolas";
        ctx.fillText("Developed By SEYCHA Sénthène & LUDOT Florian.", 10, 590);
        if(inputStates.keyN) {
          currentState = states.play;
        } else if(inputStates.keyR) {
          currentState = states.rules;
        } else if(inputStates.keyC) {
          currentState = states.credits;
        }
      break;
      ///////////////////////////////////////////////////////////

      // PLAYING
      //////////////////////////////////////////////////////////
      case states.play: 
        //main function, called each frame 
        measureFPS(time);

        // number of ms since last frame draw
        delta = timer(time);
        panda = new Panda(w,h);
        updatePlayer();
        ctx.fillStyle = "white";
        ctx.font = "15px Consolas";
        ctx.fillText("SCORE: " +currentScore, 500, 20);
        // Check inputs and move the eater
        updatePanda(panda,assets.pandaImage);

        // update and draw beans
        updateBeans(delta,panda, assets);
      break;
      //////////////////////////////////////////////////////////

      // RULES
      //////////////////////////////////////////////////////////
      case states.rules:
          ctx.fillStyle = "red";
          ctx.font = "60px Consolas";
          var textString = "RULES";
          textWidth = ctx.measureText(textString).width;
          ctx.fillText(textString, w/2 - textWidth/2, 120);
          ctx.font = "20px Consolas";
          var textString = "吃 豆 豆 (Chi Dou Dou) is a little game where you";
          textWidth = ctx.measureText(textString).width;
          ctx.fillText(textString, w/2 - textWidth/2, 200);
          var textString = "have to rotate the panda with the mouse";
          textWidth = ctx.measureText(textString).width;
          ctx.fillText(textString, w/2 - textWidth/2, 225);
          var textString = "to eat all the beans which will come through it.";
          textWidth = ctx.measureText(textString).width;
          ctx.fillText(textString, w/2 - textWidth/2, 250);
          var textString = "If you grabe a bean with the panda's mouth,";
          textWidth = ctx.measureText(textString).width;
          ctx.fillText(textString, w/2 - textWidth/2, 300);
          var textString = "you score 1 point.";
          textWidth = ctx.measureText(textString).width;
          ctx.fillText(textString, w/2 - textWidth/2, 325);
          var textString = "However, if the bean hit another part of the";
          textWidth = ctx.measureText(textString).width;
          ctx.fillText(textString, w/2 - textWidth/2, 350);
          var textString = "panda except the panda's mouth ... GAME OVER!";
          textWidth = ctx.measureText(textString).width;
          ctx.fillText(textString, w/2 - textWidth/2, 375);
          var textString = "Have fun and don't miss the beans !! :)";
          textWidth = ctx.measureText(textString).width;
          ctx.fillText(textString, w/2 - textWidth/2, 450);
          ctx.font = "30px Consolas";
          var textString = "(B)ack To Main Menu";
          textWidth = ctx.measureText(textString).width;
          ctx.fillText(textString, w/2 - textWidth/2, 520);
          if(inputStates.keyB) {
            currentState = states.startMenu;
          } 
        break;
        ///////////////////////////////////////////////////////////

        // CREDITS
        //////////////////////////////////////////////////////////
        case states.credits:
          ctx.fillStyle = "red";
          ctx.font = "60px Consolas";
          var textString = "CREDITS";
          textWidth = ctx.measureText(textString).width;
          ctx.fillText(textString, w/2 - textWidth/2, 120);
          ctx.font = "20px Consolas";
          var textString = "吃 豆 豆 (Chi Dou Dou) is a little game developed";
          textWidth = ctx.measureText(textString).width;
          ctx.fillText(textString, w/2 - textWidth/2, 200);
          var textString = "in Javascript by SEYCHA Sénthène and LUDOT Florian.";
          textWidth = ctx.measureText(textString).width;
          ctx.fillText(textString, w/2 - textWidth/2, 225);
          var textString = "This game have been made thanks to BUFFA Michel's";
          textWidth = ctx.measureText(textString).width;
          ctx.fillText(textString, w/2 - textWidth/2, 275);
          var textString = "Game Framework.";
          textWidth = ctx.measureText(textString).width;
          ctx.fillText(textString, w/2 - textWidth/2, 300);
          var textString = "The Background image copyright belong to";
          textWidth = ctx.measureText(textString).width;
          ctx.fillText(textString, w/2 - textWidth/2, 350);
          var textString = "respective owner.";
          textWidth = ctx.measureText(textString).width;
          ctx.fillText(textString, w/2 - textWidth/2, 375);  
          ctx.font = "30px Consolas";
          var textString = "(B)ack To Main Menu";
          textWidth = ctx.measureText(textString).width;
          ctx.fillText(textString, w/2 - textWidth/2, 460);
          if(inputStates.keyB) {
            currentState = states.startMenu;
          } 

        break;
        ///////////////////////////////////////////////////////////

        // GAME OVER
        //////////////////////////////////////////////////////////
        case states.gameOver:
          //console.log("GAME OVER");
          panda.dead=false;
          ctx.fillStyle = "red";
          ctx.font = "60px Consolas";
          var textString = "GAME OVER";
          textWidth = ctx.measureText(textString).width;
          ctx.fillText(textString, w/2 - textWidth/2, 120);
          ctx.font = "35px Consolas";
          var textString = "YOUR SCORE : " +currentScore;
          textWidth = ctx.measureText(textString).width;
          ctx.fillText(textString, w/2 - textWidth/2, 200);
          ctx.font = "30px Consolas";
          var textString = "(N)ew Game";
          textWidth = ctx.measureText(textString).width;
          ctx.fillText(textString, w/2 - textWidth/2, 350);
          var textString = "(G)o To Main Menu";
          textWidth = ctx.measureText(textString).width;
          ctx.fillText(textString, w/2 - textWidth/2, 450);
          if(inputStates.keyN) {
            currentScore = 0;
            beanArray = [];
            lancerBeans();
            currentState = states.play;
          } else if(inputStates.keyG) {
            currentState = states.startMenu;
          } 
          ctx.font = "15px Consolas";
        break;
        //////////////////////////////////////////////////////////
    }
    requestAnimationFrame(mainLoop);
  };

  

  function updateBeans(delta,panda, assets) {
    
     compteurFrame ++;
  // for each bean in the array
    lancerBeans();
    for(var i=0; i < beanArray.length; i++) {
      var bean = beanArray[i];
      // 1) move the bean
      bean.move();   

      // 2) test if the bean collides with a wall
      testCollisionWithWalls(bean,w,h);

      // teste collisions avec monstre
      checkCollisions(bean,panda);

      // 3) draw the bean
      bean.draw(ctx, assets.beanImage);
    }
  } 

  function updatePanda(panda, pandaImage){

    panda.move(delta,inputStates);
    panda.draw(ctx, pandaImage);

  }
 
  function updatePlayer() {
  // The player is just a circle, drawn at the mouse position
  // Just to test circle/circle collision.
      
    if(inputStates.mousePos) {
      player.x = inputStates.mousePos.x;
      player.y = inputStates.mousePos.y;

      ctx.drawImage(assets.leaveImage,player.x-20, player.y-20, 40, 40);
    }
  }

  function checkCollisions(bean, panda) {
    var v1 = collisionSourisMonstre(player, panda.x, panda.y) + (posAngle*(180 / Math.PI));
    var v2 = collisionMonstreBean(bean, panda.x, panda.y) + (negAngle*(180 / Math.PI));
    var v3 = Math.abs(collisionSourisMonstre(player, panda.x, panda.y) + (posAngle*(180 / Math.PI))-collisionMonstreBean(bean, panda.x, panda.y) + (negAngle*(180 / Math.PI)));

    if(circleCollide(bean.x, bean.y, bean.boundingCircleRadius, panda.x, panda.y, panda.boundingCircleRadius)) {
      ctx.strokeStyle = ctx.fillStyle = 'red';
      if (v3<= 196 && v3 >=165){
        ctx.strokeStyle = ctx.fillStyle = 'green';
        playSound(assets.eatingSound);
        removeBeanAndGenerateNew(bean);
        currentScore++;
      } else {
        playSound(assets.gameOverSound);
        bean.color = 'red';
        panda.dead = true;
        currentState = states.gameOver;
      } 
    } else {
        ctx.strokeStyle = ctx.fillStyle = 'white';
    }
  }

  //Supprime une bean "bonus" et en crée 2 nouvelles aléatoires
  function removeBeanAndGenerateNew(bean) {
    var idxRmvBean = beanArray.indexOf(bean);
    var tmpBeanArray = [];
        
    for(var i = 0; i < beanArray.length; i++) {
      if(i !== idxRmvBean)
        tmpBeanArray.push(beanArray[i]);
      } 
      beanArray = tmpBeanArray;
  }
  
  function createBeans(numberOfBeans, beanSpeed, panda) {
     
    for(var i=0; i < numberOfBeans; i++) {
      // Create a bean with random position and speed. 
      // You can change the radius
    
  
      if (compteurFrame % frequenceBeans == 0){
          var bean =  new Bean(w,h,beanSpeed);
        
        if(!circleCollide(bean.x, bean.y, bean.boundingCircleRadius,panda.x, panda.y, panda.boundingCircleRadius)) {
          // On la rajoute au tableau
        beanArray.push(bean);
        } else {
          beanArray.splice(i,1);  
          i--;
        }     
      }
    }
  }
  
  function lancerBeans() {
        
      // Variation du niveau du jeuNiveau du jeu
    
    if (currentScore < 10){
      frequenceBeans = 100;
      beanSpeed = 2;

    } 
    if (currentScore == 20){
      frequenceBeans = 100;
      beanSpeed = 2.5;
    } 
    
    if (currentScore == 30){
      frequenceBeans = 90;
      beanSpeed = 2.5;
    } 
    if (currentScore == 40){
      frequenceBeans = 90;
      beanSpeed = 3;
    } 
    if (currentScore == 50){
      frequenceBeans = 80;
      beanSpeed = 2.5;
    } 
    if (currentScore == 60){
      frequenceBeans = 80;
      beanSpeed = 3;
    }
    if (currentScore == 70){
      frequenceBeans = 70;
      beanSpeed = 3;
    } 
    if (currentScore == 80){
      frequenceBeans = 60;
      beanSpeed = 2.5;
    } 
    if (currentScore == 90){
      frequenceBeans = 60;
      beanSpeed = 3;
    }
    if (currentScore == 100){
      frequenceBeans = 50;
      beanSpeed = 3;
    } 
    if (currentScore == 110){
      frequenceBeans = 50;
      beanSpeed = 3.5;
    } 
    if (currentScore == 120){
      frequenceBeans = 40;
      beanSpeed = 3.5;
    } 
    if (currentScore == 130){
      frequenceBeans = 40;
      beanSpeed = 4;
    } 
    if (currentScore == 140){
      frequenceBeans = 30;
      beanSpeed = 5;
    } 
    createBeans(1, beanSpeed, panda);     
  } 
    

  var start = function(){
    // adds a div for displaying the fps value
    initCounter();
    // Canvas, context etc.
    canvas = document.querySelector("#myCanvas");
    // often useful
    w = canvas.width; 
    h = canvas.height; 

    
    // important, we will draw with this object
    ctx = canvas.getContext('2d');
    // default police for text
    ctx.font="20px Arial";
    addListeners(inputStates, canvas);
    loadAssets(function (assets) {
      // all assets (images, sounds) loaded, we can start the animation
		  allAssetsLoaded(assets);
      playMusic();
      requestAnimationFrame(mainLoop); 
     });
  };

  function playMusic(){
	  assets.bgSound.play();
  }
  
  function playSound(sound){
	 sound.play();
  }
  

  //our GameFramework returns a public API visible from outside its scope
  return {
    start: start,
    playMusic : playMusic
  };
};


