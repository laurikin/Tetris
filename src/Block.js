define(['src/BlockTypes','src/Grid','src/Element'],function(BlockTypes, Grid, Element){

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
    }
    Block.moveDown = function(){
      for (var i = elements.length - 1; i >= 0; i--) {
        elements[i].moveDown();
      };
      attrs.center[1] += 1;
    }
    Block.moveLeft = function(){
      for (var i = elements.length - 1; i >= 0; i--) {
        elements[i].moveLeft();
      };
      attrs.center[0] -= 1;
    }
    Block.moveRight = function(){
      for (var i = elements.length - 1; i >= 0; i--) {
        elements[i].moveRight();
      };
      attrs.center[0] += 1;
    }
    Block.rotate = function(){
      for (var i = elements.length - 1; i >= 0; i--) {
        var oldPos = elements[i].position();
        var xDis = oldPos[0] - attrs.center[0];
        var yDis = oldPos[1] - attrs.center[1];
        var rotated = [yDis, -xDis];
        var newPos = [
          rotated[0] + attrs.center[0],
          rotated[1] + attrs.center[1]
        ];
        elements[i].position(newPos);
      };
    }

    return Block
  }

});
