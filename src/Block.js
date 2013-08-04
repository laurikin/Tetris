define(['src/BlockTypes','src/Element'],function(BlockTypes, Element, set){


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
      this.elements.forEach(function(element){
        element.move(x,y);
      });
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
      //if(!collision(newPoints)) {
        this.elements.forEach(function(element,i){
          element.position = newPoints[i];
        });
      //}else{
      //  return false;
      //}
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

  // return function(opts){

  //   var blockType = BlockTypes[attrs.type];

  //   var elements = (function(){
  //     var els = [];
  //     for (var i = 0 ; i < blockType.length; i++) {
  //       var el = new Element({
  //         color: '#f00',
  //         position: [
  //           blockType[i][0] + attrs.center[0],
  //           blockType[i][1] + attrs.center[1]
  //         ]
  //       });
  //       els.push(el);
  //     };
  //     return els;
  //   }());

  //   var getNewPoints = function(x,y){
  //     var newPoints = [];
  //     for (var i = 0; i < elements.length; i++) {
  //       var point = elements[i].position();
  //       var newPoint = [point[0] + x, point[1] + y];
  //       newPoints.push(newPoint)
  //     };
  //     return newPoints;
  //   };

  //   var getNewRotatedPoints = function(){
  //     var newPoints = [];
  //     for (var i = 0; i < elements.length; i++) {
  //       var oldPos = elements[i].position();
  //       var xDis = oldPos[0] - attrs.center[0];
  //       var yDis = oldPos[1] - attrs.center[1];
  //       var newPoint = [yDis + attrs.center[0],-xDis + attrs.center[1]];
  //       newPoints.push(newPoint)
  //     };
  //     return newPoints;
  //   };

  //   var collision = function(points){
  //     for (var i = points.length - 1; i >= 0; i--) {
  //       if(set.allowedToMove(points[i]) === false){
  //         return true;
  //       }
  //     };
  //   };

    // var Block = Object.create(BlockProto)
    // Block.type = function(){
    //   return attrs.type;
    // }
    // Block.schema = function(){
    //   return blockType;
    // }
    // Block.elements = function(){
    //   return elements;
    // }
    // Block.center = function(){
    //   return attrs.center;
    // };
    // Block.move = function(x,y){
    //   var length = elements.length;
    //   if(!collision(getNewPoints(x,y))) {
    //     for (var i = elements.length - 1; i >= 0; i--) {
    //       elements[i].move(x,y);
    //     };
    //     attrs.center[0] += x;
    //     attrs.center[1] += y;
    //   }else{
    //     return false;
    //   }
    // }
    // Block.moveDown = function(){
    //   return this.move(0,1);
    // };
    // Block.moveLeft = function(){
    //   return this.move(-1,0);
    // };
    // Block.moveRight = function(){
    //   return this.move(1,0);
    // };
    // Block.rotate = function(){
    //   var newPoints = getNewRotatedPoints();
    //   if(!collision(newPoints)) {
    //     for (var i = 0; i < elements.length; i++) {
    //       elements[i].position(newPoints[i]);
    //     }
    //   }else{
    //     return false;
    //   }
    // };

  //}
