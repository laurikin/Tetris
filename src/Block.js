define(['src/BlockTypes','src/Element','src/Set'],function(BlockTypes, Element, set){

  var BlockProto = {
    toString: function(){return "object Block"}
  };

  return function(opts){

    var attrs = {
      type: typeof opts.type !== 'undefined' ? opts.type : 1,
      center: typeof opts.center !== 'undefined' ? opts.center : [4,1]
    }

    var blockType = BlockTypes[attrs.type];

    var elements = (function(){
      var els = [];
      for (var i = 0 ; i < blockType.length; i++) {
        var el = new Element({
          color: '#f00',
          position: [
            blockType[i][0] + attrs.center[0],
            blockType[i][1] + attrs.center[1]
          ]
        });
        els.push(el);
      };
      return els;
    }());

    var getNewPoints = function(x,y){
      var newPoints = [];
      for (var i = 0; i < elements.length; i++) {
        var point = elements[i].position();
        var newPoint = [point[0] + x, point[1] + y];
        newPoints.push(newPoint)
      };
      return newPoints;
    };

    var getNewRotatedPoints = function(){
      var newPoints = [];
      for (var i = 0; i < elements.length; i++) {
        var oldPos = elements[i].position();
        var xDis = oldPos[0] - attrs.center[0];
        var yDis = oldPos[1] - attrs.center[1];
        var newPoint = [yDis + attrs.center[0],-xDis + attrs.center[1]];
        newPoints.push(newPoint)
      };
      return newPoints;
    };

    var collision = function(points){
      for (var i = points.length - 1; i >= 0; i--) {
        if(set.allowedToMove(points[i]) === false){
          return true;
        }
      };
    };

    var Block = Object.create(BlockProto)
    Block.type = function(){
      return attrs.type;
    }
    Block.schema = function(){
      return blockType;
    }
    Block.elements = function(){
      return elements;
    }
    Block.center = function(){
      return attrs.center;
    };
    Block.move = function(x,y){
      var length = elements.length;
      if(!collision(getNewPoints(x,y))) {
        for (var i = elements.length - 1; i >= 0; i--) {
          elements[i].move(x,y);
        };
        attrs.center[0] += x;
        attrs.center[1] += y;
      }else{
        return false;
      }
    }
    Block.moveDown = function(){
      return this.move(0,1);
    };
    Block.moveLeft = function(){
      return this.move(-1,0);
    };
    Block.moveRight = function(){
      return this.move(1,0);
    };
    Block.rotate = function(){
      var newPoints = getNewRotatedPoints();
      if(!collision(newPoints)) {
        for (var i = 0; i < elements.length; i++) {
          elements[i].position(newPoints[i]);
        }
      }else{
        return false;
      }
    };

    return Block;
  }

});
