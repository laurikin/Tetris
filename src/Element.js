define(['src/Grid','src/Set'],function(Grid, set){

  var ElementProto = {
    toString: function(){return "object Element"}
  };

  return function(opts){

    if(typeof opts === 'undefined'){
      var opts = {};
    }

    var size = Grid().cellSize();

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
    }
    Element.moveDown = function(){
      attrs.position[1] += 1;
    }
    Element.moveRight = function(){
      attrs.position[0] += 1;
    }
    Element.moveLeft = function(){
      attrs.position[0] -= 1;
    }

    set.elements.push(Element)

    return Element;
  }

});
