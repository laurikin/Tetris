define(['src/BlockTypes','src/Element','src/CollisionDetector'],function( BlockTypes, Element, CollisionDetector ){


//*********************PRIVATE METHODS**********************//

  var createElements = function(){
    var els = [];
      this.schema.forEach(function(e,i){
        var el = new Element({
          position: [
            this.schema[i][0] + this.center[0],
            this.schema[i][1] + this.center[1]
          ]
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
    points.forEach(function(point){
      if(CollisionDetector.allowedToMove(point) === false){
        return true;
      }
    });
  };



//*********************MAIN OBJECT********************//

  var Block = function(opts) {

    this.attrs = (function(){
      var o = ( opts ? opts : {} );
      return {
        type: o.type || 1,
        center: o.center || [4,1]
      }
    }());

    this.elements = createElements.call(this);

  };

  Block.prototype = {
    move: function(x,y){
      if(!collision(getNewPoints.call(this,x,y))) {
        this.elements.forEach(function(element){
          element.move(x,y);
        });
        this.attrs.center[0] += x;
        this.attrs.center[1] += y;
      }
    },
    moveDown: function(){
      this.move(0,1);
    },
    moveLeft: function(){
      this.move(-1,0);
    },
    moveRight: function(){
      this.move(1,0);
    },
    rotate: function(){
      var newPoints = getNewRotatedPoints.call(this);
      if(!collision(newPoints)) {
        this.elements.forEach(function(element,i){
          element.position = newPoints[i];
        });
      }else{
        return false;
      }
    }
  }

  Object.defineProperties(Block.prototype,{
    schema: {
      get: function() {
        return BlockTypes[this.attrs.type];
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
    }
  })

  return Block;

});
