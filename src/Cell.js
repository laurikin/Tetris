define([],function(){

  var Cell = function(opts){

    this.attrs = (function(){
      var o = ( opts ? opts : {} );
      return {
        size: o.size || 1,
        x: o.x || 0,
        y: o.y || 0
      }
    }());

  }

  Object.defineProperties(Cell.prototype,{
    size: {
      get: function(){ return this.attrs.size; }
    },
    x: {
      get: function(){ return this.attrs.x; }
    },
    y: {
      get: function(){ return this.attrs.y; }
    }
  });

  return Cell;

});
