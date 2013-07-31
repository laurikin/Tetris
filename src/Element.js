define(['src/Set'],function(set){

  var ElementProto = {
    toString: function(){return "object Element"}
  };

  return function(opts){

    if(typeof opts === 'undefined'){
      var opts = {};
    }

    var size = set.grid.cellSize();

    var attrs = {
      color: typeof opts.color !== 'undefined' ? opts.color : '#f00',
      size: size,
      position: typeof opts.position !== 'undefined' ? opts.position : [0,0]
    }

    var Element = Object.create(ElementProto)

    Element.color = function(){
      return attrs.color;
    };
    Element.position = function(args){
      if(typeof args !== "undefined"){
        attrs.position = args
      }else{
        return attrs.position;
      }
    };
    Element.move = function(x,y){
      attrs.position[0] += x;
      attrs.position[1] += y;
    };
    Element.moveDown = function(){
      this.move(0,1)
    };
    Element.moveRight = function(){
      this.move(1,0)
    };
    Element.moveLeft = function(){
      this.move(-1,0)
    };

    return Element;
  }

});
