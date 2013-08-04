define([],function(){

  var Element = function(opts){

    this.attrs = (function(){
      var o = ( opts ? opts : {} );
      return {
        color : o.color || '#f00',
        size : o.size || 10,
        position : o.position || [0,0]
      }

    }());

  }

  Element.prototype = {
    move : function(x,y){
      var pos = this.position;
      pos[0] += x;
      pos[1] += y;
      this.position = pos;
    },
    moveDown : function(){
      this.move(0,1);
    },
    moveLeft : function(){
      this.move(-1,0);
    },
    moveRight : function(){
      this.move(1,0);
    }
  };

  Object.defineProperties(Element.prototype,{

    color : {
      get : function() {
        return this.attrs.color;
      },
      set : function(color) {
        this.attrs.color = color;
      }
    },
    position : {
      get : function() {
        return this.attrs.position;
      },
      set : function(position){
        this.attrs.position = position;
      }
    }

  })

  return Element;

});
