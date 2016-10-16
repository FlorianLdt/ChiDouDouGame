
  // constructor function for balls
  function Bean(w,h,speedBean) {
   this.v = speedBean;
   this.boundingCircleRadius = 30/2;
   this.color = "black";
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
    //console.log("x: " +this.x);
    //console.log("Y: " +this.y);


    
    this.draw = function(ctx, beanImage) {
      // si la balle est "morte" on ne fait rien
      if(this.dead) return;
      ctx.save();
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.drawImage(beanImage,this.x-15, this.y-15);
      ctx.restore();
      this.color = 'white';
    };
    
    this.move = function() {
      // si la balle est "morte" on ne fait rien
      if(this.dead) return;
      
      this.x += this.v * Math.cos(this.angle);
      this.y += this.v * Math.sin(this.angle);
    };
  }
