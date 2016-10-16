function collisionSourisMonstre(player, pandax, panday) {
  var dx = player.x - pandax;
  var dy = player.y - panday;
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

function collisionMonstreBean(bean, pandax, panday) {
  var dx = pandax - bean.x;
  var dy = panday - bean.y;
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

function testCollisionWithWalls(bean,w,h) {
  // left
  if (bean.x < bean.boundingCircleRadius) {
    bean.x = bean.boundingCircleRadius;
    bean.angle = -bean.angle + Math.PI;
  } 
  // right
  if (bean.x > w - (bean.boundingCircleRadius)) {
    bean.x = w - (bean.boundingCircleRadius);
    bean.angle = -bean.angle + Math.PI; 
  }     
  // up
  if (bean.y < bean.boundingCircleRadius) {
    bean.y = bean.boundingCircleRadius;
    bean.angle = -bean.angle;     
  }     
  // down
  if (bean.y > h - (bean.boundingCircleRadius)) {
    bean.y = h - (bean.boundingCircleRadius);
    bean.angle = -bean.angle; 
  } 
}