var mousepos = {x:0, y:0};
// Inits
window.onload = function init() {
  var game = new GF();
  game.start();
};

audioID = 0;

var bgSound;
var gameOverSound;
var beanPopSound;
var eatingSound;

// GAME FRAMEWORK STARTS HERE
var GF = function(){
  // Vars relative to the canvas
  var canvas, ctx, w, h; 
  var mousepos = {x:0, y:0};

  // Game states
  var states = {
    startMenu : 0,
    play : 1,
    gameOver : 2,
    highScores: 3,
    rules: 4,
    credits: 5
  };

  function sound(src) {
    this.sound = document.createElement("audio");
    var bgdsound = document.querySelector(".audio0");
    this.sound.src = src;
    this.sound.className = "audio"+audioID;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    
    if (audioID===0){
      this.sound.volume = 0.1;
      this.sound.setAttribute("loop", "true");
    }
    
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    
    this.play = function(){
        this.sound.play();
    }
    
    this.stop = function(){
      this.sound.pause();
    }
  }

  // Let's begin with the startMenu
  currentState = states.startMenu;

  // initialization of the score
  currentScore = 0;

  // vars for handling inputs
  var inputStates = {};

  // The eater !
  var eater = {
    x: 0,
    y: 0,
    speed:100, // pixels/s this time !
    boundingCircleRadius: 80,
    hole: 40,
    angle:0
  };

  var player = {
    x:0,
    y:0,
    boundingCircleRadius: 20    
  };

  // array of balls to animate
  var ballArray = [];

  // clears the canvas content
  function clearCanvas() {
    ctx.clearRect(0, 0, w, h);
  }

  // Functions for drawing the eater and maybe other objects
  function drawMyEater() {
    // save the context
    ctx.save();
    ctx.translate( eater.x, eater.y );
    ctx.rotate( eater.angle );
    
    // Draw bounding circle
    ctx.beginPath();
    negAngle = -(eater.hole/2)*Math.PI/180;
    posAngle = (eater.hole/2)*Math.PI/180;
    var dx = w - h/2;                                         
    var dy = w/2 - h/2;
    angleDebutMonstre = Math.atan2(dy,dx)*Math.PI/180;
    ctx.arc(0, 0, eater.boundingCircleRadius, negAngle, posAngle, true);
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.beginPath();
    ctx.lineTo(0,300);
    ctx.stroke();
    // restore the context
    ctx.restore(); 
  }

  // Main Loop of the game
  var mainLoop = function(time){
    // Clear the canvas
    clearCanvas();
    // check inputStates
    if (inputStates.left) {
      ctx.fillText("left", 150, 20);
    }
    if (inputStates.up) {
      ctx.fillText("up", 150, 40);
    }
    if (inputStates.right) {
      ctx.fillText("right", 150, 60);
    }
    if (inputStates.down) {
    ctx.fillText("down", 150, 80);
    } 
    if (inputStates.space) {
      ctx.fillText("space bar", 140, 100);
    }
    if (inputStates.keyN) {
      ctx.fillText("n pressed", 140, 100);
    }
    if (inputStates.keyG) {
      ctx.fillText("G pressed", 140, 100);
    }
    if (inputStates.mousePos) { 
      mousepos.x = inputStates.mousePos.x;
      mousepos.y = inputStates.mousePos.y;
      //ctx.fillText("mouse(x = " + inputStates.mousePos.x + " y = " + inputStates.mousePos.y +")", 370, 580);
    }
    if (inputStates.mousedown) { 
      ctx.fillText("mousedown b" + inputStates.mouseButton, 5, 180);
    }
    if(eater.dead) {
      currentState = states.gameOver;
    }
      
    switch(currentState) {

      // START MENU
      //////////////////////////////////////////////////////////
      case states.startMenu:
        ctx.fillStyle = "red";
        ctx.font = "80px Consolas";
        ctx.fillText("吃 豆 豆", 130, 120);
        ctx.font = "40px Consolas";
        ctx.fillText("(N)ew Game", 180, 220);
        ctx.fillText("(H)igh Scores", 150, 300);
        ctx.fillText("(R)ules", 220, 380);
        ctx.fillText("(C)redits", 200, 460);
        ctx.font = "15px Consolas";
        ctx.fillText("Developed By SEYCHA Sénthène & LUDOT Florian.", 10, 590);
        if(inputStates.keyN) {
          currentState = states.play;
        } else if(inputStates.keyH) {
          currentState = states.highScores;
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
        drawMyEater();
        updatePlayer();
      
        // Check inputs and move the eater
        updateEaterPosition(delta);

        // update and draw balls
        updateBalls(delta);
      break;
      //////////////////////////////////////////////////////////
          
      // HIGH SCORE
      //////////////////////////////////////////////////////////
      case states.highScores:
        ctx.fillStyle = "red";
        ctx.font = "60px Consolas";
        ctx.fillText("HIGH SCORES", 115, 120);
        ctx.font = "30px Consolas";
        ctx.fillText("#1 Sénthène : 689", 115, 220);
        ctx.fillText("#2 Arsim : 564", 115, 260);
        ctx.fillText("#3 Yassine : 532", 115, 300);
        ctx.fillText("#4 Yassou : 467", 115, 340);
        ctx.fillText("#5 Tiboux : 9", 115, 380);
        ctx.fillText("(B)ack To Main Menu", 130, 460);
        if(inputStates.keyB) {
          currentState = states.startMenu;
        } 
      break;
      ///////////////////////////////////////////////////////////

      // RULES
      //////////////////////////////////////////////////////////
      case states.rules:
          ctx.fillStyle = "red";
          ctx.font = "60px Consolas";
          ctx.fillText("RULES", 210, 120);
          ctx.font = "20px Consolas";
          ctx.fillText("吃 豆 豆 (Chi Dou Dou) is a little game where you", 10, 200);
          ctx.fillText("have to rotate the central creature with the mouse", 10, 225);
          ctx.fillText("to eat all the beans which will come through it. ", 10, 250);
          ctx.fillText("If you grabe a bean with the creature's mouth,", 10, 300);
          ctx.fillText("you score 1 point.", 10, 325);
          ctx.fillText("However, if the bean hit another part of the", 10, 350);
          ctx.fillText("creature except the creature's mouth ... GAME OVER!", 10, 375);
          ctx.fillText("Have fun and don't miss the beans !! :)", 90, 450);
          ctx.font = "30px Consolas";
          ctx.fillText("(B)ack To Main Menu", 130, 520);
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
          ctx.fillText("CREDITS", 170, 120);
          ctx.font = "20px Consolas";
          ctx.fillText("吃 豆 豆 (Chi Dou Dou) is a little game developed", 10, 200);
          ctx.fillText("in Javascript by SEYCHA Sénthène and LUDOT Florian.", 10, 225);
          ctx.fillText("This game have been made thanks to BUFFA Michel's", 10, 275);
          ctx.fillText("Game Framework.", 10, 300);
          ctx.fillText("The Backgound image copyright belong to ", 10, 350);
          ctx.fillText("respective owner.", 10, 375);  
          ctx.font = "30px Consolas";
          ctx.fillText("(B)ack To Main Menu", 130, 460);
          if(inputStates.keyB) {
            currentState = states.startMenu;
          } 

        break;
        ///////////////////////////////////////////////////////////

        // GAME OVER
        //////////////////////////////////////////////////////////
        case states.gameOver:
          //console.log("GAME OVER");
          eater.dead=false;
          ctx.fillStyle = "red";
          ctx.font = "60px Consolas";
          ctx.fillText("GAME OVER", 140, 120);
          ctx.font = "35px Consolas";
          ctx.fillText("YOUR SCORE : " +currentScore, 140, 170);
          ctx.fillText("YOUR HIGH SCORE : 689", 90, 210);  
          ctx.font = "30px Consolas";
          ctx.fillText("(N)ew Game", 200, 350);
          ctx.fillText("(H)igh Scores", 180, 400);
          ctx.fillText("(G)o To Main Menu", 150, 450);
          if(inputStates.keyN) {
            currentScore = 0;
            ballArray = [];
            createBalls(1);
            currentState = states.play;
          } else if(inputStates.keyH) {
            currentState = states.highScores;
          } else if(inputStates.keyG) {
            currentState = states.startMenu;
          } 
        break;
        //////////////////////////////////////////////////////////
    }
    requestAnimationFrame(mainLoop);
  };

  function updateEaterPosition(delta) {
    eater.speedX = eater.speedY = 0;
    // check inputStates
    if (inputStates.left) {
      //eater.speedX = -eater.speed;
    }
    if (inputStates.up) {
      //eater.speedY = -eater.speed;
    }
    if (inputStates.right) {
      //eater.speedX = eater.speed;
    }
    if (inputStates.down) {
      //eater.speedY = eater.speed;
    } 
    if (inputStates.space) {
    }
    if (inputStates.mousePos) { 
    }
    if (inputStates.mousedown) { 
      eater.speed = 500;
    } else {
      // mouse up
      eater.speed = 100;
    }
    var dx = eater.x - mousepos.x;
    var dy = eater.y - mousepos.y;
    eater.angle = Math.atan2(dy, dx) + Math.PI;

    // Compute the incX and inY in pixels depending
    // on the time elasped since last redraw
    eater.x += calcDistanceToMove(delta, eater.speedX);
    eater.y += calcDistanceToMove(delta, eater.speedY);
  }

  function updateBalls(delta) {
  // for each ball in the array
    for(var i=0; i < ballArray.length; i++) {
      var ball = ballArray[i];
      // 1) move the ball
      ball.move();   

      // 2) test if the ball collides with a wall
      testCollisionWithWalls(ball,w,h);

      // teste collisions avec monstre
      checkCollisions(ball);

      // 3) draw the ball
      ball.draw(ctx);
    }
  } 
    
  function updatePlayer() {
  // The player is just a circle, drawn at the mouse position
  // Just to test circle/circle collision.
      
    if(inputStates.mousePos) {
      player.x = inputStates.mousePos.x;
      player.y = inputStates.mousePos.y;
      // draws a circle
      ctx.beginPath();
      ctx.arc(player.x, player.y, player.boundingCircleRadius, 0, 2*Math.PI);
      ctx.stroke();
    }
  }

  function checkCollisions(ball) {
    ctx.font = "15px Consolas";
    /*ctx.fillText("angleDebutMonstre :" +angleDebutMonstre, 10, 320);
    ctx.fillText("negAngle : " + negAngle * (180 / Math.PI)+"°", 10, 340);
    ctx.fillText("posAngle : " + posAngle * (180 / Math.PI)+"°", 10, 360);
    ctx.fillText("collisionSourisMonstre : " +collisionSourisMonstre(player, eater.x, eater.y) +"°", 10, 380);
    ctx.fillText("collisionMonstreBalle : " +collisionMonstreBalle(ball, eater.x, eater.y) +"°", 10, 400);*/
    var v1 = collisionSourisMonstre(player, eater.x, eater.y) + (posAngle*(180 / Math.PI));
    var v2 = collisionMonstreBalle(ball, eater.x, eater.y) + (negAngle*(180 / Math.PI));
    var v3 = Math.abs(collisionSourisMonstre(player, eater.x, eater.y) + (posAngle*(180 / Math.PI))-collisionMonstreBalle(ball, eater.x, eater.y) + (negAngle*(180 / Math.PI)));
    /*ctx.fillText("collisionSourisMonstre+posAngle: " + v1 +"°", 10, 420);
    ctx.fillText("collisionMonstreBalle+negAngle : " + v2 +"°", 10, 440);
    ctx.fillText("dif angle :" +v3, 10, 200);
    ctx.fillText("ball.x : " +ball.x, 10, 460);
    ctx.fillText("ball.y : " +ball.y, 10, 480);
    ctx.fillText("ball.boundingCircleRadius : " +ball.boundingCircleRadius, 10, 500);
    ctx.fillText("eater.x : " +eater.x, 10, 520);
    ctx.fillText("eater.y : " +eater.y, 10, 540);
    ctx.fillText("eater.boundingCircleRadius : " +eater.boundingCircleRadius, 10, 560);*/
    ctx.fillText("SCORE: " +currentScore, 400, 20);

    if(circleCollide(ball.x, ball.y, ball.boundingCircleRadius, eater.x, eater.y, eater.boundingCircleRadius)) {
      //ctx.fillText("Collision", 10, 20);
      ctx.strokeStyle = ctx.fillStyle = 'red';
      if (v3<=13){
        ctx.strokeStyle = ctx.fillStyle = 'green';
        //ctx.fillText("BINGO", 10, 40);
        eatingSound = new sound("assets/sounds/eatingSound.mp3");
        eatingSound.play();
        removeBallAndGenerateNew(ball);
        currentScore++;
      } else {
        gameOverSound = new sound("assets/sounds/gameOverSound.wav");
        gameOverSound.play();
        ball.color = 'red';
        eater.dead = true;
        //console.log("collision1");
      } 
    } else {
        //ctx.fillText("No collision", 10, 20);
        ctx.strokeStyle = ctx.fillStyle = 'white';
    }
  }

  //Supprime une balle "bonus" et en crée 2 nouvelles aléatoires
  function removeBallAndGenerateNew(ball) {
    var idxRmvBall = ballArray.indexOf(ball);
    var tmpBallArray = [];
        
    for(var i = 0; i < ballArray.length; i++) {
      if(i !== idxRmvBall)
        tmpBallArray.push(ballArray[i]);
      } 
      ballArray = tmpBallArray;
      createBalls(1);
  }
  
  function createBalls(numberOfBalls) {
    for(var i=0; i < numberOfBalls; i++) {
      // Create a ball with random position and speed. 
      // You can change the radius
        if (i===0){
          var ball =  new Ball(w,h);
          beanPopSound = new sound("assets/sounds/beanPopSound.wav");
          beanPopSound.play();
        }
        if(!circleCollide(ball.x, ball.y, ball.boundingCircleRadius,eater.x, eater.y, eater.boundingCircleRadius)) {
          // On la rajoute au tableau
          ballArray[i] = ball;
        } else {
          i--;     
        }
    }
  }                                

  var start = function(){
    // adds a div for displaying the fps value
    initCounter();

    // Canvas, context etc.
    canvas = document.querySelector("#myCanvas");
    bgSound = new sound("assets/sounds/bgSound.mp3");
    audioID++;
    bgSound.play();
    // often useful
    w = canvas.width; 
    h = canvas.height; 

    eater.x = w/2;
    eater.y = h/2;
          

    // important, we will draw with this object
    ctx = canvas.getContext('2d');
    // default police for text
    ctx.font="20px Arial";
    addListeners(inputStates, canvas);

    // We create tge balls: try to change the parameter
    if(states.play){
      createBalls(1); 
    }
          

    // start the animation
      requestAnimationFrame(mainLoop);
  };

  //our GameFramework returns a public API visible from outside its scope
  return {
    start: start
  };
};


