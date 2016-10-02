
  // constructor function for balls
  function Ball(w,h) {
   this.v = 2;
   this.boundingCircleRadius = 30/2;
   this.color = "white";
   this.dead = false;

  /*
          0
      -----------
      |         |
  1   |         |   3
      |         |
      |         |
      -----------
          2


          */
          var cote = Math.floor(4*Math.random());
          if (cote === 0){
      // Côté Haut
      this.x = Math.random()*w;
      this.y = 0;
      var dx = w/2-this.x;
      var dy = h/2-this.y;
      this.angle = Math.atan2(dy,dx);
    }

    else if (cote === 1){
      // Côté Gauche
      this.x = 0;
      this.y = Math.random()*h;
      var dx = w/2-this.x;
      var dy = h/2-this.y;
      this.angle = Math.atan2(dy,dx);
    }

    else if (cote === 2){
      // Côté Bas
      this.x = Math.random()*w;
      this.y = h;
      var dx = w/2-this.x;
      var dy = h/2-this.y;
      this.angle = -Math.atan2(dy,dx);
    } 

    else if (cote === 3){
      // Côté Droit
      this.x = w;
      this.y = Math.random()*h;
      var dx = w/2-this.x;
      var dy = h/2-this.y;
      this.angle = Math.atan2(dy,dx);
    }
    console.log("x: " +this.x);
    console.log("Y: " +this.y);


    
    this.draw = function(ctx) {
      // si la balle est "morte" on ne fait rien
      if(this.dead) return;
      
      ctx.save();
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.arc(this.x, this.y, this.boundingCircleRadius, 0, 2*Math.PI);
      ctx.fill();
      ctx.restore();

      //ctx.fillText("Ball : (x: " + this.x + ",y: " + this.y +")", 10, 580);
      this.color = 'white';
    };
    
    this.move = function() {
      // si la balle est "morte" on ne fait rien
      if(this.dead) return;
      
      this.x += this.v * Math.cos(this.angle);
      this.y += this.v * Math.sin(this.angle);
    };

  }