define(['src/Element','src/CollisionDetector'],function( Element, CollisionDetector ){


//*********************PRIVATE METHODS**********************//

  var createElements = function(){
    var els = [];
      this.schema.forEach(function(e,i){
        var el = new Element({
          position: [
            this.schema[i][0] + this.center[0],
            this.schema[i][1] + this.center[1]
          ],
          color: this.color
        });
        els.push(el);
      },this);
    return els;
  },
  getNewRotatedPoints = function(){
    var newPoints = [];
    this.elements.forEach(function(element){
      var oldPos = element.position;
      var xDis = oldPos[0] - this.center[0];
      var yDis = oldPos[1] - this.center[1];
      var newPoint = [yDis + this.center[0],-xDis + this.center[1]];
      newPoints.push(newPoint)
    },this);
    return newPoints;
  },
  getNewPoints = function(x,y){
    var newPoints = [];
    this.elements.forEach(function(element){
      var point = element.position;
      var newPoint = [point[0] + x, point[1] + y];
      newPoints.push(newPoint)
    });
    return newPoints;
  },
  collision = function(points){
    var collision = false;
    points.forEach(function(point){
      if(!CollisionDetector.allowedToMove(point)){
        collision = true;
      }
    });
    return collision
  };

//*********************PRIVATE VARIABLES**********************//


  var blockTypes = [
    [[-1,1],[0,1],[1,1],[0,0]],
    [[-1,1],[0,1],[1,1],[1,0]],
    [[-1,0],[0,0],[1,0],[2,0]],
    [[-1,0],[0,0],[-1,1],[0,1]],
    [[-1,0],[0,0],[0,1],[1,1]],
    [[-1,1],[0,1],[0,0],[1,0]],
    [[-1,0],[-1,1],[0,1],[1,1]],
  ],
  colors = [
    '#f3bc13',
    '#d91313',
    '#4d9ad0',
    '#3a4aae',
    '#3ae03a',
    '#e34818',
    '#ef7c16'
  ];



//*********************MAIN OBJECT*********************//

  var Block = function(opts) {

    this.attrs = (function(){
      var o = ( opts ? opts : {} );
      return {
        type: typeof o.type !== 'undefined' ? o.type : ( Math.floor(Math.random()*blockTypes.length)),
        center: o.center || [4,1]
      }
    }());

    this.elements = createElements.call(this);

  };

  Block.prototype = {
    move: function(x,y){
      if(!collision(getNewPoints.call(this,x,y))){
        this.elements.forEach(function(element){
          element.move(x,y);
        });
        this.attrs.center[0] += x;
        this.attrs.center[1] += y;
      }else{
        return false;
      }
    },
    moveDown: function(){
      return this.move(0,1);
    },
    moveLeft: function(){
      return this.move(-1,0);
    },
    moveRight: function(){
      return this.move(1,0);
    },
    rotate: function(){
      var newPoints = getNewRotatedPoints.call(this);
      if(!collision.call(this,newPoints)) {
        this.elements.forEach(function(element,i){
          element.position = newPoints[i];
        });
      }else{
        return false;
      }
    },
    collision: function(x,y){
      var points = getNewPoints.call(this,x,y);
      var collision = false;
      points.forEach(function(point){
        if(!CollisionDetector.allowedToMove(point)){
          collision = true;
        }
      });
      return collision
    }

  }

  Object.defineProperties(Block.prototype,{
    schema: {
      get: function() {
        return blockTypes[this.attrs.type];
      }
    },
    type: {
      get: function() {
        return this.attrs.type;
      }
    },
    center: {
      get: function(){
        return this.attrs.center
      }
    },
    color: {
      get: function(){
        return colors[this.attrs.type]
      }
    }
  })

  return Block;

});
