function collisionSourisMonstre(player, eaterx, eatery) {
  var dx = player.x - eaterx;
  var dy = player.y - eatery;
  if (dx>0 && dy>=0){
    var angle = Math.atan2(dy,dx);
  } else if (dx>0 && dy<0){
    var angle = Math.atan2(dy,dx);
  } else if (dx<0){
    var angle = Math.atan2(dy,dx);
  } else if (dx==0 && dy>0){
    var angle = Math.PI/2;
  } else if (dx==0 && dy<0){
    var angle = (3*Math.PI)/2;
  }
  return angle* (180 / Math.PI);
}

function collisionMonstreBalle(balle, eaterx, eatery) {
  var dx = eaterx - balle.x;
  var dy = eatery - balle.y;
  if (dx>0 && dy>=0){
    var angle = Math.atan2(dy,dx);
  } else if (dx>0 && dy<0){
    var angle = Math.atan2(dy,dx);
  } else if (dx<0){
    var angle = Math.atan2(dy,dx);
  } else if (dx==0 && dy>0){
    var angle = Math.PI/2;
  } else if (dx==0 && dy<0){
    var angle = (3*Math.PI)/2;
  }
  return angle* (180 / Math.PI);
}

function circleCollide(x1, y1, r1, x2, y2, r2) {
  var dx = x1 - x2;
  var dy = y1 - y2;
  return ((dx * dx + dy * dy) < (r1 + r2)*(r1+r2));  
}

function testCollisionWithWalls(ball,w,h) {
  // left
  if (ball.x < ball.boundingCircleRadius) {
    ball.x = ball.boundingCircleRadius;
    ball.angle = -ball.angle + Math.PI;
  } 
  // right
  if (ball.x > w - (ball.boundingCircleRadius)) {
    ball.x = w - (ball.boundingCircleRadius);
    ball.angle = -ball.angle + Math.PI; 
  }     
  // up
  if (ball.y < ball.boundingCircleRadius) {
    ball.y = ball.boundingCircleRadius;
    ball.angle = -ball.angle;     
  }     
  // down
  if (ball.y > h - (ball.boundingCircleRadius)) {
    ball.y = h - (ball.boundingCircleRadius);
    ball.angle = -ball.angle; 
  } 
}