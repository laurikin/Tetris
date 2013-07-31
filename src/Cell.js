define([],function(){

  var CellProto = {
    toString: function(){return "object Cell"}
  };

  return function(opts){

    var attrs = {
      size: typeof opts.size !== 'undefined' ? opts.size : 30,
      x: opts.x,
      y: opts.y
    }

    var Cell = Object.create(CellProto)
    Cell.size = attrs.size;
    Cell.x = attrs.x;
    Cell.y = attrs.y;

    return Cell
  }
});
