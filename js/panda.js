
function Panda(w,h) {
    this.x = w/2;
    this.y = h/2;
    this.speed = 100; // pixels/s this time !
    this.boundingCircleRadius = 80,
    this.hole = 50,
    this.angle = 0
    this.dead = false;

  	this.draw = function(ctx, pandaImage) {
    // save the context
    
    ctx.save();
    ctx.translate( this.x, this.y );
    ctx.rotate( this.angle );
    
    // Draw bounding circle
    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.arc(0, 0, this.boundingCircleRadius, 0, 2*Math.PI, true);
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.beginPath();
    negAngle = -(this.hole/2)*Math.PI/180;
    posAngle = (this.hole/2)*Math.PI/180;
    var dx = w - h/2;                                         
    var dy = w/2 - h/2;
    angleDebutMonstre = Math.atan2(dy,dx)*Math.PI/180;
    
    ctx.strokeStyle = "black";
    ctx.arc(0, 0, this.boundingCircleRadius, negAngle, posAngle, true);
    
    ctx.lineWidth = 5;
    ctx.stroke();
    
    ctx.drawImage(pandaImage,-80, -80, 162, 162);
    // restore the context
    ctx.restore(); 
  }

   this.move = function(delta,inputStates) {
      panda.speedX = panda.speedY = 0;
    // check inputStates
    if (inputStates.mousedown) { 
      panda.speed = 500;
    } else {
      // mouse up
      panda.speed = 100;
    }
    var dx = panda.x - mousepos.x;
    var dy = panda.y - mousepos.y;
    panda.angle = Math.atan2(dy, dx) + Math.PI;

    // Compute the incX and inY in pixels depending
    // on the time elasped since last redraw
    panda.x += calcDistanceToMove(delta, panda.speedX);
    panda.y += calcDistanceToMove(delta, panda.speedY);
  }
}